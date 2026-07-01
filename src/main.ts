
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { DomainExceptionFilter } from "./core/filters/domain-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new DomainExceptionFilter());

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("SGM Backend API")
    .setDescription("API del Sistema de Gestión de Materiales")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Ingresa tu token JWT",
        in: "header",
      },
      "JWT-auth",
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  const rawPort = process.env.PORT;
  let port = 3000;
  if (rawPort) {
    const parsed = Number(rawPort);
    if (!isNaN(parsed) && parsed >= 0 && parsed < 65536) {
      port = parsed;
    } else {
      console.warn(`⚠️ Puerto inválido especificado en PORT ("${rawPort}"). Usando puerto por defecto: 3000`);
    }
  }
  await app.listen(port, '0.0.0.0');
}
bootstrap();
