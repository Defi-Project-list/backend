import { Injectable } from "@nestjs/common"
import { getEnvValue } from "@common"
import { exec as sysExec, execSync as sysExecSync } from "child_process"

@Injectable()
export class ShellService {
    async exec(command: string): Promise<string> {
        return new Promise((resolve, reject) => {
            sysExec(
                command,
                // {
                //     shell: getEnvValue({
                //         development: "powershell.exe",
                //     }),
                // },
                (error, stdout, stderr) => {
                    if (error) {
                        reject(error)
                    }
                    if (stderr) {
                        reject(stderr)
                    }
                    resolve(stdout)
                },
            )
        })
    }

    execSync(command: string): string {
        return sysExecSync(command, {
            // shell: getEnvValue({
            //     development: "powershell.exe",
            // }),
            encoding: "utf-8"
        })
    }
}
