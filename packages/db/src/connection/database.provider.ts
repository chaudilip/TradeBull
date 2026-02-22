import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class DatabaseProvider {
  constructor(private readonly dataSource: DataSource) {}

  getDataSource(): DataSource {
    return this.dataSource;
  }

  async isConnected(): Promise<boolean> {
    try {
      return this.dataSource.isInitialized;
    } catch (error) {
      return false;
    }
  }

  async query<T = any>(sql: string, parameters: any[]): Promise<T> {
    return this.dataSource.query(sql, parameters);
  }
}
