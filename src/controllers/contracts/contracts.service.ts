import { Injectable } from "@nestjs/common"
import { AptosCliService, SuiCliService } from "@global"
import { join } from "path"
import { readFileSync, writeFileSync } from "fs"
import {
    AptosPublishPackageTxnPayload,
    GetAptosPublishTokenPayloadRequestBody,
    GetAptosPublishTokenPayloadResponseData,
    GetSuiPublishTokenBytecodeRequestBody,
    GetSuiPublishTokenBytecodeResponseData,
} from "./dtos"
import { pathConfig } from "@config"
import { v4 as uuidv4 } from "uuid"
import { toHex } from "@common"

@Injectable()
export class ContractsService {
    constructor(
    private readonly suiCliService: SuiCliService,
    private readonly aptosCliService: AptosCliService,
    ) {}

    async getSuiPublishTokenBytecode({
        name,
        symbol,
        decimals,
        description,
        iconUrl,
        totalSupply,
    }: GetSuiPublishTokenBytecodeRequestBody): Promise<GetSuiPublishTokenBytecodeResponseData> {
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

    async getAptosPublishTokenPayload({
        name,
        symbol,
        decimals,
        totalSupply,
    }: GetAptosPublishTokenPayloadRequestBody): Promise<GetAptosPublishTokenPayloadResponseData> {
        const tokenModulePath = join(pathConfig().contracts().aptos, "token")
        const tokenSourcePath = join(tokenModulePath, "sources", "token.move")
        const tokenSource = readFileSync(tokenSourcePath, "utf-8")

        try {
            let tokenSourceCopy = tokenSource.slice()

            const replace = (searchValue: string, replaceValue: string) => {
                tokenSourceCopy = tokenSourceCopy.replace(searchValue, replaceValue)
            }

            const getName = (value?: string) =>
                `const TEMPLATE_NAME: vector<u8> = ${value ? `b"${value}"` : "b\"UST Tether\""};`
            const getSymbol = (value?: string) =>
                `const TEMPLATE_SYMBOL: vector<u8> = ${value ? `b"${value}"` : "b\"USDT\""};`
            const getDecimals = (value?: number) =>
                `const TEMPLATE_DECIMALS: u8 = ${value ?? 8};`
            const getTotalSupply = (value?: string) =>
                `const TEMPLATE_TOTAL_SUPPLY: u64 = ${value ?? "10000000000000000"};`

            replace(getName(), getName(name))
            replace(getSymbol(), getSymbol(symbol))
            replace(getDecimals(), getDecimals(decimals))
            replace(getTotalSupply(), getTotalSupply(totalSupply))

            writeFileSync(tokenSourcePath, tokenSourceCopy)

            const payloadJsonPath = join(tokenModulePath, "payload.json")

            this.aptosCliService.buildPublishPayload({
                packageDir: tokenModulePath,
                jsonOutputFile: payloadJsonPath,
                namedAddresses: {
                    token: "0xcafe",
                    deployer: "0xc0ffee",
                },
            })

            const { args } = JSON.parse(
                readFileSync(payloadJsonPath, "utf-8"),
            ) as AptosPublishPackageTxnPayload
            const [metadataSerialized, code] = args

            return {
                functionId:
          "0x1::resource_account::create_resource_account_and_publish_package",
                typeArgs: [],
                args: [
                    {
                        type: "hex",
                        value: `0x${toHex(uuidv4())}`,
                    },
                    {
                        type: metadataSerialized.type,
                        value: metadataSerialized.value,
                    },
                    {
                        type: code.type,
                        value: code.value,
                    },
                ],
            }
        } finally {
            writeFileSync(tokenSourcePath, tokenSource)
        }
    }
}
