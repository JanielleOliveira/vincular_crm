import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteService } from '../../cliente/services/cliente.service';
import { ContatoService } from '../../contato/services/contato.service';
import { CreateChamadoDto } from '../dto/create-chamado.dto';
import { UpdateChamadoDto } from '../dto/update-chamado.dto';
import { Chamado, ChamadoStatus } from '../entities/chamado.entity';

@Injectable()
export class ChamadoService {
  constructor(
    @InjectRepository(Chamado)
    private chamadoRepository: Repository<Chamado>,
    private clienteService: ClienteService,
    private contatoService: ContatoService,
  ) {}

  private async validateForeignKeys(dto: CreateChamadoDto | UpdateChamadoDto) {
    if (dto.clienteId) {
      // Verifica se o ClienteId existe
      await this.clienteService.findOne(dto.clienteId);
    }
    if (dto.contatoId) {
      // Verifica se o ContatoId existe
      await this.contatoService.findOne(dto.contatoId);
    }
  }

  // 1. Criar/Cadastrar
  async create(createChamadoDto: CreateChamadoDto): Promise<Chamado> {
    await this.validateForeignKeys(createChamadoDto);
    // Nota: dataAbertura será preenchida automaticamente pelo TypeORM
    return this.chamadoRepository.save(createChamadoDto);
  }

  // 2. Buscar Todos
  async findAll(): Promise<Chamado[]> {
    return this.chamadoRepository.find({
      relations: ['cliente', 'contato'],
    });
  }

  // 3. Buscar Por Id
  async findOne(id: number): Promise<Chamado> {
    const chamado = await this.chamadoRepository.findOne({
      where: { id },
      relations: ['cliente', 'contato'],
    });

    if (!chamado) {
      throw new NotFoundException(`Chamado com ID ${id} não encontrado.`);
    }
    return chamado;
  }

  // 4. UPDATE
  async update(
    id: number,
    updateChamadoDto: UpdateChamadoDto,
  ): Promise<Chamado> {
    const chamadoExistente = await this.findOne(id);

    // Valida FKs se estiverem sendo alteradas
    if (updateChamadoDto.clienteId || updateChamadoDto.contatoId) {
      await this.validateForeignKeys(updateChamadoDto);
    }

    // Lógica para preencher dataFechamento ao fechar o chamado
    if (
      updateChamadoDto.status === ChamadoStatus.FECHADO &&
      !chamadoExistente.dataFechamento
    ) {
      updateChamadoDto['dataFechamento'] = new Date();
    }
    // Lógica para remover dataFechamento se reabrir o chamado
    if (
      updateChamadoDto.status !== ChamadoStatus.FECHADO &&
      chamadoExistente.dataFechamento
    ) {
      // Define explicitamente para NULL no banco de dados
      updateChamadoDto['dataFechamento'] = null;
    }

    this.chamadoRepository.merge(chamadoExistente, updateChamadoDto);
    return this.chamadoRepository.save(chamadoExistente);
  }

  // 5. DELETE
  async delete(id: number): Promise<void> {
    await this.findOne(id); // Garante que o item existe antes de tentar deletar
    await this.chamadoRepository.delete(id);
  }
}
