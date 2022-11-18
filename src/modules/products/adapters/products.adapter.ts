import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Shopify from '@shopify/shopify-api';
import { GraphqlClient } from '@shopify/shopify-api/dist/clients/graphql';

import type {
  FindProductsParams,
  FindProductResponse,
  FindProductsData,
} from './products.adapter.types';

@Injectable()
export class ProductsAdapter {
  private readonly graphqlClient: GraphqlClient;

  constructor(private readonly configService: ConfigService) {
    const shop = this.configService.get<string>('shopify.shop');
    const accessToken = this.configService.get<string>('shopify.accessToken');

    this.graphqlClient = new Shopify.Clients.Graphql(shop, accessToken);
  }

  private async queryProducts(variables: FindProductsParams) {
    return this.graphqlClient.query<FindProductResponse>({
      data: {
        query: `
        query getProducts($pageSize: Int!, $searchKeyword: String, $nextCursor: String) {
          products(first: $pageSize, query: $searchKeyword, after: $nextCursor) {
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
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
          }
        }
        `,
        variables,
      },
    });
  }

  public async findProducts(
    params: FindProductsParams,
  ): Promise<FindProductsData> {
    const response = await this.queryProducts(params);
    return response.body.data.products;
  }
}

export * from './products.adapter.types';
