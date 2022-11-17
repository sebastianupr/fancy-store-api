import { Injectable } from '@nestjs/common';
import { ProductsAdapter } from '../adapters/products.adapter';

@Injectable()
export default class GetProductsUseCase {
  constructor(private readonly productsAdapter: ProductsAdapter) {}

  public handler() {
    return this.productsAdapter.findProducts();
  }
}
