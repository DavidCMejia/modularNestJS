import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('DB_CONNECTION') private connection: string,
    @Inject('PG') private clientPg: Client,
  ) {}
  getHello(): string {
    return `Hello World, with apiKey ${this.apiKey} and conecttion ${this.connection}!`;
  }
  getTasks() {
    // 👈 new method
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
