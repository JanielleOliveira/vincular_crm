import {
  ChamadoStatus,
  ChamadoTipo,
  PrioridadeChamado,
} from '../entities/chamado.entity';

export class CreateChamadoDto {
  titulo: string;
  descricao?: string;

  clienteId: number; // Chaves estrangeiras (Obrigatórias)
  contatoId: number;

  tipo?: ChamadoTipo; // Enumerações (Opcionais, usam default na entidade)
  prioridade: PrioridadeChamado; // Prioridade do chamado
  status?: ChamadoStatus;

  dataFechamento?: Date | null; // Data de fechamento (opcional, preenchida ao fechar)
}
