import { Body, Controller, Post } from "@nestjs/common"
import { ContractsService } from "./contracts.service"
import {
    GetSuiTokenBytecodeRequestBody,
    GetSuiTokenBytecodeResponseData,
} from "./contracts.dto"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"

@ApiTags("Contracts")
@Controller("v1/api/contracts")
export class ContractsController {
    constructor(private contractsService: ContractsService) {}

  @ApiOkResponse({type: GetSuiTokenBytecodeResponseData})
  @Post("get-sui-token-bytecode")
    async getSuiTokenBytecode(
    @Body() body: GetSuiTokenBytecodeRequestBody,
    ): Promise<GetSuiTokenBytecodeResponseData> {
        return await this.contractsService.getSuiTokenBytecode(body)
    }
}
