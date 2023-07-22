import { Injectable } from '@nestjs/common';
import prisma from 'libs/prisma';
import CreateProductDto from './dtos/create-product.dto';
import UpdateProductDto from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  async fineAll() {
    const categories = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return categories;
  }

  async findOne(id: number) {
    const product = await prisma.product.findUnique({ where: { id } });

    return product;
  }

  async createOne(productDto: CreateProductDto) {
    const product = await prisma.product.create({
      data: {
        ...productDto,
      },
    });

    return product;
  }

  async updateOne(productDto: UpdateProductDto, id: number) {
    const product = await prisma.product.update({
      where: { id },
      data: { ...productDto },
    });

    return product;
  }

  async deleteOne(id: number) {
    const deletedproduct = await this.findOne(id);

    await prisma.product.delete({ where: { id } });

    return deletedproduct;
  }
}
