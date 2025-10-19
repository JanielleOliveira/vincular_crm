import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOportunidadeDto } from '../dto/create-oportunidade.dto';
import { UpdateOportunidadeDto } from '../dto/update-oportunidade.dto';
import { Oportunidade } from '../entities/oportunidade.entity';

//Importa os Services injetados no módulo.
import { ClienteService } from '../../cliente/services/cliente.service';
import { ContatoService } from '../../contato/services/contato.service';

@Injectable()
export class OportunidadeService {
  constructor(
    @InjectRepository(Oportunidade)
    private oportunidadeRepository: Repository<Oportunidade>,
    private clienteService: ClienteService,
    private contatoService: ContatoService,
  ) {}

  //Função auxiliar para garantir a integridade referencial antes de salvar.
  private async validateForeignKeys(
    dto: CreateOportunidadeDto | UpdateOportunidadeDto,
  ) {
    //Verifica se o ClienteId existe (Obrigatório).
    if (dto.clienteId) {
      //Reutiliza o Service existente. Se não encontrar, lança 404.
      await this.clienteService.findOne(dto.clienteId);
    }

    //Verifica se o ContatoId existe (Opcional).
    if (dto.contatoId) {
      //Se o ContatoId for fornecido, ele deve existir.
      await this.contatoService.findOne(dto.contatoId);
    }
  }

  // --- 1.Cadastra ---
  async create(
    createOportunidadeDto: CreateOportunidadeDto,
  ): Promise<Oportunidade> {
    //Valida as chaves estrangeiras.
    await this.validateForeignKeys(createOportunidadeDto);

    return this.oportunidadeRepository.save(createOportunidadeDto);
  }

  // --- 2. Busca todos ---
  async findAll(): Promise<Oportunidade[]> {
    //Carrega os dados relacionados de Cliente e Contato na mesma consulta.
    return this.oportunidadeRepository.find({
      relations: ['cliente', 'contato'],
    });
  }

  // --- 3.Busca por ID ---
  async findOne(id: number): Promise<Oportunidade> {
    const oportunidade = await this.oportunidadeRepository.findOne({
      where: { id },
      relations: ['cliente', 'contato'],
    });

    if (!oportunidade) {
      throw new NotFoundException(`Oportunidade com ID ${id} não encontrada.`);
    }
    return oportunidade;
  }

  // --- 4. Atualização ---
  async update(
    id: number,
    updateOportunidadeDto: UpdateOportunidadeDto,
  ): Promise<Oportunidade> {
    const oportunidadeExistente = await this.findOne(id);

    //Valida as FKs se estiverem sendo alteradas.
    if (updateOportunidadeDto.clienteId || updateOportunidadeDto.contatoId) {
      await this.validateForeignKeys(updateOportunidadeDto);
    }

    this.oportunidadeRepository.merge(
      oportunidadeExistente,
      updateOportunidadeDto,
    );
    return this.oportunidadeRepository.save(oportunidadeExistente);
  }

  // --- 5. Deleta  ---
  async delete(id: number): Promise<void> {
    await this.findOne(id);
    await this.oportunidadeRepository.delete(id);
  }
}
