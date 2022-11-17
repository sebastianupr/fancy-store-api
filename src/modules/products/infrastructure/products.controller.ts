import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsHttpController {
  @Get()
  getProducts() {
    return [];
  }
}
