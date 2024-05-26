import { urlConfig } from "@config"
import { Injectable, OnModuleInit } from "@nestjs/common"
import { createClient } from "redis"
export type RedisClientType = ReturnType<typeof createClient>;

@Injectable()
export class RedisClientService implements OnModuleInit {
    public client: RedisClientType

    constructor() {}

    async onModuleInit() {
        this.client = createClient({ url: urlConfig().redis })

        await this.client.connect()
    }
}
