import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DbConfig } from "@repo/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DbConnectionOptions } from "@repo/db";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [db], // ←←← this is the correct place
      // envFilePath: ['.env.local', '.env'],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get("db")!, // ← spreads all your db config
        type: "postgres" as const, // type assertion (optional but clean)
        entities: [__dirname + "/../**/*.entity{.ts,.js}"], // or autoLoadEntities
        // autoLoadEntities: true,     // ← very popular in monorepos lately
        synchronize: false,
        migrationsRun: process.env.NODE_ENV === "production",
        logging: configService.get("db.logging"),
      }),
    }),
  ],
  providers: [DbConnectionOptions],
})
export class AppModule {}
