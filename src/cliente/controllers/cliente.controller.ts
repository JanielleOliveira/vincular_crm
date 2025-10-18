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
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { Cliente } from '../entities/cliente.entity';
import { ClienteService } from '../services/cliente.service';

//Define o caminho base para todas as rotas deste Controller (ex: /cliente).
@Controller('/clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  //Mapeia o método para requisições POST.
  @Post()
  //@Body pega o corpo JSON da requisição e o mapeia para o CreateClienteDto.
  async create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  async findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get(':id')
  //@Param('id') extrai o valor 'id' da URL e o converte para number.
  async findOne(@Param('id') id: string): Promise<Cliente> {
    //O '+' converte a string do parâmetro para number.
    return this.clienteService.findOne(+id);
  }

  //Mapeia o método para requisições PATCH (usado para atualizações parciais).
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return this.clienteService.remove(+id);
  }
}
