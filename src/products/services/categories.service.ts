import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const options: FindOneOptions<Category> = { where: { id } };
    const category = await this.categoryRepo.find(options);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(data);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const options: FindOneOptions<Category> = { where: { id } };
    const category = await this.categoryRepo.findOne(options);
    this.categoryRepo.merge(category, changes);
    return this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const options: FindOneOptions<Category> = { where: { id } };
    const category = await this.categoryRepo.findOne(options);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return this.categoryRepo.delete(id);
  }
}
