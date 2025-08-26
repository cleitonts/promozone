import { PrimaryColumn, BeforeInsert } from 'typeorm';
import { Field, ID } from '@nestjs/graphql';
import { UlidUtil } from './ulid.util';

/**
 * Classe base abstrata para todas as entidades do sistema.
 * Implementa a geração automática de IDs usando ULID.
 * 
 * Princípios SOLID aplicados:
 * - Single Responsibility: Responsável apenas pela geração de IDs
 * - Open/Closed: Aberta para extensão, fechada para modificação
 * - DRY: Evita duplicação de código de geração de ID
 */
export abstract class BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  /**
   * Gera automaticamente um ULID único antes da inserção no banco de dados.
   * Este método é executado automaticamente pelo TypeORM antes de salvar a entidade.
   */
  @BeforeInsert()
  protected generateId(): void {
    if (!this.id) {
      this.id = UlidUtil.generate();
    }
  }

  /**
   * Permite definir um ID customizado se necessário.
   * Útil para casos especiais como migração de dados ou testes.
   * 
   * @param customId - ID customizado a ser definido
   */
  public setCustomId(customId: string): void {
    if (UlidUtil.isValid(customId)) {
      this.id = customId;
    } else {
      throw new Error('ID fornecido não é um ULID válido');
    }
  }

  /**
   * Retorna o timestamp de criação extraído do ULID.
   * 
   * @returns Timestamp em milliseconds
   */
  public getCreationTimestamp(): number {
    if (!this.id) {
      throw new Error('ID não foi gerado ainda');
    }
    return UlidUtil.getTimestamp(this.id);
  }

  /**
   * Verifica se o ID da entidade é válido.
   * 
   * @returns True se o ID é um ULID válido
   */
  public hasValidId(): boolean {
    return this.id ? UlidUtil.isValid(this.id) : false;
  }
}