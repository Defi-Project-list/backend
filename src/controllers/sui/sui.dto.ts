//== GET TOKEN BYTE CODE

import { ApiProperty } from "@nestjs/swagger"

export class GetTokenByteCodeRequestBody {
  @ApiProperty()
      decimals: number
  @ApiProperty()
      name: string
  @ApiProperty()
      symbol: string
  @ApiProperty()
      description: string
  @ApiProperty()
      iconUrl: string
}

export class GetTokenByteCodeResponseData {
  @ApiProperty()
      modules: Array<string>
  @ApiProperty()
      dependencies: Array<string>
  @ApiProperty()
      digest: Array<number>
}
