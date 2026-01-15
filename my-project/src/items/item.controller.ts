import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ItemsService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from './picture.pipe';

@Controller()
export class UserController {
  constructor(private userService: ItemsService) {}

  @Post('/transactions/purchase')
  async createOrUpdateItem(
    @Body(
      'purchases',
      new ParseArrayPipe({ items: CreateItemDto, whitelist: true }),
    )
    itemsToCtrate,
  ) {
    return await this.userService.create(itemsToCtrate as any);
  }

  @Post('/images/check/:itemId')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File, @Param('itemId') id : string) {
    file['id'] = id
    return file
  }
}
