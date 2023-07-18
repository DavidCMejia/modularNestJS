import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
  // private counterId = 1;
  // private products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Producto 1',
  //     description: 'lorem lorem',
  //     price: 10000,
  //     stock: 300,
  //     image: 'https://i.imgur.com/U4iGx1j.jpeg',
  //   },
  // ];

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const options: FindOneOptions<Product> = { where: { id } };
    const product = await this.productRepo.findOne(options);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);

    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const options: FindOneOptions<Product> = { where: { id } };
    const product = await this.productRepo.findOne(options);
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const options: FindOneOptions<Product> = { where: { id } };
    const product = await this.productRepo.findOne(options);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return this.productRepo.delete(id);
  }
}
