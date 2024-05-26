import { Injectable } from "@nestjs/common"
import {
    GetTokenByteCodeRequestBody,
    GetTokenByteCodeResponseData,
} from "./sui.dto"
import { ShellService } from "@global"
import { join } from "path"

@Injectable()
export class SuiService {
    constructor(private readonly shellService: ShellService) {}

    async getTokenByteCode({
        decimals,
        name,
        symbol,
        description,
        iconUrl,
    }: GetTokenByteCodeRequestBody): Promise<GetTokenByteCodeResponseData> {
        const { modules, dependencies, digest } = JSON.parse(
            this.shellService.execSync(
                `sui move build --path ${join(process.cwd(), "src", "controllers", "sui", "modules", "token")} --dump-bytecode-as-base64`,
            ),
        )
        return {    
            modules,
            dependencies,
            digest,
        }
    }
}
