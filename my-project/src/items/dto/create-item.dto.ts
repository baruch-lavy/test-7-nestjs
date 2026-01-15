import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateItemDto {

  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;
  
  @IsPositive()
  @IsNumber()
  pricePerUnit: number;

  @IsOptional()
  @IsBoolean()
  hasImage: boolean;
}
