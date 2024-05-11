import { Module } from "@nestjs/common";
import { JoinCodeController } from "./join-code.controller";
import { JoinCodeService } from "./join-code.service";

@Module({
    controllers: [
        JoinCodeController
    ],
    providers: [
        JoinCodeService
    ]
})
export class JoinCodeModule {
    
}