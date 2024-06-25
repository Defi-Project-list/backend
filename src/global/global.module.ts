import { Global, Module } from "@nestjs/common"
import { ShellService, SuiCliService } from "./services"

@Global()
@Module({
    exports: [ShellService, SuiCliService],
    providers: [ShellService, SuiCliService],
})
export class GlobalModule {}
