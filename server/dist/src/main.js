"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const app_logger_service_1 = require("./logger/services/app-logger/app-logger.service");
const body_parser_1 = require("body-parser");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, body_parser_1.json)({ limit: "50mb" }));
    app.use((0, body_parser_1.urlencoded)({ extended: true, limit: "50mb" }));
    app.enableCors({
        origin: "*",
        methods: "*",
        allowedHeaders: "*",
    });
    app.use((0, helmet_1.default)());
    app.enableShutdownHooks();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    const logger = app.get(app_logger_service_1.AppLoggerService);
    app.useLogger(logger);
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Intenttech API")
        .setDescription(`API for Intenttech, an Intenttech assessment`)
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port, "0.0.0.0");
    logger.log(`App started on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map