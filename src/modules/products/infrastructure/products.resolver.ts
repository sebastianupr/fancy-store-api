import { Query, Resolver } from '@nestjs/graphql';

import { Products } from '../domain/models/products.model';
import GetProductsUseCase from '../use-cases/get-products.usecase';

@Resolver('Product')
export class ProductsResolver {
  constructor(private readonly getProductsUseCase: GetProductsUseCase) {}

  @Query(() => Products, { name: 'products', nullable: true })
  async getProducts() {
    const products = await this.getProductsUseCase.handler();
    return products;
  }
}
