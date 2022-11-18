import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Shopify from '@shopify/shopify-api';
import { GraphqlClient } from '@shopify/shopify-api/dist/clients/graphql';

@Injectable()
export class AuthAdapter {
  private readonly graphqlClient: GraphqlClient;

  constructor(private readonly configService: ConfigService) {
    const shop = this.configService.get<string>('shopify.shop');
    const accessToken = this.configService.get<string>('shopify.accessToken');

    this.graphqlClient = new Shopify.Clients.Graphql(shop, accessToken);
  }

  async createCustomer({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    console.log(email, password);
    return null;
  }
}
