import { Injectable } from '@nestjs/common';
import prisma from 'libs/prisma';
import CreateCategoryDto from './dtos/create-category.dto';
import UpdateCategoryDto from './dtos/update-category.dto';
@Injectable()
export class CategoriesService {
  async fineAll() {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return categories;
  }

  async findOne(id: number) {
    const category = await prisma.category.findUnique({ where: { id } });

    return category;
  }

  async createOne(categoryDto: CreateCategoryDto) {
    const category = await prisma.category.create({
      data: {
        ...categoryDto,
      },
    });

    return category;
  }

  async updateOne(categoryDto: UpdateCategoryDto, id: number) {
    const category = await prisma.category.update({
      where: { id },
      data: { ...categoryDto },
    });

    return category;
  }

  async deleteOne(id: number) {
    const deletedCategory = await this.findOne(id);

    await prisma.category.delete({ where: { id } });

    return deletedCategory;
  }
}
