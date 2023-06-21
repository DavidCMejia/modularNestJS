import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('DB_CONNECTION') private connection: string,
  ) {}
  getHello(): string {
    return `Hello World, with apiKey ${this.apiKey} and conecttion ${this.connection}!`;
  }
}
