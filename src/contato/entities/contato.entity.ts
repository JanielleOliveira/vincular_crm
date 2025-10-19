import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
//Importa a entidade Cliente para criar o relacionamento.

//Mapeia esta classe para uma tabela MySQL chamada 'tb_contato'.
@Entity({ name: 'tb_contato' })
export class Contato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cargo: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefone: string;

  /* --- Relacionamento (Lado N) --- */

  //Coluna de Chave Estrangeira (FK). O TypeORM cria automaticamente a coluna clienteId.
  @Column()
  clienteId: number;

  //Define que o Contato pertence a UM Cliente (Many-to-One).
  // 'cliente => cliente.contatos' define a propriedade no Cliente que referencia o Contato.
  @ManyToOne(() => Cliente, (cliente) => cliente.contatos, {
    onDelete: 'CASCADE',
  })
  //Define a coluna específica no banco de dados que será a FK.
  @JoinColumn({ name: 'clienteId' })
  cliente: Cliente;
}
