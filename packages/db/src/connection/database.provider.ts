import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class DatabaseProvider {
  constructor(private readonly dataSource: DataSource) {}

  getDataSource(): DataSource {
    return this.dataSource;
  }

  async checkConnection(): Promise<boolean> {
    try {
      return this.dataSource.isInitialized;
    } catch {
      return false;
    }
  }
}
