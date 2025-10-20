import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // função assíncrona que inicializa o servidor
  const app = await NestFactory.create(AppModule); // cria a aplicação com o módulo raiz

  // Obtém a instância do ConfigService que é Global.
  const configService = app.get(ConfigService);

  // Obtém a porta do .env, usando 3000 como fallback.
  const port = configService.get<number>('APP_PORT') || 4000;

  process.env.TZ = '-03:00'; //Configura o fuso horário da aplicação.

  app.useGlobalPipes(new ValidationPipe()); //Ativa a classe ValidationPipe em todas as requisições HTTP

  app.enableCors(); // permite CORS (configurar domínios específicos mais tarde)

  // Define um prefixo global para todas as rotas (e.g., /api/clientes).
  app.setGlobalPrefix('api');

  await app.listen(port); //inicia o servidor HTTP
  console.log(`Application is running on: ${await app.getUrl()}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
