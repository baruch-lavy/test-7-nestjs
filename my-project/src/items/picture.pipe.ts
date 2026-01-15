import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const maxSize = 1024 * 250;
    if (value.originalname.split('.')[1] !== 'png' || value.size > maxSize) {
      return {
        isValid: false,
        reason: 'File is too large ot dose not ends with png',
      };
    } else {
      return {
        isValid: true,
        reason: null,
      };
    }
  }
}
