import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';

/* DTO para atualização. O PartialType torna todas as propriedades
do CreateClienteDto opcionais, permitindo atualizações parciais (PATCH)*/

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateClienteDto extends PartialType(CreateClienteDto) {}
