import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from '../entities/policy.entity';
import { PolicyEvaluatorService, PolicyContext } from './policy-evaluator.service';

export interface PolicyEvaluationResult {
  allowed: boolean;
  matchedPolicies: Policy[];
  deniedBy?: Policy;
}

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
    private policyEvaluator: PolicyEvaluatorService,
  ) {}

  /**
   * Avalia políticas para uma ação específica
   */
  async evaluatePolicies(
    resource: string,
    action: string,
    context: PolicyContext,
    tenantId?: string,
  ): Promise<PolicyEvaluationResult> {
    // Buscar políticas aplicáveis
    const policies = await this.getApplicablePolicies(resource, action, tenantId);

    const matchedPolicies: Policy[] = [];
    let deniedBy: Policy | undefined;
    let hasExplicitAllow = false;

    // Avaliar políticas em ordem de prioridade (maior prioridade primeiro)
    const sortedPolicies = policies.sort((a, b) => b.priority - a.priority);

    for (const policy of sortedPolicies) {
      // Se a política tem condições, avaliá-las
      if (policy.conditions) {
        try {
          const conditionsMet = this.policyEvaluator.evaluateConditions(
            policy.conditions,
            context,
          );

          if (!conditionsMet) {
            continue; // Pular esta política se as condições não forem atendidas
          }
        } catch (error) {
          console.error(`Erro ao avaliar condições da política ${policy.id}:`, error);
          continue; // Pular política com erro
        }
      }

      matchedPolicies.push(policy);

      // Se é uma política de negação, negar imediatamente
      if (policy.effect === 'deny') {
        deniedBy = policy;
        return {
          allowed: false,
          matchedPolicies,
          deniedBy,
        };
      }

      // Se é uma política de permissão
      if (policy.effect === 'allow') {
        hasExplicitAllow = true;
      }
    }

    // Resultado final: permitir apenas se houver pelo menos uma política de allow
    return {
      allowed: hasExplicitAllow,
      matchedPolicies,
      deniedBy,
    };
  }

  /**
   * Busca políticas aplicáveis para um recurso e ação
   */
  private async getApplicablePolicies(
    resource: string,
    action: string,
    tenantId?: string,
  ): Promise<Policy[]> {
    const queryBuilder = this.policyRepository
      .createQueryBuilder('policy')
      .where('policy.active = :active', { active: true })
      .andWhere('policy.resource = :resource', { resource })
      .andWhere('policy.action = :action', { action });

    // Incluir políticas globais e específicas do tenant
    if (tenantId) {
      queryBuilder.andWhere(
        '(policy.tenantId IS NULL OR policy.tenantId = :tenantId)',
        { tenantId },
      );
    } else {
      queryBuilder.andWhere('policy.tenantId IS NULL');
    }

    return queryBuilder.getMany();
  }

  /**
   * Cria uma nova política
   */
  async createPolicy(
    name: string,
    resource: string,
    action: string,
    effect: 'allow' | 'deny',
    options: {
      description?: string;
      conditions?: any;
      priority?: number;
      tenantId?: string;
      active?: boolean;
    } = {},
  ): Promise<Policy> {
    // Validar condições se fornecidas
    if (options.conditions && !this.policyEvaluator.validateConditions(options.conditions)) {
      throw new Error('Condições da política são inválidas');
    }

    const policy = this.policyRepository.create({
      name,
      resource,
      action,
      effect,
      description: options.description,
      conditions: options.conditions,
      priority: options.priority ?? 0,
      tenantId: options.tenantId,
      active: options.active ?? true,
    });

    return this.policyRepository.save(policy);
  }

  /**
   * Atualiza uma política existente
   */
  async updatePolicy(
    id: string,
    updates: Partial<{
      name: string;
      description: string;
      conditions: any;
      effect: 'allow' | 'deny';
      priority: number;
      active: boolean;
    }>,
  ): Promise<Policy> {
    // Validar condições se fornecidas
    if (updates.conditions && !this.policyEvaluator.validateConditions(updates.conditions)) {
      throw new Error('Condições da política são inválidas');
    }

    await this.policyRepository.update(id, updates);
    
    const policy = await this.policyRepository.findOne({ where: { id } });
    if (!policy) {
      throw new Error('Política não encontrada');
    }

    return policy;
  }

  /**
   * Remove uma política
   */
  async deletePolicy(id: string): Promise<void> {
    const result = await this.policyRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Política não encontrada');
    }
  }

  /**
   * Lista políticas com filtros opcionais
   */
  async listPolicies(filters: {
    resource?: string;
    action?: string;
    tenantId?: string;
    active?: boolean;
  } = {}): Promise<Policy[]> {
    const queryBuilder = this.policyRepository.createQueryBuilder('policy');

    if (filters.resource) {
      queryBuilder.andWhere('policy.resource = :resource', { resource: filters.resource });
    }

    if (filters.action) {
      queryBuilder.andWhere('policy.action = :action', { action: filters.action });
    }

    if (filters.tenantId !== undefined) {
      if (filters.tenantId === null) {
        queryBuilder.andWhere('policy.tenantId IS NULL');
      } else {
        queryBuilder.andWhere('policy.tenantId = :tenantId', { tenantId: filters.tenantId });
      }
    }

    if (filters.active !== undefined) {
      queryBuilder.andWhere('policy.active = :active', { active: filters.active });
    }

    return queryBuilder
      .orderBy('policy.priority', 'DESC')
      .addOrderBy('policy.createdAt', 'ASC')
      .getMany();
  }

  /**
   * Busca uma política por ID
   */
  async findPolicyById(id: string): Promise<Policy | null> {
    return this.policyRepository.findOne({ where: { id } });
  }
}