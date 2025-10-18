import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // função assíncrona que inicializa o servidor
  const app = await NestFactory.create(AppModule); // cria a aplicação com o módulo raiz

  process.env.TZ = '-03:00'; //Configura o fuso horário da aplicação.

  app.useGlobalPipes(new ValidationPipe()); //Ativa a classe ValidationPipe em todas as requisições HTTP

  app.enableCors(); // permite CORS (configurar domínios específicos mais tarde)

  await app.listen(process.env.PORT ?? 4000); //inicia o servidor HTTP
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
