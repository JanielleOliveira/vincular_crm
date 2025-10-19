import { PartialType } from '@nestjs/mapped-types';
import { CreateContatoDto } from './create-contato.dto';

//Torna  todos os campos opcionais, exceto o clienteId, que não deve ser alterado via PATCH.
export class UpdateContatoDto extends PartialType(CreateContatoDto) {}
