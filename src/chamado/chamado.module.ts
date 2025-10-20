import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from '../cliente/cliente.module';
import { ContatoModule } from '../contato/contato.module';
import { ChamadoController } from './controllers/chamado.controller';
import { Chamado } from './entities/chamado.entity';
import { ChamadoService } from './services/chamado.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chamado]), ClienteModule, ContatoModule],
  controllers: [ChamadoController],
  providers: [ChamadoService],
})
export class ChamadoModule {}
