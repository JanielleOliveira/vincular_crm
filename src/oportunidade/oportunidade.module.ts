import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OportunidadeController } from './controllers/oportunidade.controller';
import { Oportunidade } from './entities/oportunidade.entity';
import { OportunidadeService } from './services/oportunidade.service';

//Importa os módulos necessários para validar as FKs.
import { ClienteModule } from '../cliente/cliente.module';
import { ContatoModule } from '../contato/contato.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Oportunidade]),
    //Importa os módulos que contêm os Services injetáveis.
    ClienteModule,
    ContatoModule,
  ],
  controllers: [OportunidadeController],
  providers: [OportunidadeService],
})
export class OportunidadeModule {}
