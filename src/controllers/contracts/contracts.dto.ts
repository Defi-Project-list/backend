import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsString, Min } from "class-validator"

//== GET SUI TOKEN BYTECODE
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
  @IsString({always: false})
  @ApiProperty({ nullable: true })
      description?: string
  @IsString()
  @ApiProperty({ nullable: true })
      iconUrl?: string
  @IsString()
  @ApiProperty({ default: "1000000000000000000" })
      totalSupply: string
}

export class GetSuiTokenBytecodeResponseData {
  @ApiProperty()
      modules: Array<string>
  @ApiProperty()
      dependencies: Array<string>
  @ApiProperty()
      digest: Array<number>
}
