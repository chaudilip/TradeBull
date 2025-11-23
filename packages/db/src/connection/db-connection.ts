import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { DataSource } from "typeorm";
type ConnectionState = {
  connected: boolean;
  migerated: boolean;
};

@Injectable()
export class DbConnectionMonitor implements OnModuleInit, OnModuleDestroy {
  private pingTimer: NodeJS.Timeout | undefined;

  readonly connectionState: ConnectionState = {
    connected: false,
    migerated: false,
  };

  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    await this.checkConnection();
    this.startPing();
  }

  onModuleDestroy() {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
    }
  }

  private async checkConnection() {
    try {
      this.connectionState.connected = this.dataSource.isInitialized;
      if (this.connectionState.connected) {
        const hasMigrations = await this.dataSource.showMigrations();
        this.connectionState.migrated = !hasMigrations;
      }
    } catch (error) {
      this.connectionState.connected = false;
      this.connectionState.migrated = false;
    }
  }

  private startPing() {
    this.pingTimer = setInterval(async () => {
      await this.checkConnection();
    }, 30000); // Check every 30 seconds
  }

  getState(): ConnectionState {
    return { ...this.connectionState };
  }
}
