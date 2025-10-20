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
import { CreateChamadoDto } from '../dto/create-chamado.dto';
import { UpdateChamadoDto } from '../dto/update-chamado.dto';
import { Chamado } from '../entities/chamado.entity';
import { ChamadoService } from '../services/chamado.service';

//A rota será /api/chamados
@Controller('/chamados')
export class ChamadoController {
  constructor(private readonly chamadoService: ChamadoService) {}

  // POST /api/chamado
  @Post()
  async create(@Body() createChamadoDto: CreateChamadoDto): Promise<Chamado> {
    return this.chamadoService.create(createChamadoDto);
  }

  // GET /api/chamado
  @Get()
  async findAll(): Promise<Chamado[]> {
    return this.chamadoService.findAll();
  }

  // GET /api/chamado/:id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Chamado> {
    return this.chamadoService.findOne(+id);
  }

  // PATCH /api/chamado/:id
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChamadoDto: UpdateChamadoDto,
  ): Promise<Chamado> {
    return this.chamadoService.update(+id, updateChamadoDto);
  }

  // DELETE /api/chamado/:id
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    return this.chamadoService.delete(+id);
  }
}
