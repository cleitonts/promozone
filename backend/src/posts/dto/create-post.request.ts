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
import { InputType, Field, Float } from '@nestjs/graphql';

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

@InputType()
export class CreatePostRequest {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @SanitizeHTML()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field()
  @IsUrl()
  @Validate(AllowedDomainConstraint)
  originalUrl: string;

  @Field(() => Float)
  @IsNumber()
  currentPrice: number;

  @Field(() => Float)
  @IsNumber()
  originalPrice: number;

  @Field(() => Float)
  @IsNumber()
  discountPercentage: number;
}
