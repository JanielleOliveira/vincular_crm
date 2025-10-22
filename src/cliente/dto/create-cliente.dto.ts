// DTO para a criação de um novo Cliente.
// Define quais campos são OBRIGATÓRIOS na requisição POST.
export class CreateClienteDto {
  //Campos que devem ser enviados no corpo da requisição.
  nome: string;
  cnpj: string;
  segmento?: string;
  endereco?: string; // O '?' indica que o campo é opcional.
  telefone: string;
}
