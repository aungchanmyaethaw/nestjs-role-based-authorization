import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  ValidationPipe,
  Body,
} from '@nestjs/common';

import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { ProductsService } from './products.service';
import CreateProductDto from './dtos/create-product.dto';
import UpdateProductDto from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async findAll() {
    return this.productsService.fineAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @Roles(Role.Admin)
  async createOne(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    return this.productsService.createOne(createProductDto);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateOne(updateProductDto, id);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteOne(id);
  }
}
