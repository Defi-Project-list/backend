import { ApiProperty } from "@nestjs/swagger";

export class GetOutput {
    @ApiProperty()
    joinCode: string
}