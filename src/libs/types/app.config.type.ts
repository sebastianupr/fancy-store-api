export type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

export type AppConfig = {
  port: number;
  shopify: {
    shop: string;
    apiKey: string;
    apiSecretKey: string;
    scopes: string[];
    accessToken: string;
  };
};
