import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteService } from '../../cliente/services/cliente.service'; //Importa o ClienteService para garantir a integridade da FK.
import { CreateContatoDto } from '../dto/create-contato.dto';
import { UpdateContatoDto } from '../dto/update-contato.dto';
import { Contato } from '../entities/contato.entity';

@Injectable()
export class ContatoService {
  constructor(
    @InjectRepository(Contato)
    private contatoRepository: Repository<Contato>,
    //Injeta o ClienteService.
    private clienteService: ClienteService,
  ) {}

  // --- 1. CREATE (Criação) ---
  async create(createContatoDto: CreateContatoDto): Promise<Contato> {
    //PASSO CRÍTICO: Verifica se o ClienteId informado existe.
    // O findOne no ClienteService lança NotFoundException se não existir.
    await this.clienteService.findOne(createContatoDto.clienteId);

    //Cria e salva o novo contato.
    return this.contatoRepository.save(createContatoDto);
  }

  // --- 2. READ All (Busca todos) ---
  async findAll(): Promise<Contato[]> {
    //Usa 'relations' para carregar os dados do Cliente junto (join).
    return this.contatoRepository.find({ relations: ['cliente'] });
  }

  //Adiciona um método para buscar contatos por cliente (útil em relatórios futuros).
  async findByCliente(clienteId: number): Promise<Contato[]> {
    //Busca contatos onde a coluna 'clienteId' é igual ao valor passado.
    return this.contatoRepository.find({
      where: { clienteId },
      relations: ['cliente'],
    });
  }

  // --- 3. READ One (Busca por ID) ---
  async findOne(id: number): Promise<Contato> {
    const contato = await this.contatoRepository.findOne({
      where: { id },
      relations: ['cliente'], // Traz o cliente no resultado.
    });

    if (!contato) {
      throw new NotFoundException(`Contato com ID ${id} não encontrado.`);
    }
    return contato;
  }

  // --- 4. UPDATE (Atualização) ---
  async update(
    id: number,
    updateContatoDto: UpdateContatoDto,
  ): Promise<Contato> {
    const contatoExistente = await this.findOne(id);

    //PREVENÇÃO: Impede a alteração da FK (clienteId) após a criação.
    if (
      updateContatoDto.clienteId &&
      updateContatoDto.clienteId !== contatoExistente.clienteId
    ) {
      throw new BadRequestException(
        'Não é permitido alterar o Cliente associado a um Contato.',
      );
    }

    this.contatoRepository.merge(contatoExistente, updateContatoDto);
    return this.contatoRepository.save(contatoExistente);
  }

  // --- 5. DELETE (Exclusão) ---
  async delete(id: number): Promise<void> {
    await this.findOne(id);
    await this.contatoRepository.delete(id);
  }
}
