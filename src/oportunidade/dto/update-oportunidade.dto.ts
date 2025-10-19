import { PartialType } from '@nestjs/mapped-types';
import { CreateOportunidadeDto } from './create-oportunidade.dto';

//Torna todas as propriedades de CreateOportunidadeDto opcionais para PATCH.
export class UpdateOportunidadeDto extends PartialType(CreateOportunidadeDto) {}
