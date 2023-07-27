import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { BrandsService } from './brands.service';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandService: BrandsService,
  ) {}

  findAll() {
    return this.productRepo.find({ relations: ['brand'] });
  }

  async findOne(id: number) {
    const options: FindOneOptions<Product> = { where: { id } };
    const product = await this.productRepo.findOne(options);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandService.findOne(data.brandId);
      newProduct.brand = brand;
    }
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
