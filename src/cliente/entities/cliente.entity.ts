import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Contato } from '../../contato/entities/contato.entity';
import { Oportunidade } from '../../oportunidade/oportunidade.entity';

//O decorador @Entity('cliente') mapeia esta classe para uma tabela MySQL chamada 'tb_cliente'.
@Entity({ name: 'tb_cliente' })
export class Cliente {
  // Define 'id' como chave primária (PK) auto-incrementável.
  @PrimaryGeneratedColumn()
  id: number;

  // Define 'nome' como uma coluna string (VARCHAR) obrigatória.
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  nome: string;

  // Define 'cnpj' como coluna string, único para evitar duplicidade de empresas.
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 18, unique: true, nullable: false })
  cnpj: string;

  //Coluna para o endereço da empresa.
  @Column({ type: 'varchar', length: 255, nullable: true })
  endereco: string;

  //Coluna para o telefone principal.
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 20, nullable: true })
  telefone: string;

  /* --- Relacionamentos --- */

  //Um Cliente pode ter VÁRIOS Contatos (One-to-Many).
  // 'contato => contato.cliente' define a propriedade no Contato que referencia o Cliente.
  // 'cascade: true' (Opcional) garante que se um Cliente for deletado, seus Contatos também o serão (pode ser útil).
  @OneToMany(() => Contato, (contato) => contato.cliente, { cascade: true })
  contatos: Contato[];

  //Um Cliente pode ter VÁRIAS Oportunidades (One-to-Many).
  @OneToMany(() => Oportunidade, (oportunidade) => oportunidade.cliente, {
    cascade: true,
  })
  oportunidades: Oportunidade[];
}
