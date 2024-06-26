import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsString, Min, ValidateIf } from "class-validator"

export class GetSuiTokenBytecodeRequestBody {
    @IsString()
    @ApiProperty({ default: "USD Tether" })
        name: string
    @IsString()
    @ApiProperty({ default: "USDT" })
        symbol: string
    @IsInt()
    @Min(1)
    @ApiProperty({ default: 8 })
        decimals: number
    @IsString()
    @ValidateIf((_, value) => value)
    @ApiProperty({ nullable: true })
        description?: string
    @IsString()
    @ValidateIf((_, value) => value)
    @ApiProperty({ nullable: true })
        iconUrl?: string
    @IsString()
    @ApiProperty({ default: "1000000000000000000" })
        totalSupply: string
}

export class GetSuiTokenBytecodeResponseData {
    @ApiProperty({ default: "oRzrCwYAAAAKAQAQAhAeAy4+BGwOBXp1B+8B/wEI7gNgBs4ELQr7BAUMgAVrABUBEAEZAgYCBwIWAhcCGAACAgABAQcBAAAEAAwBAAEEAwwBAAEGBAIABwUHAAALAAEAAQ8BBwEAARQJBwEAAgwEBQEAAwoRDwAECAsMAQIEDRABAQAFEQkBAQwFEhMBAQwGEw4PAAcOCAYAAwMBBgIGBQoHDQYKCBICCAAHCAQABAsBAQgFCwIBCAAKAgsDAQgAAQIBBgoJAAEBAQgFAQsBAQkAAQoCAQkAAQgABwkAAgoCCgIKAgsBAQgFBwgEAgsDAQkACwIBCQABCwIBCAABBggEAQUEBwsDAQkAAwUHCAQBDwELAwEIAAIJAAUMQ29pbk1ldGFkYXRhBk9wdGlvbgVUT0tFTgtUcmVhc3VyeUNhcAlUeENvbnRleHQDVXJsB2FkZHJlc3MEY29pbg9jcmVhdGVfY3VycmVuY3kLZHVtbXlfZmllbGQJZnJvbV91MjU2BGluaXQIaXNfZW1wdHkRbWludF9hbmRfdHJhbnNmZXIVbmV3X3Vuc2FmZV9mcm9tX2J5dGVzBG5vbmUGb3B0aW9uFHB1YmxpY19mcmVlemVfb2JqZWN0D3B1YmxpY190cmFuc2ZlcgZzZW5kZXIEc29tZQV0b2tlbgh0cmFuc2Zlcgp0eF9jb250ZXh0A3VybAZ2ZWN0b3IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIKAgsKVVNEIFRldGhlcgoCBQRVU0RUAgEICgIHBnN0cmluZwMIAABkp7O24A0AAgEJAQAAAAACJAcDDAQOBDgABAg4AQwCBQwLBBEKOAIMAgsABwIHAAcBBwMLAgoBOAMMAwwFCwM4BA0FBwQKAS4RCQsBOAULBUoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEEOAYCAA==" })
        modules: Array<string>
    @ApiProperty({
        default: [
            "0x0000000000000000000000000000000000000000000000000000000000000001",
            "0x0000000000000000000000000000000000000000000000000000000000000002"
        ]
    })
        dependencies: Array<string>
    @ApiProperty({
        default: [
            202,
            7,
            169,
            20,
            86,
            75,
            149,
            145,
            22,
            160,
            114,
            80,
            88,
            8,
            180,
            252,
            32,
            198,
            71,
            180,
            76,
            234,
            85,
            203,
            59,
            98,
            251,
            159,
            162,
            147,
            93,
            104
        ]
    })
        digest: Array<number>
}
