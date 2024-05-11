import { Global, Module } from "@nestjs/common"
import { RedisClientService } from "./services"

@Global()
@Module({
    exports: [
        RedisClientService
    ],
    providers: [
        RedisClientService
    ]
})
export class GlobalModule {

}