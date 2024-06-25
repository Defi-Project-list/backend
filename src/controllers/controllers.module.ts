import { Module } from "@nestjs/common"
import { ContractsModule } from "./contracts"

@Module({
    imports: [ContractsModule],
})
export class ControllersModule {}
