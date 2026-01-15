import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from "fs/promises";


@Injectable()
export class FilesService {
  async readFile(path : string): Promise<number | any> {
    try {
      const content = await fs.readFile(path, 'utf-8')
      return Number(content)
    } catch (error) {
      new HttpException(
        "File read error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async writeFile(path : string, budget): Promise<number | any> {
    try {
      await fs.writeFile(path, String(budget))
    } catch (error) {
      new HttpException(
        "File write error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
