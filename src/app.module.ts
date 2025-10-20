import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//1. Importa o ConfigModule
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClienteModule } from './cliente/cliente.module';
import { Cliente } from './cliente/entities/cliente.entity';
import { ContatoModule } from './contato/contato.module';
import { Contato } from './contato/entities/contato.entity';
import { Oportunidade } from './oportunidade/entities/oportunidade.entity';
import { OportunidadeModule } from './oportunidade/oportunidade.module';
import { ChamadoModule } from './chamado/chamado.module';
import { Chamado } from './chamado/entities/chamado.entity';

@Module({
  imports: [
    //2. Configura o ConfigModule para carregar o .env.
    ConfigModule.forRoot({
      isGlobal: true, // Torna as configurações disponíveis em qualquer lugar
    }),
    //3. Configura o TypeOrmModule para ser assíncrono.
    // Isso permite usar o ConfigService injetado para carregar as variáveis.
    TypeOrmModule.forRootAsync({
      //Injeta o ConfigService.
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        //Lê as variáveis do arquivo .env.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: configService.get<any>('DATABASE_TYPE'),
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),

        entities: [Cliente, Contato, Oportunidade, Chamado],
        synchronize: true,
        logging: true,
      }),
      //O ConfigService é o provedor que vamos usar.
      inject: [ConfigService],
    }),
    ClienteModule,
    ContatoModule,
    OportunidadeModule,
    ChamadoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
