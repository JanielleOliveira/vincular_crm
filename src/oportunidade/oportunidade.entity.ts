import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { Contato } from '../contato/contato.entity';

//Enumeração para o status, garantindo valores consistentes.
export enum OportunidadeStatus {
  PROSPECCAO = 'Prospecção',
  QUALIFICACAO = 'Qualificação',
  PROPOSTA = 'Proposta Enviada',
  GANHO = 'Ganho',
  PERDIDO = 'Perdido',
}

//Mapeia esta classe para uma tabela MySQL chamada 'tb_oportunidade'.
@Entity({ name: 'tb_oportunidade' })
export class Oportunidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  titulo: string;

  //Coluna para o valor estimado do negócio. Usa 'decimal' para precisão financeira.
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  valorEstimado: number;

  //Coluna para o status, usando o ENUM criado acima.
  // Isso restringe os valores aceitos na coluna.
  @Column({
    type: 'enum',
    enum: OportunidadeStatus,
    default: OportunidadeStatus.PROSPECCAO,
  })
  status: OportunidadeStatus;

  //Coluna para a data prevista de fechamento (data).
  @Column({ type: 'date', nullable: true })
  dataFechamentoPrevista: Date;

  /* --- Relacionamento Cliente (Obrigatório) --- */

  @Column()
  clienteId: number; // Coluna FK para Cliente

  //Oportunidade pertence a UM Cliente (Many-to-One).
  @ManyToOne(() => Cliente, (cliente) => cliente.oportunidades)
  @JoinColumn({ name: 'clienteId' })
  cliente: Cliente;

  /* --- Relacionamento Contato (Opcional) --- */

  //Coluna FK para Contato. É opcional (nullable: true).
  @Column({ nullable: true })
  contatoId: number;

  //Oportunidade pode estar associada a UM Contato (Many-to-One), ou a nenhum.
  @ManyToOne(() => Contato)
  @JoinColumn({ name: 'contatoId' })
  contato: Contato;
}
