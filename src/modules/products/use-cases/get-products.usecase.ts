import { Injectable } from '@nestjs/common';
import {
  ProductsAdapter,
  type FindProductsParams,
  type FindProductsData,
} from '../adapters/products.adapter';

@Injectable()
export default class GetProductsUseCase {
  constructor(private readonly productsAdapter: ProductsAdapter) {}

  public handler(handlerParams: FindProductsParams): Promise<FindProductsData> {
    return this.productsAdapter.findProducts(handlerParams);
  }
}
