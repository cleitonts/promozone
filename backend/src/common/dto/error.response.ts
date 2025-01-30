import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({
    example: 400,
    description: 'Código HTTP do erro',
  })
  statusCode: number;

  @ApiProperty({
    example: ['title must be longer than 5 characters'],
    description: 'Lista de mensagens de erro',
    type: [String],
  })
  message: string[];

  @ApiProperty({
    example: 'Bad Request',
    description: 'Tipo do erro',
  })
  error: string;
}
