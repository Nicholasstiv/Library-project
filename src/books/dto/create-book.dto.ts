import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  title!: string;

  @IsString()
  @MinLength(10)
  @MaxLength(200)
  description!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  authors!: string[];

  @IsString()
  @MaxLength(50)
  publisher!: string;

  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  publicationYear!: number;
}
