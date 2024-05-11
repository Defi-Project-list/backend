import { ApiProperty } from "@nestjs/swagger";
import { isUtf8 } from "buffer";
import { Length } from "class-validator"

export class SetInput {
    @ApiProperty()
    @Length(6,6)
    joinCode: string
}