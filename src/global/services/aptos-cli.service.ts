import { ShellService } from "./shell.service"
import { Injectable } from "@nestjs/common"

export interface BuildPublishPayloadArgs {
  jsonOutputFile?: string;
  namedAddresses?: Record<string, string>;
}

@Injectable()
export class AptosCliService {
    constructor(private readonly shellService: ShellService) {}

    buildPublishPayload(args?: BuildPublishPayloadArgs): string {
        const { jsonOutputFile, namedAddresses } = { ...args }

        const jsonOutputFileArg = jsonOutputFile
            ? `--json-output-file ${jsonOutputFile}`
            : ""

        const namedAddressesArg = namedAddresses
            ? `--named-addresses ${Object.entries(namedAddresses)
                .map((name, value) => `${name}=${value}`)
                .join(",")}`
            : ""

        return this.shellService.executeSync(
            `aptos move build-publish-payload ${jsonOutputFileArg} ${namedAddressesArg}`,
        )
    }
}
