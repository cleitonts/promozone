import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';
import { CreateBrandDto } from './dto/brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = this.brandRepository.create(createBrandDto);
    return await this.brandRepository.save(brand);
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandRepository.find({
      relations: ['products'],
    });
  }

  async findOne(id: string): Promise<Brand | null> {
    return await this.brandRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  async update(id: string, updateBrandDto: Partial<CreateBrandDto>): Promise<Brand | null> {
    await this.brandRepository.update(id, updateBrandDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.brandRepository.delete(id);
  }
}
