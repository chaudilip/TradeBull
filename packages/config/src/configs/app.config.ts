import z from "zod";
import { Config, Env } from "../configs/decorators";

const portSchema = z.coerce.number().int().min(1).max(65535);

@Config()
export class AppConfig {
  @Env("NODE_ENV")
  nodeEnv: string = "development"; 

  @Env("APP_NAME")
  appName: string = "my-app";

  @Env("APP_PORT", portSchema)
  port: number = 3000;

  @Env("APP_HOST")
  host: string = "0.0.0.0";
  
  get isDevelopment(): boolean {
    return this.nodeEnv === "development";
  }

  get isProduction(): boolean {
    return this.nodeEnv === "production";
  }
}
