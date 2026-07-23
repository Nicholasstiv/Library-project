import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from './prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  onModuleInit() {
    console.log('Server initialized succesfully!');
  }
}
