import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttributeValue } from './attribute-value.entity';
import { CreateAttributeValueDto } from './dto/attribute-value.dto';

@Injectable()
export class AttributeValuesService {
  constructor(
    @InjectRepository(AttributeValue)
    private attributeValueRepository: Repository<AttributeValue>,
  ) {}

  async create(createAttributeValueDto: CreateAttributeValueDto): Promise<AttributeValue> {
    const attributeValue = this.attributeValueRepository.create(createAttributeValueDto);
    return await this.attributeValueRepository.save(attributeValue);
  }

  async findAll(): Promise<AttributeValue[]> {
    return await this.attributeValueRepository.find({
      relations: ['attribute'],
    });
  }

  async findOne(id: string): Promise<AttributeValue | null> {
    return await this.attributeValueRepository.findOne({
      where: { id },
      relations: ['attribute'],
    });
  }

  async findByAttribute(attributeId: number): Promise<AttributeValue[]> {
    return await this.attributeValueRepository.find({
      where: { attributeId },
      relations: ['attribute'],
    });
  }

  async update(id: string, updateAttributeValueDto: Partial<CreateAttributeValueDto>): Promise<AttributeValue | null> {
    await this.attributeValueRepository.update(id, updateAttributeValueDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.attributeValueRepository.delete(id);
  }
}