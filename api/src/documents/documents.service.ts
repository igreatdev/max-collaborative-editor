import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateDocumentDto,
  documentListResponseDto,
  documentResponseDto,
} from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Documents } from 'src/models';
import { Doc as YDoc, applyUpdate } from 'yjs';
import { isNull } from 'lodash';

@Injectable()
export class DocumentsService {
  // private documents = new Map<number, Y.Doc>();
  constructor(
    @InjectModel(Documents) private documentsModel: typeof Documents,
  ) {}

  async createDocument(data: CreateDocumentDto, userId: number) {
    // Create doc
    const document = await this.documentsModel.create({
      title: data.title,
      content: '',
      user_id: userId,
    });

    return documentResponseDto(document);
  }

  async getDocuments(paging = {}) {
    // Get all docs
    const records = await this.documentsModel.findAndCountAll({
      ...paging,
      include: { association: 'user' },
    });

    return {
      rows: documentListResponseDto(records.rows),
      count: records.count,
    };
  }

  async getDocument(id: number) {
    // Get doc detail
    const document = await this.documentsModel.findByPk(id, {
      include: { association: 'user' },
    });

    if (!document) {
      throw new NotFoundException('Record not found');
    }

    return documentResponseDto(document);
  }

  async getDocumentDoc(id: number) {
    const doc = new YDoc();
    // Get doc detail
    const document = await this.documentsModel.findByPk(id, {
      include: { association: 'user' },
    });

    if (!document) {
      throw new NotFoundException('Record not found');
    }
    console.log(`Retrieved doc: ${document.title}`);

    if (!isNull(document.content) && document.content.length) {
      const state = this.base64ToUint8Array(document.content);
      applyUpdate(doc, state);
    }

    return doc;
  }

  async saveDocument(id: number, state: Uint8Array): Promise<void> {
    const stateBase64 = this.uint8ArrayToBase64(state);

    const document = await this.documentsModel.findByPk(id);
    console.log(`Saving doc: ${document.title}`);
    if (!document) {
      throw new NotFoundException('Record not found - Invalid document id');
    }

    document.content = stateBase64;
    await document.save();
  }

  private uint8ArrayToBase64(uint8Array: Uint8Array): string {
    return Buffer.from(uint8Array).toString('base64');
  }

  private base64ToUint8Array(base64: string): Uint8Array {
    return new Uint8Array(Buffer.from(base64, 'base64'));
  }
}
