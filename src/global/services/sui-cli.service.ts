import { ShellService } from "./shell.service"
import { Injectable } from "@nestjs/common"

export interface SuiBuildArgs {
  path?: string;
  dumbBytecodeAsBase64?: boolean;
}

@Injectable()
export class SuiCliService {
    constructor(private readonly shellService: ShellService) {}

    build(args?: SuiBuildArgs): string {
        const { path, dumbBytecodeAsBase64 } = { ...args }

        const pathArg = path ? `--path ${path}` : ""

        const dumbBytecodeAsBase64Arg = dumbBytecodeAsBase64
            ? "--dump-bytecode-as-base64"
            : ""

        return this.shellService.executeSync(
            `sui move build ${pathArg} ${dumbBytecodeAsBase64Arg}`,
        )
    }
}
