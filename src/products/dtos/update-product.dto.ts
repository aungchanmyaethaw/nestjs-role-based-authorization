import { IsBoolean, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
export default class UpdateProductDto {
  @IsNotEmpty()
  name: string;
  @IsPositive()
  price: number;
  @IsNumber()
  quantity: number;
  @IsBoolean()
  isInStock: boolean;
  @IsNumber()
  categoryId: number;
  @IsNumber()
  createdBy: number;
}
