import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OauthController } from './features/oauth/oauth.controller';
import { OauthService } from './features/oauth/oauth.service';
import { OauthModule } from './features/oauth/oauth.module';


@Module({
  imports: [OauthModule],
  controllers: [AppController, OauthController],
  providers: [AppService, OauthService],
})
export class AppModule {}
