import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateContatoDto } from '../dto/create-contato.dto';
import { UpdateContatoDto } from '../dto/update-contato.dto';
import { Contato } from '../entities/contato.entity';
import { ContatoService } from '../services/contato.service';

@Controller('/contatos')
export class ContatoController {
  constructor(private readonly contatoService: ContatoService) {}

  // POST /contato
  @Post()
  async create(@Body() createContatoDto: CreateContatoDto): Promise<Contato> {
    // Nota: O Service lida com a verificação do clienteId.
    return this.contatoService.create(createContatoDto);
  }

  // GET /contato
  @Get()
  async findAll(): Promise<Contato[]> {
    return this.contatoService.findAll();
  }

  // GET /contato/:id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Contato> {
    return this.contatoService.findOne(+id);
  }

  // PATCH /contato/:id
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContatoDto: UpdateContatoDto,
  ): Promise<Contato> {
    return this.contatoService.update(+id, updateContatoDto);
  }

  // DELETE /contato/:id
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    return this.contatoService.delete(+id);
  }
}
