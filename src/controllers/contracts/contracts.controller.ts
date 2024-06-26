import { Body, Controller, Post } from "@nestjs/common"
import { ContractsService } from "./contracts.service"
import {
    GetAptosPublishTokenPayloadRequestBody,
    GetAptosPublishTokenPayloadResponseData,
    GetSuiPublishTokenBytecodeRequestBody,
    GetSuiPublishTokenBytecodeResponseData,
} from "./dtos"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"

@ApiTags("Contracts")
@Controller("v1/api/contracts")
export class ContractsController {
    constructor(private contractsService: ContractsService) { }

    @ApiOkResponse({ type: GetSuiPublishTokenBytecodeResponseData })
    @Post("get-sui-publish-token-bytecode")
    async getSuiPublishTokenBytecode(
        @Body() body: GetSuiPublishTokenBytecodeRequestBody,
    ): Promise<GetSuiPublishTokenBytecodeResponseData> {
        return await this.contractsService.getSuiPublishTokenBytecode(body)
    }

    @ApiOkResponse({ type: GetAptosPublishTokenPayloadResponseData })
    @Post("get-aptos-publish-token-payload")
    async getAptosPublishTokenPayload(
        @Body() body: GetAptosPublishTokenPayloadRequestBody,
    ): Promise<GetAptosPublishTokenPayloadResponseData> {
        return await this.contractsService.getAptosPublishTokenPayload(body)
    }
}
