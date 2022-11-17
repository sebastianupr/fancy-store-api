import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { ProductsAdapter } from './adapters/products.adapter';
import { ProductsHttpController } from './infrastructure/products.http.controller';
import { ProductsResolver } from './infrastructure/products.graphql.resolver';

import GetProductsUseCase from './use-cases/get-products.usecase';

const useCases = [GetProductsUseCase];

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [ProductsHttpController],
  providers: [ProductsAdapter, ProductsResolver, ...useCases],
})
export class ProductsModule {}
