import { Global, Module } from "@nestjs/common"
import { AptosCliService, ShellService, SuiCliService } from "./services"

@Global()
@Module({
    exports: [ShellService, SuiCliService, AptosCliService],
    providers: [ShellService, SuiCliService, AptosCliService],
})
export class GlobalModule {}
