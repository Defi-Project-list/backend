import { Body, Controller, Post } from "@nestjs/common"
import { SuiService } from "./sui.service"
import { GetTokenByteCodeRequestBody, GetTokenByteCodeResponseData } from "./sui.dto"
import { ApiTags } from "@nestjs/swagger"

@ApiTags("Sui")
@Controller("api/sui")
export class SuiController {
    constructor(private suiService: SuiService) {}
  @Post("get-token-byte-code")
    async getTokenByteCode(@Body() body: GetTokenByteCodeRequestBody) : Promise<GetTokenByteCodeResponseData> {
        return await this.suiService.getTokenByteCode(body)
    }
}
