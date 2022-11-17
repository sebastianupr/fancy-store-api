import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Shopify from '@shopify/shopify-api';
import { GraphqlClient } from '@shopify/shopify-api/dist/clients/graphql';

@Injectable()
export class ProductsAdapter {
  private readonly graphqlClient: GraphqlClient;

  constructor(private readonly configService: ConfigService) {
    const shop = this.configService.get<string>('shopify.shop');
    const accessToken = this.configService.get<string>('shopify.accessToken');

    this.graphqlClient = new Shopify.Clients.Graphql(shop, accessToken);
  }

  public async findProducts() {
    const response = await this.graphqlClient.query({
      data: `{
        products (first: 10) {
          edges {
            node {
              id
              handle
              title
              description
              descriptionHtml
              totalInventory
              createdAt
              updatedAt
              featuredImage {
                id
                height
                width
                url
              }
              variants(first: 1) {
                edges {
                  node {
                    price
                  }
                }
              }
            }
          }
        }
      }`,
    });
    return (response.body as any).data.products;
  }
}
