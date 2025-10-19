import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { Cliente } from './cliente/entities/cliente.entity';
import { ContatoModule } from './contato/contato.module';
import { Contato } from './contato/entities/contato.entity';
import { Oportunidade } from './oportunidade/oportunidade.entity';

@Module({
  //Array de módulos importados por este módulo.
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // tipo do banco
      host: 'localhost', // onde o banco roda
      port: 3306, // porta padrão do MySQL
      username: 'root',
      password: 'root',
      database: 'db_crm', // nome do banco
      entities: [Cliente, Contato, Oportunidade], //Adiciona as entidades ao array para que o TypeORM as reconheça
      synchronize: true, // cria as tabelas automaticamente
      logging: true, //Quando 'true', exibe as queries SQL executadas no console.
    }),
    ClienteModule,
    ContatoModule,
  ],
  controllers: [AppController], //Controladores (endpoints da API).
  providers: [AppService], //lógica de negócios.
})
export class AppModule {}
