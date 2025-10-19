//DTO para a criação de um novo Contato.
export class CreateContatoDto {
  nome: string;
  email: string;
  //A FK para Cliente é obrigatória para criar o Contato.
  clienteId: number;

  cargo: string;
  telefone?: string;
}
