import { Module, ValidationPipe } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { appConfig, sslConfig, urlConfig } from "@config"
import { GlobalModule } from "@global"
import { ControllersModule } from "./controllers"
import { APP_PIPE } from "@nestjs/core"

@Module({
    imports: [
        ConfigModule.forRoot(
            {
                isGlobal: true,
                expandVariables: true,
                load: [appConfig, urlConfig, sslConfig] 
            }
        ),
        GlobalModule,
        ControllersModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        }
    ],
})
export class AppModule {}
