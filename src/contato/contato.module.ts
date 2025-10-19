import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from '../cliente/cliente.module';
import { ContatoController } from './controllers/contato.controller';
import { Contato } from './entities/contato.entity';
import { ContatoService } from './services/contato.service';

@Module({
  //Registra a entidade Contato.
  //Importa o ClienteModule (apenas a importação é necessária, pois ele exporta o ClienteService).
  imports: [TypeOrmModule.forFeature([Contato]), ClienteModule],
  controllers: [ContatoController],
  providers: [ContatoService],
  exports: [ContatoService],
})
export class ContatoModule {}
