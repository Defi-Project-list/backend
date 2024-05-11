import { Module } from "@nestjs/common";
import { JoinCodeModule } from "./join-code";

@Module({
    imports: [
        JoinCodeModule
    ]
})
export class ControllersModule {

}