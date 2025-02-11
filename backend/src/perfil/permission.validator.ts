import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PerfilPermissions } from './perfil-permissions';

@ValidatorConstraint({ name: 'isValidPermission', async: false })
export class isValidPermission implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const [module, permission] = value.split(':');
    return (
      PerfilPermissions[module] &&
      PerfilPermissions[module].includes(permission)
    );
  }

  defaultMessage() {
    return `The permission is invalid. eg. MODULE:PERMISSION`;
  }
}
