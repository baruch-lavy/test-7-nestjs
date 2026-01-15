import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "items", timestamps: true })
export class Item extends Model<Item> {
  
  declare id : number
  declare createdAt: Date;
  declare updatedAt: Date;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare type: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare quantity: number;

  @Column({
    type: DataType.INTEGER,
  })
 declare pricePerUnit: number;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
 declare hasImage: boolean;

}
