import { Global, Module } from "@nestjs/common"
import { RedisClientService, ShellService } from "./services"

@Global()
@Module({
    exports: [
        RedisClientService,
        ShellService
    ],
    providers: [
        RedisClientService,
        ShellService
    ]
})
export class GlobalModule {

}