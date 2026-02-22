import { Global, Module, Provider, DynamicModule } from "@nestjs/common";
import { loadConfig } from "./loader";
import { Class } from "./decorators";

@Global()
@Module({})
export class ConfigModule {
  static register(...configs: Class[]): DynamicModule {
    const providers: Provider[] = configs.map((cfgClass) => ({
      provide: cfgClass,
      useFactory: () => loadConfig(cfgClass),
    }));

    return {
      global: true,
      module: ConfigModule,
      providers,
      exports: providers,
    }
  }
}
