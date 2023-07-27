import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  findAll() {
    return this.brandRepo.find();
  }

  async findOne(id: number) {
    const options: FindOneOptions<Brand> = { where: { id } };
    const brand = await this.brandRepo.findOne({
      relations: ['products'],
      ...options,
    });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandRepo.create(data);
    return this.brandRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const options: FindOneOptions<Brand> = { where: { id } };
    const brand = await this.brandRepo.findOne(options);
    this.brandRepo.merge(brand, changes);
    return this.brandRepo.save(brand);
  }

  async remove(id: number) {
    const options: FindOneOptions<Brand> = { where: { id } };
    const brand = await this.brandRepo.findOne(options);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return this.brandRepo.delete(id);
  }
}
