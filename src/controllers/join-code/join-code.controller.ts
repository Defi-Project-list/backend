import { Body, Controller, Get, Post } from "@nestjs/common"
import { JoinCodeService } from "./join-code.service"
import { GetOutput } from "./join-code.output"
import { SetInput } from "./join-code.input"
import { ApiTags } from "@nestjs/swagger"

@ApiTags("Join Code")
@Controller("join-code")
export class JoinCodeController {
    constructor(private readonly joinCodeService: JoinCodeService) { }

  @Get()
    get(): Promise<GetOutput> {
        return this.joinCodeService.get()
    }

  @Post()
  set(@Body() body: SetInput) {
      return this.joinCodeService.set(body)
  }
}
