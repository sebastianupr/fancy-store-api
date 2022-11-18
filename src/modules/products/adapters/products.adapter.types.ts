export type FindProductsParams = {
  pageSize: number;
  searchKeyword?: string;
  nextCursor?: string;
};

export type FindProductResponse = {
  data: {
    products: {
      // TODO: add types for edges and pageInfo fields
      edges: any[];
      pageInfo: any;
    };
  };
};

export type FindProductsData = FindProductResponse['data']['products'];
