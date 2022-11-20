export type FindProductsParams = {
  pageSize: number;
  searchKeyword?: string;
  nextCursor?: string;
};

export type FindProductResponse = {
  data: Data;
};

export interface Data {
  products: Products;
}
export interface Products {
  edges?: EdgesEntity[] | null;
  pageInfo: PageInfo;
}
export interface EdgesEntity {
  node: Node;
}
export interface Node {
  id: string;
  handle: string;
  title: string;
  description: string;
  totalInventory: number;
  productType?: null;
  createdAt: string;
  updatedAt: string;
  featuredImage: FeaturedImage;
  variants: Variants;
}
export interface FeaturedImage {
  id: string;
  width: number;
  height: number;
  url: string;
}
export interface Variants {
  edges?: EdgesEntity1[] | null;
}
export interface EdgesEntity1 {
  node: Node1;
}
export interface Node1 {
  price: string;
}
export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export type FindProductsData = FindProductResponse['data']['products'];
