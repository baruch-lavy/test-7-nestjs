import { Module } from '@nestjs/common';
import { ItemsService } from './item.service';
import { UserController } from './item.controller';
import { FilesService } from '../files/files.service';

//db
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from './entities/item.entity';

@Module({
  imports: [SequelizeModule.forFeature([Item])],
  controllers: [UserController],
  providers: [ItemsService, FilesService],
  exports: [ItemsService, SequelizeModule],
})
export class UsersModule {}
