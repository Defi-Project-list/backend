import { Module } from "@nestjs/common"
import { JoinCodeModule } from "./join-code"
import { SuiModule } from "./sui"

@Module({
    imports: [
        JoinCodeModule,
        SuiModule
    ]
})
export class ControllersModule {

}