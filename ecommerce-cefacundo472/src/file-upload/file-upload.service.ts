import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { Repository } from 'typeorm';
import { Products } from '../products/entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileUploadService {
    constructor(
        private readonly fileUploadRepository: FileUploadRepository,
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>,
     ){}
    async uploadImage(file: Express.Multer.File, productId: string){
       
       
       const product = await this.productsRepository.findOneBy({
        id:productId,
       });

       if(!product){
        throw new NotFoundException('Producto no encontrado');
       }

       const result = await this.fileUploadRepository.uploadImage(file);
       if(!result.secure_url){
        throw new NotFoundException('Error al cargar la imagen');
       }

        await this.productsRepository.update(productId, {
        imgUrl: result.secure_url,
       });

       const updateProduct = await this.productsRepository.findOneBy({
        id:productId,
       });

       return updateProduct;
    }
}
