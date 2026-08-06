import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[a-zA-ZÀ-ÿ\s-]+$/, {
    message: 'firstName must only contain letters, spaces and hyphens',
  })
  firstName!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[a-zA-ZÀ-ÿ\s-]+$/, {
    message: 'lastName must only contain letters, spaces and hyphens',
  })
  lastName!: string;
}
