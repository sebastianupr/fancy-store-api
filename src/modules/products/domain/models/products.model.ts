import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field({ nullable: false })
  hasNextPage: boolean;
}

@ObjectType()
export class FeaturedImage {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  height: number;

  @Field(() => Int)
  width: number;

  @Field(() => String)
  url: string;
}

@ObjectType()
class VariantNode {
  @Field(() => String)
  price: string;
}

@ObjectType()
class VariantEdge {
  @Field(() => VariantNode)
  node: VariantNode;
}

@ObjectType()
class Variants {
  @Field(() => [VariantEdge])
  edges: VariantEdge[];
}

@ObjectType()
export class Node {
  @Field(() => String)
  id: string;

  @Field(() => String)
  handle: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  descriptionHtml: string;

  @Field(() => String, { nullable: true })
  productType: string;

  @Field(() => FeaturedImage, { nullable: true })
  featuredImage: FeaturedImage;

  @Field(() => Int)
  totalInventory: number;

  @Field(() => String, { nullable: true })
  createdAt: string;

  @Field(() => String, { nullable: true })
  updatedAt: string;

  @Field(() => Variants)
  variants: Variants;
}

@ObjectType()
export class Edge {
  @Field(() => Node)
  node: Node;
}

@ObjectType()
export class Products {
  @Field(() => [Edge])
  edges: Edge[];

  @Field(() => PageInfo, { nullable: true })
  pageInfo?: PageInfo;
}
