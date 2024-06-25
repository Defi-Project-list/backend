import { join } from "path"

export const pathConfig = () => ({
    contracts: () => {
        const path = join(process.cwd(), "contracts")
        return {
            aptos: join(path, "aptos"),
            sui: join(path, "sui")
        }
    },
})