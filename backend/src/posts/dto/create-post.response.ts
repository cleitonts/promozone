import { ApiProperty } from '@nestjs/swagger';

export class CreatePostResponse {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID único do post',
  })
  id: string;

  @ApiProperty({
    example: '2023-08-20T14:30:00.000Z',
    description: 'Data de criação',
  })
  createdAt: Date;
}
