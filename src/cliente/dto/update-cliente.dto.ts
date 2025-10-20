import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';

/* DTO para atualização. O PartialType torna todas as propriedades
do CreateClienteDto opcionais, permitindo atualizações parciais (PATCH)*/

export class UpdateClienteDto extends PartialType(CreateClienteDto) {}
