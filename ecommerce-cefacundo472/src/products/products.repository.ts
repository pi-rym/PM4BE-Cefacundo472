import { Injectable } from "@nestjs/common";


export interface Product {
    id:number;

   name: string;

   description: string;

   price: number;

   stock: number;

   imgUrl: string;
}


export const products:Product[] = [
  {
    id: 1,
    name: "Memoria RAM 16GB DDR4",
    description: "Módulo de memoria RAM SODIMM de 16GB a 3200MHz para notebook.",
    price: 65.99,
    stock: 15,
    imgUrl: "https://example.com/images/ram-16gb.jpg"
  },
  {
    id: 2,
    name: "Disco SSD NVMe M.2 1TB",
    description: "Unidad de estado sólido de alta velocidad de lectura y escritura.",
    price: 89.50,
    stock: 8,
    imgUrl: "https://example.com/images/ssd-1tb.jpg"
  },
  {
    id: 3,
    name: "Batería de Repuesto para Laptop",
    description: "Batería de iones de litio de alta durabilidad compatible con múltiples modelos.",
    price: 45.00,
    stock: 0,
    imgUrl: "https://example.com/images/battery.jpg"
  },
  {
    id: 4,
    name: "Pantalla LCD/LED 15.6 pulgadas FHD",
    description: "Display de reemplazo con resolución Full HD y conector de 30 pines.",
    price: 110.00,
    stock: 5,
    imgUrl: "https://example.com/images/screen-156.jpg"
  },
  {
    id: 5,
    name: "Cooler / Ventilador de CPU para Notebook",
    description: "Disipador con ventilador integrado para refrigeración de procesador portátil.",
    price: 22.99,
    stock: 20,
    imgUrl: "https://example.com/images/cooler.jpg"
  }
];



@Injectable()
export class ProductsRepository{
    getAllProducts(): Product[] {
        return products;
    }
}

