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

import { CategoriesService } from './categories.service';
import CreateCategoryDto from './dtos/create-category.dto';
import UpdateCategoryDto from './dtos/update-category.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  async findAll() {
    return this.categoriesService.fineAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @Roles(Role.Admin)
  async createOne(@Body(ValidationPipe) createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createOne(createCategoryDto);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateOne(updateCategoryDto, id);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.deleteOne(id);
  }
}
