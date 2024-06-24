import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DocumentHistories, Documents, Users } from 'src/models';
import { AuthModule } from 'src/auth/auth.module';
import { DocumentsGateway } from './documents.gateway';

@Module({
  imports: [
    SequelizeModule.forFeature([Documents, DocumentHistories]),
    AuthModule,
  ],
  providers: [DocumentsService, DocumentsGateway],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
