import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from './controllers/cliente.controller';
import { Cliente } from './entities/cliente.entity';
import { ClienteService } from './services/cliente.service';

@Module({
  //Usa TypeOrmModule.forFeature([]) para registrar as entidades que
  // serão injetadas (usadas) neste módulo (apenas o Cliente, neste caso).
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClienteController],
  providers: [ClienteService],

  //É útil exportar o serviço para que ele possa ser usado por outros módulos
  // (ex: ContatoService precisará acessar ClienteService).
  exports: [ClienteService],
})
export class ClienteModule {}
