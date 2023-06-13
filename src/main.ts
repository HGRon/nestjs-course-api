import { createApp } from './setup';

async function bootstrap() {
  const app = await createApp();
  await app.listen(process.env.PORT || 3000);

  await app.close();
}

bootstrap();
