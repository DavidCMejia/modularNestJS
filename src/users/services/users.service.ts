import { CustomersService } from './customers.service';
import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ConfigService } from '@nestjs/config';
import { ProductsService } from '../../products/services/products.service';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService, // @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
    private customersService: CustomersService,
  ) {}

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const db = this.configService.get('DATABASE_NAME');
    console.log(apiKey, db);
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const options: FindOneOptions<User> = { where: { id } };
    const user = await this.userRepo.findOne({
      relations: ['customer'],
      ...options,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    if (data.customerId) {
      const customer = await this.customersService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const options: FindOneOptions<User> = { where: { id } };
    const user = await this.userRepo.findOne(options);
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    const options: FindOneOptions<User> = { where: { id } };
    const user = this.userRepo.findOne(options);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.userRepo.delete(id);
  }

  async getOrdersByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
