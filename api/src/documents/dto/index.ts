import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Documents } from 'src/models';

export class CreateDocumentDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;
}

export class DocumentResponseDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly content: string;

  @ApiProperty()
  readonly user: string | null;

  @ApiProperty()
  readonly created_at: string;

  @ApiProperty()
  readonly updated_at: string;
}

export const documentResponseDto = (data: Documents): DocumentResponseDto => {
  return {
    id: data.id,
    title: data.title,
    content: data.content,
    user: data.user ? `${data.user.first_name} ${data.user.last_name}` : null,
    created_at: data.createdAt,
    updated_at: data.updatedAt,
  };
};

export const documentListResponseDto = (
  items: Documents[],
): DocumentResponseDto[] => {
  return items.map((data: Documents) => documentResponseDto(data));
};
