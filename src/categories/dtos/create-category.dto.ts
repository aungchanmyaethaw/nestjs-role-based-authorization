import { IsNotEmpty, IsNumber} from 'class-validator';

export default class CreateCategoryDto {
  @IsNotEmpty()
  name: string;
  @IsNumber()
  createdBy: number;
}
