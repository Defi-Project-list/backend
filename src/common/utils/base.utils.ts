import { appConfig } from "@config"

export const getEnvValue = <T=string>(values: {
    development?: T;
    production?: T;
}): T => {
    const { development, production } = values
    switch (appConfig().node) {
    case "production":
        return production
    default:
        return development
    }
}