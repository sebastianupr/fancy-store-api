import { AppConfig } from '@src/libs/types/app.config.type';

const loadAppConfig: () => AppConfig = () => ({
  port: Number(process.env.PORT) ?? 3000,
  shopify: {
    shop: process.env.SHOP,
    apiKey: process.env.API_KEY,
    apiSecretKey: process.env.API_SECRET_KEY,
    accessToken: process.env.ACCESS_TOKEN,
    scopes: (process.env.SCOPES as string).split(','),
  },
});

export default loadAppConfig;
