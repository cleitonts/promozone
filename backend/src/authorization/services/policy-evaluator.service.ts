import { Injectable } from '@nestjs/common';

export interface PolicyCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'in' | 'not_in' | 'greater_than' | 'less_than' | 'contains' | 'starts_with' | 'ends_with' | 'exists' | 'not_exists';
  value?: any;
}

export interface PolicyConditionGroup {
  and?: (PolicyCondition | PolicyConditionGroup)[];
  or?: (PolicyCondition | PolicyConditionGroup)[];
  not?: PolicyCondition | PolicyConditionGroup;
}

export interface PolicyContext {
  user: any;
  resource?: any;
  tenant?: any;
  request?: any;
  [key: string]: any;
}

@Injectable()
export class PolicyEvaluatorService {
  /**
   * Avalia uma condição de política contra um contexto
   */
  evaluateConditions(
    conditions: PolicyConditionGroup,
    context: PolicyContext,
  ): boolean {
    return this.evaluateConditionGroup(conditions, context);
  }

  private evaluateConditionGroup(
    group: PolicyConditionGroup,
    context: PolicyContext,
  ): boolean {
    // Operador AND
    if (group.and) {
      return group.and.every(condition => {
        if (this.isConditionGroup(condition)) {
          return this.evaluateConditionGroup(condition, context);
        }
        return this.evaluateCondition(condition, context);
      });
    }

    // Operador OR
    if (group.or) {
      return group.or.some(condition => {
        if (this.isConditionGroup(condition)) {
          return this.evaluateConditionGroup(condition, context);
        }
        return this.evaluateCondition(condition, context);
      });
    }

    // Operador NOT
    if (group.not) {
      if (this.isConditionGroup(group.not)) {
        return !this.evaluateConditionGroup(group.not, context);
      }
      return !this.evaluateCondition(group.not, context);
    }

    return false;
  }

  private evaluateCondition(
    condition: PolicyCondition,
    context: PolicyContext,
  ): boolean {
    const fieldValue = this.getFieldValue(condition.field, context);

    switch (condition.operator) {
      case 'equals':
        return fieldValue === condition.value;

      case 'not_equals':
        return fieldValue !== condition.value;

      case 'in':
        return Array.isArray(condition.value) && condition.value.includes(fieldValue);

      case 'not_in':
        return Array.isArray(condition.value) && !condition.value.includes(fieldValue);

      case 'greater_than':
        return fieldValue > condition.value;

      case 'less_than':
        return fieldValue < condition.value;

      case 'contains':
        return typeof fieldValue === 'string' && 
               typeof condition.value === 'string' && 
               fieldValue.includes(condition.value);

      case 'starts_with':
        return typeof fieldValue === 'string' && 
               typeof condition.value === 'string' && 
               fieldValue.startsWith(condition.value);

      case 'ends_with':
        return typeof fieldValue === 'string' && 
               typeof condition.value === 'string' && 
               fieldValue.endsWith(condition.value);

      case 'exists':
        return fieldValue !== undefined && fieldValue !== null;

      case 'not_exists':
        return fieldValue === undefined || fieldValue === null;

      default:
        throw new Error(`Operador não suportado: ${condition.operator}`);
    }
  }

  private getFieldValue(field: string, context: PolicyContext): any {
    const parts = field.split('.');
    let value = context;

    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        return undefined;
      }
    }

    return value;
  }

  private isConditionGroup(
    item: PolicyCondition | PolicyConditionGroup,
  ): item is PolicyConditionGroup {
    return 'and' in item || 'or' in item || 'not' in item;
  }

  /**
   * Valida se uma estrutura de condições está bem formada
   */
  validateConditions(conditions: any): boolean {
    try {
      if (!conditions || typeof conditions !== 'object') {
        return false;
      }

      return this.validateConditionGroup(conditions);
    } catch {
      return false;
    }
  }

  private validateConditionGroup(group: any): boolean {
    const hasAnd = 'and' in group;
    const hasOr = 'or' in group;
    const hasNot = 'not' in group;

    // Deve ter exatamente um operador
    const operatorCount = [hasAnd, hasOr, hasNot].filter(Boolean).length;
    if (operatorCount !== 1) {
      return false;
    }

    if (hasAnd || hasOr) {
      const conditions = group[hasAnd ? 'and' : 'or'];
      if (!Array.isArray(conditions) || conditions.length === 0) {
        return false;
      }

      return conditions.every(condition => {
        if (this.isConditionGroup(condition)) {
          return this.validateConditionGroup(condition);
        }
        return this.validateCondition(condition);
      });
    }

    if (hasNot) {
      const condition = group.not;
      if (this.isConditionGroup(condition)) {
        return this.validateConditionGroup(condition);
      }
      return this.validateCondition(condition);
    }

    return false;
  }

  private validateCondition(condition: any): boolean {
    if (!condition || typeof condition !== 'object') {
      return false;
    }

    const { field, operator, value } = condition;

    // Campo é obrigatório
    if (!field || typeof field !== 'string') {
      return false;
    }

    // Operador é obrigatório e deve ser válido
    const validOperators = [
      'equals', 'not_equals', 'in', 'not_in', 'greater_than', 'less_than',
      'contains', 'starts_with', 'ends_with', 'exists', 'not_exists'
    ];
    
    if (!operator || !validOperators.includes(operator)) {
      return false;
    }

    // Operadores exists e not_exists não precisam de valor
    if (operator === 'exists' || operator === 'not_exists') {
      return true;
    }

    // Outros operadores precisam de valor
    if (value === undefined) {
      return false;
    }

    // Operadores in e not_in precisam de array
    if ((operator === 'in' || operator === 'not_in') && !Array.isArray(value)) {
      return false;
    }

    return true;
  }
}