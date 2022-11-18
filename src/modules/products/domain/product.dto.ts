// TODO: Complete this DTO

export class ProductDto {
  edges: Edge[];
}

class Edge {
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  productType: string;

  // featuredImage: {};

  totalInventory: number;

  createdAt: string;
  updatedAt: string;
  // variants: {};
}
