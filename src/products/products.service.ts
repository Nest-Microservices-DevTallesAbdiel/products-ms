import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }
  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: createProductDto
    })
    return product;
  }

  async findAll(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto;
    const total = await this.prisma.product.count({ where: { available: true } });
    const lastPage = Math.ceil(total / limit!);
    return {
      data: await this.prisma.product.findMany({
        skip: (page! - 1) * limit!,
        take: limit,
        where: { available: true }
      }),
      metadata: {
        total,
        page,
        lastPage
      }

    }
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findFirst({ where: { id, available: true } });
    if (!product) throw new NotFoundException(`Product with id ${id} not founf`);
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const { id: __, ...data } = updateProductDto;
    return this.prisma.product.update({
      data,
      where: { id }
    }) //todo: refactorizar para que muestre un mensaje de error si no se actuzalizo ningun producto
  }

  async remove(id: number) {
    //Hard delete
    /**NO recomendado para mantener la integridad referencial porque
     * otros microservicios podrian estar haciendo referencia a los productos y
     * no queremos dejar regitros huerfanos
     */
    /**
    await this.findOne(id); //TODO: Refactorizar para evitar hacer dos consultas a la db
    return this.prisma.product.delete({
      where: { id }
    })
    */

    //Soft delete
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        available: false
      }
    })

  }
}
