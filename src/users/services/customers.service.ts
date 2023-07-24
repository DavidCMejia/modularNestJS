import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: number) {
    const options: FindOneOptions<Customer> = { where: { id } };
    const customer = await this.customerRepo.findOne(options);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(data);
    return this.customerRepo.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const options: FindOneOptions<Customer> = { where: { id } };
    const customer = await this.customerRepo.findOne(options);
    this.customerRepo.merge(customer, changes);
    return this.customerRepo.save(customer);
  }

  remove(id: number) {
    const options: FindOneOptions<Customer> = { where: { id } };
    const customer = this.customerRepo.findOne(options);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return this.customerRepo.delete(id);
  }
}
