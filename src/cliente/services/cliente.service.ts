import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { Cliente } from '../entities/cliente.entity';

//O decorador @Injectable marca a classe como um 'Provider' injetável.
@Injectable()
export class ClienteService {
  //Construtor que injeta o repositório do Cliente.
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  //Recebe o DTO e o salva no banco de dados.
  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    //O método 'save' (se receber um objeto sem 'id') cria um novo registro.
    // Retorna a entidade criada, incluindo o novo 'id'.
    return this.clienteRepository.save(createClienteDto);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOneBy({ id });

    //Se não encontrar, lança uma exceção HTTP 404 (Not Found).
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    const clienteExistente = await this.findOne(id);
    //'merge' combina o objeto existente com as novas propriedades do DTO.
    this.clienteRepository.merge(clienteExistente, updateClienteDto);

    return this.clienteRepository.save(clienteExistente);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.clienteRepository.delete(id);
    // Nota: Por termos 'cascade: true' na entidade, a exclusão do cliente deve automaticamente excluir Contatos e Oportunidades associadas.
  }
}
