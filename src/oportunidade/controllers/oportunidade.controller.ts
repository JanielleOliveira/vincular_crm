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
import { CreateOportunidadeDto } from '../dto/create-oportunidade.dto';
import { UpdateOportunidadeDto } from '../dto/update-oportunidade.dto';
import { Oportunidade } from '../entities/oportunidade.entity';
import { OportunidadeService } from '../services/oportunidade.service';

@Controller('/oportunidades')
export class OportunidadeController {
  constructor(private readonly oportunidadeService: OportunidadeService) {}

  // POST /oportunidade (Criar/cadastrar)
  @Post()
  async create(
    @Body() createOportunidadeDto: CreateOportunidadeDto,
  ): Promise<Oportunidade> {
    return this.oportunidadeService.create(createOportunidadeDto);
  }

  // GET /oportunidade (busca todos)
  @Get()
  async findAll(): Promise<Oportunidade[]> {
    return this.oportunidadeService.findAll();
  }

  // GET /oportunidade/:id (buscar por id)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Oportunidade> {
    return this.oportunidadeService.findOne(+id);
  }

  // PATCH /oportunidade/:id (atualizar)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOportunidadeDto: UpdateOportunidadeDto,
  ): Promise<Oportunidade> {
    return this.oportunidadeService.update(+id, updateOportunidadeDto);
  }

  // DELETE /oportunidade/:id (deletar)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    return this.oportunidadeService.delete(+id);
  }
}
