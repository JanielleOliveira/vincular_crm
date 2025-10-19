//Importa o ENUM de Status criado na entidade.
import { OportunidadeStatus } from '../entities/oportunidade.entity';

//DTO para a criação de uma nova Oportunidade.
export class CreateOportunidadeDto {
  titulo: string;
  valorEstimado: number;
  //FK para Cliente é obrigatória.
  clienteId: number;

  //Campos opcionais.
  contatoId?: number;
  dataFechamentoPrevista?: Date;
  //O status é opcional; se não for fornecido, a entidade usará o padrão.
  status?: OportunidadeStatus;
}
