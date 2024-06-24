import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiService } from 'src/utils/api/api.service';
import { CreateDocumentDto, DocumentResponseDto } from './dto';
import { DocumentsService } from './documents.service';
import {
  ApiPaginatedResponse,
  getPaginatedData,
  paginationReqQuery,
  PagingDataType,
  preparePagination,
} from 'src/utils/paginationHelper';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiModelSuccessResponse, ApiSuccessResponse } from 'src/utils/api/api.dto';

@ApiTags('documents')
@ApiBearerAuth()
@Controller('documents')
@UseGuards(AuthGuard)
export class DocumentsController {
  constructor(
    private documentsService: DocumentsService,
    private apiService: ApiService,
  ) {}

  @Post('/')
  async create(@Request() req, @Body() data: CreateDocumentDto) {
    const document = await this.documentsService.createDocument(
      data,
      req.user.id,
    );

    return this.apiService.success(document);
  }

  @ApiPaginatedResponse(DocumentResponseDto)
  @Get('/')
  async getDocuments(@Query() paginationQuery: paginationReqQuery) {
    const { page, size } = paginationQuery;
    const paging = preparePagination(page, size);
    const documents = await this.documentsService.getDocuments(paging);

    return this.apiService.success(getPaginatedData(documents, page, size));
  }

  @ApiModelSuccessResponse(DocumentResponseDto)
  @Get('/:id')
  async getDocument(@Param('id') id: number) {
    const documents = await this.documentsService.getDocument(id);

    return this.apiService.success(documents);
  }
}
