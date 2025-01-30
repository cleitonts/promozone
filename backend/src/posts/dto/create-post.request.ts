import {
  IsString,
  IsUrl,
  IsNumber,
  IsNotEmpty,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { SanitizeHTML } from 'src/common/decorators/sanitize-html.decorator';

@ValidatorConstraint({ name: 'AllowedDomain', async: false })
export class AllowedDomainConstraint implements ValidatorConstraintInterface {
  validate(url: string, args: ValidationArguments) {
    const allowedDomains = ['amazon.com.br', 'magazineluiza.com.br'];
    try {
      const domain = new URL(url).hostname;
      return allowedDomains.some((d) => domain.includes(d));
    } catch {
      return false;
    }
  }

  defaultMessage() {
    return 'URL deve ser de um dos domínios permitidos: amazon.com.br, magazineluiza.com.br';
  }
}

export class CreatePostRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @SanitizeHTML()
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsUrl()
  @Validate(AllowedDomainConstraint)
  originalUrl: string;

  @IsNumber()
  currentPrice: number;

  @IsNumber()
  originalPrice: number;

  @IsNumber()
  discountPercentage: number;
}
