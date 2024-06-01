import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { appConfig, sslConfig } from "@config"
import { getEnvValue } from "@common"
import { HttpsOptions } from "@nestjs/common/interfaces/external/https-options.interface"

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        httpsOptions: getEnvValue<HttpsOptions>({
            development: undefined,
            production: {
                cert: sslConfig().cert,
                key: sslConfig().key
            }
        })
    })
    
    app.enableCors()

    const config = new DocumentBuilder()
        .setTitle("CiStudy Server")
        .setVersion("1.0")
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup("/", app, document, {
        swaggerOptions: { defaultModelsExpandDepth: -1 },
    })

    await app.listen(appConfig().port || 3004)
}
bootstrap()
