import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // tipo do banco
      host: 'localhost', // onde o banco roda
      port: 3306, // porta padrão do MySQL
      username: 'root',
      password: 'root',
      database: 'db_crm', // nome do banco
      entities: [],
      synchronize: true, // cria as tabelas automaticamente
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
