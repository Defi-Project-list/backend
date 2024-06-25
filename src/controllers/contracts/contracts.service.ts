import { Injectable } from "@nestjs/common"
import { SuiCliService } from "@global"
import { join } from "path"
import { readFileSync, writeFileSync } from "fs"
import {
    GetSuiTokenBytecodeRequestBody,
    GetSuiTokenBytecodeResponseData,
} from "./contracts.dto"
import { pathConfig } from "@config"

@Injectable()
export class ContractsService {
    constructor(private readonly suiCliService: SuiCliService) {}

    async getSuiTokenBytecode({
        name,
        symbol,
        decimals,
        description,
        iconUrl,
        totalSupply,
    }: GetSuiTokenBytecodeRequestBody): Promise<GetSuiTokenBytecodeResponseData> {
        const tokenModulePath = join(pathConfig().contracts().sui, "token")
        const tokenSourcePath = join(tokenModulePath, "sources", "token.move")
        const tokenSource = readFileSync(tokenSourcePath, "utf-8")

        try {
            let tokenSourceCopy = tokenSource.slice()

            const replace = (searchValue: string, replaceValue: string) => {
                console.log(tokenSourceCopy.indexOf(searchValue))
                tokenSourceCopy = tokenSourceCopy.replace(searchValue, replaceValue)
            }

            const getName = (value?: string) =>
                `const TEMPLATE_NAME: vector<u8> = ${value ? `b"${value}"` : "b\"UST Tether\""};`
            const getSymbol = (value?: string) =>
                `const TEMPLATE_SYMBOL: vector<u8> = ${value ? `b"${value}"` : "b\"USDT\""};`
            const getDecimals = (value?: number) =>
                `const TEMPLATE_DECIMALS: u8 = ${value ?? 8};`
            const getDescription = (value?: string) =>
                `const TEMPLATE_DESCRIPTION: vector<u8> = ${value ? `b"${value}"` : "b\"\""};`
            const getIconUrl = (value?: string) =>
                `const TEMPLATE_ICON_URL: vector<u8> = ${value ? `b"${value}"` : "b\"\""};`
            const getTotalSupply = (value?: string) =>
                `const TEMPLATE_TOTAL_SUPPLY: u64 = ${value ?? "10000000000000000"};`

            replace(getName(), getName(name))
            replace(getSymbol(), getSymbol(symbol))
            replace(getDecimals(), getDecimals(decimals))
            replace(getDescription(), getDescription(description))
            replace(getIconUrl(), getIconUrl(iconUrl))
            replace(getTotalSupply(), getTotalSupply(totalSupply))

            writeFileSync(tokenSourcePath, tokenSourceCopy)

            const { modules, dependencies, digest } = JSON.parse(
                this.suiCliService.build({
                    path: tokenModulePath,
                    dumbBytecodeAsBase64: true,
                }),
            )
            return {
                modules,
                dependencies,
                digest,
            }
        } finally {
            writeFileSync(tokenSourcePath, tokenSource)
        }
    }
}
