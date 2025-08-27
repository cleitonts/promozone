import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('policies')
@Index(['resource', 'action', 'tenantId'])
export class Policy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: 50 })
  resource: string;

  @Column({ length: 50 })
  action: string;

  @Column({ name: 'tenant_id', length: 36, nullable: true })
  tenantId?: string;

  /**
   * Condições JSON para avaliação da política
   * Exemplo:
   * {
   *   "conditions": {
   *     "and": [
   *       { "field": "user.department", "operator": "equals", "value": "sales" },
   *       { "field": "resource.status", "operator": "in", "value": ["active", "pending"] }
   *     ]
   *   }
   * }
   */
  @Column({ type: 'json', nullable: true })
  conditions?: any;

  /**
   * Efeito da política: allow ou deny
   */
  @Column({ type: 'enum', enum: ['allow', 'deny'], default: 'allow' })
  effect: 'allow' | 'deny';

  /**
   * Prioridade da política (maior número = maior prioridade)
   */
  @Column({ type: 'int', default: 0 })
  priority: number;

  /**
   * Se a política está ativa
   */
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}