import { ShellService } from "./shell.service"
import { Injectable } from "@nestjs/common"

export interface BuildPublishPayloadArgs {
  packageDir?: string;
  jsonOutputFile?: string;
  namedAddresses?: Record<string, string>;
}

@Injectable()
export class AptosCliService {
    constructor(private readonly shellService: ShellService) {}

    buildPublishPayload(args?: BuildPublishPayloadArgs): string {
        const { packageDir, jsonOutputFile, namedAddresses } = { ...args }

        const pathArg = packageDir
            ? `--package-dir ${packageDir}`
            : ""

        const jsonOutputFileArg = jsonOutputFile
            ? `--json-output-file ${jsonOutputFile}`
            : ""

        const namedAddressesArg = namedAddresses
            ? `--named-addresses ${Object.keys(namedAddresses)
                .map((name) => `${name}=${namedAddresses[name]}`)
                .join(",")}`
            : ""

        return this.shellService.executeSync(
            `aptos move build-publish-payload ${pathArg} ${jsonOutputFileArg} ${namedAddressesArg} --assume-yes`,
        )
    }
}
