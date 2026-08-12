import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../products/entities/products.entity';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { FileUploadRepository } from './file-upload.repository';
import { CloudinaryConfig } from '../config/cloudinary'; // <--- 1. Importa tu configuración

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [FileUploadController],
  providers: [
    FileUploadService, 
    FileUploadRepository,
    CloudinaryConfig, 
  ],
})
export class FileUploadModule {}