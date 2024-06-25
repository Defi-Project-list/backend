import { Injectable } from "@nestjs/common"
import { getEnvValue } from "@common"
import {
    ExecSyncOptionsWithStringEncoding,
    exec,
    execSync,
} from "child_process"
import { platform } from "os"

const options: ExecSyncOptionsWithStringEncoding = {
    shell: getEnvValue({
        development: platform() === "win32" ? "powershell.exe" : undefined,
    }),
    encoding: "utf-8",
}

@Injectable()
export class ShellService {
    
    async execute(command: string): Promise<string> {
        return new Promise((resolve, reject) => {
            exec(command, options, (error, stdout, stderr) => {
                if (error) {
                    reject(error)
                }
                if (stderr) {
                    reject(stderr)
                }
                resolve(stdout)
            })
        })
    }

    executeSync(command: string): string {
        return execSync(command, options)
    }
}
