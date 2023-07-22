import { IsNumber, IsNotEmpty } from 'class-validator';

export default class UpdateCategoryDto {
  @IsNotEmpty()
  name?: string;
  @IsNumber()
  updatedBy: number;
}
