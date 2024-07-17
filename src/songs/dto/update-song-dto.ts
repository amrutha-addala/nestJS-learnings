import {
  IsString,
  IsArray,
  IsMilitaryTime,
  IsDateString,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Artist } from 'src/artists/artist.entity';

export class UpdateSongDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly artists?: Artist[];

  @IsDateString()
  @IsOptional()
  readonly releaseDate?: Date;

  @IsMilitaryTime()
  @IsOptional()
  readonly duration?: Date;

  @IsString()
  @IsOptional()
  readonly lyrics?: string;
}
