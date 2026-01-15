import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { FilesService } from '../files/files.service';

const PATH =
  'C:\\Users\\internet\\Desktop\\test-7-nestjs\\my-project\\src\\budget\\budget.txt';

@Injectable()
export class ItemsService implements OnModuleInit {
  budget: number;

  constructor(
    @InjectModel(Item)
    private itemModel: typeof Item,
    private fileServise: FilesService,
  ) {}

  async onModuleInit() {
    this.budget = await this.fileServise.readFile(PATH);
  }

  async create(items: CreateItemDto[]) {
    let cost = items.reduce((acc, item) => {
      return acc + item.pricePerUnit * item.quantity;
    }, 0);
    if (this.budget - cost < 0)
      return new BadRequestException('cannot buy, not enough budget');
    try {
      if (Array.isArray(items)) {
        items.forEach(async (item: CreateItemDto) => {
          const existingItem = await this.findOneById(+item.id);
          if (existingItem) {
            await this.update(existingItem.id, item);
          } else await this.itemModel.create(item as any);
        });
      }
      this.budget -= cost;
      await this.fileServise.writeFile(PATH, this.budget);

      let results = ''
      for (let index = 0; index < items.length; index++) {
        const item = items[index];
        const res = {
          id: item.id,
          spent: item.quantity * item.pricePerUnit,
          newQuantity: await this.findOneById(+item.id).then(
            (item) => item?.quantity,
          ),
        };
        results += JSON.stringify(res);
      }

      console.log(results);
      return {"results" :
        results
      }
    } catch (err) {
      throw new BadRequestException(err.message, 'ERROR!');
    }
  }

  async findAll(): Promise<Item[]> {
    return await this.itemModel.findAll();
  }

  async update(id: number, newItem): Promise<Item | undefined | null> {
    try {
      const item = await this.findOneById(id);

      await this.itemModel.update(
        { ...item, quantity: item?.quantity + newItem.quantity },
        { where: { id } },
      );
      return await this.findOneById(id);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async findOneById(id: number): Promise<Item | null | undefined> {
    try {
      return await this.itemModel.findOne({
        where: { id },
      });
    } catch (err) {
      throw new BadRequestException(err.message, 'ERROR!');
    }
  }
}
