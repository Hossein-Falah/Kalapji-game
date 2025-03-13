import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const SwaggerConfigInit = (app:INestApplication) => {
    const document = new DocumentBuilder()
        .setTitle('Kalapji Game API')
        .setDescription('API documentation for Kalapji Game')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const swaggerDocument = SwaggerModule.createDocument(app, document);
    SwaggerModule.setup('swagger', app, swaggerDocument);
}

const swaggerAuthConfig = (): SecuritySchemeObject => {
    return {
        type: "http",
        bearerFormat: "JWT",
        scheme: "bearer",
        name: "Authorization",
        description: "JWT Authorization header using the Bearer scheme",
        in: "header",
    }
}