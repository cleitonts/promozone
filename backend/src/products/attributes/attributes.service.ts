import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attribute } from './attribute.entity';
import { CreateAttributeDto } from './dto/attribute.dto';

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(Attribute)
    private attributeRepository: Repository<Attribute>,
  ) {}

  async create(createAttributeDto: CreateAttributeDto): Promise<Attribute> {
    const attribute = this.attributeRepository.create(createAttributeDto);
    return await this.attributeRepository.save(attribute);
  }

  async findAll(): Promise<Attribute[]> {
    return await this.attributeRepository.find({
      relations: ['attributeValues'],
    });
  }

  async findOne(id: number): Promise<Attribute | null> {
    return await this.attributeRepository.findOne({
      where: { id },
      relations: ['attributeValues'],
    });
  }

  async update(id: number, updateAttributeDto: Partial<CreateAttributeDto>): Promise<Attribute | null> {
    await this.attributeRepository.update(id, updateAttributeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.attributeRepository.delete(id);
  }
}