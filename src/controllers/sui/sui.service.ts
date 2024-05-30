import { Injectable } from "@nestjs/common"
import {
    GetTokenByteCodeRequestBody,
    GetTokenByteCodeResponseData,
} from "./sui.dto"
import { ShellService } from "@global"
import { join } from "path"
import { readFileSync, writeFileSync } from "fs"

@Injectable()
export class SuiService {
    constructor(private readonly shellService: ShellService) {}

    async getTokenByteCode({
        decimals,
        name,
        symbol,
        description,
        iconUrl,
        totalSupply
    }: GetTokenByteCodeRequestBody): Promise<GetTokenByteCodeResponseData> {
        const tokenModulePath = join(process.cwd(), "src", "controllers", "sui", "modules", "token")
        const sourcePath = join(tokenModulePath, "sources", "token.move")
        const source = readFileSync(sourcePath, "utf-8")
        let sourceCopy = source.slice()

        const replace = (searchValue: string, replaceValue: string) => {
            console.log(sourceCopy.indexOf(searchValue))
            sourceCopy = sourceCopy.replace(searchValue, replaceValue)
        }
        console.log(sourceCopy)
        replace("let template_decimal: u8 = 0;", `let template_decimal: u8 = ${decimals};`)
        replace("let template_name: vector<u8> = b\"USD Tether\";", `let template_name: vector<u8> = b"${name}";`)
        replace("let template_symbol: vector<u8> = b\"USDT\";", `let template_symbol: vector<u8> = b"${symbol}";`)
        replace("let template_description: vector<u8> = vector::empty<u8>();", `let template_description: vector<u8> = b"${description}";`)
        replace("let template_icon_url: vector<u8> = vector::empty<u8>();", `let template_icon_url: vector<u8> = b"${iconUrl}";`)
        replace("let template_total_supply: u64 = 10000000000;", `let template_total_supply: u64 = ${totalSupply};`)

        console.log(sourceCopy)
        writeFileSync(sourcePath, sourceCopy)

        const { modules, dependencies, digest } = JSON.parse(
            this.shellService.execSync(
                `sui move build --path ${sourcePath} --dump-bytecode-as-base64`,
            ),
        )

        writeFileSync(sourcePath, source)

        return {    
            modules,
            dependencies,
            digest,
        }
    }
}
