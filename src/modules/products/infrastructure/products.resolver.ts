import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { Products } from '../domain/models/products.model';
import GetProductsUseCase from '../use-cases/get-products.usecase';

@Resolver('Product')
export class ProductsResolver {
  constructor(private readonly getProductsUseCase: GetProductsUseCase) {}

  @Query(() => Products, { name: 'products' })
  async getProducts(
    @Args('pageSize', { type: () => Int }) pageSize: number,
    @Args('searchKeyword', { type: () => String, nullable: true })
    searchKeyword: string,
    @Args('nextCursor', { type: () => String, nullable: true })
    nextCursor: string,
  ) {
    const products = await this.getProductsUseCase.handler({
      pageSize,
      searchKeyword,
      nextCursor,
    });
    return products;
  }
}
