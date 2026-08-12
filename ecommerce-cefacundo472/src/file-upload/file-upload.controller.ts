import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id', ParseUUIDPipe) productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators:[
          new MaxFileSizeValidator({
            maxSize:200000,
            message: 'Supera el maximo permitido'
          }),

          new FileTypeValidator({
          fileType: /(jpg|jpeg|png|svg|webp|tiff|avif)/,
           }),
        ]
      })

    ) file: Express.Multer.File,

  ){

    return this.fileUploadService.uploadImage(file, productId);

  }
}
