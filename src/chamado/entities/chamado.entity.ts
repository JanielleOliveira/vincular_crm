import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Contato } from '../../contato/entities/contato.entity';

//Enumeração para o status do ciclo de vida
export enum ChamadoStatus {
  ABERTO = 'Aberto',
  EM_ANDAMENTO = 'Em Andamento',
  PENDENTE = 'Pendente',
  FECHADO = 'Fechado',
}

//Enumeração para o tipo/classificação do chamado
export enum ChamadoTipo {
  INCIDENTE = 'Incidente',
  REQUISICAO = 'Requisição de Serviço',
  DUVIDA = 'Dúvida',
}

//Enumeração para a prioridade do chamdo
export enum PrioridadeChamado {
  ALTA = 'Alta',
  MEDIA = 'Média',
  BAIXA = 'Baixa',
}

@Entity({ name: 'tb_chamado' })
export class Chamado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({
    type: 'enum',
    enum: ChamadoStatus,
    default: ChamadoStatus.ABERTO,
  })
  status: ChamadoStatus;

  @Column({
    type: 'enum',
    enum: ChamadoTipo,
    default: ChamadoTipo.DUVIDA,
  })
  tipo: ChamadoTipo;

  // ADIÇÃO CRUCIAL: Coluna Prioridade
  @Column({
    type: 'enum',
    enum: PrioridadeChamado,
    default: PrioridadeChamado.BAIXA, // Define um valor padrão
  })
  prioridade: PrioridadeChamado;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataAbertura: Date;

  @Column({ type: 'timestamp', nullable: true })
  dataFechamento?: Date | null; //Usado para calcular o tempo de atendimento (SLA).

  /* --- Relacionamento Cliente (Obrigatório) --- */
  @Column()
  clienteId: number;
  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'clienteId' })
  cliente: Cliente;

  /* --- Relacionamento Contato (Obrigatório) --- */
  @Column()
  contatoId: number;
  @ManyToOne(() => Contato)
  @JoinColumn({ name: 'contatoId' })
  contato: Contato;
}
