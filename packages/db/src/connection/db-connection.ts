import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from "@nestjs/common";
import { DataSource } from "typeorm";

type ConnectionState = {
  connected: boolean;
  migrated: boolean;
  lastChecked: Date | null;
};

@Injectable()
export class DbConnectionMonitor implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DbConnectionMonitor.name);
  private pingTimer: NodeJS.Timeout | undefined;

  readonly connectionState: ConnectionState = {
    connected: false,
    migrated: false,
    lastChecked: null,
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
      this.connectionState.lastChecked = new Date();

      if (this.connectionState.connected) {
        const hasPendingMigrations = await this.dataSource.showMigrations();
        this.connectionState.migrated = !hasPendingMigrations;

        if (!this.connectionState.migrated) {
          this.logger.warn("Database has pending migrations");
        }
      }
    } catch (error) {
      this.logger.error("Connection check failed", error);
      this.connectionState.connected = false;
      this.connectionState.migrated = false;
    }
  }

  private startPing() {
    this.pingTimer = setInterval(async () => {
      await this.checkConnection();
    }, 30000);
  }

  getState(): Readonly<ConnectionState> {
    return { ...this.connectionState };
  }
}
