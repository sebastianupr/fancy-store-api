import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@src/app.module';

const gql = '/graphql';

describe('GraphQL AppResolver (e2e) {Supertest}', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(gql, () => {
    describe('Products', () => {
      const GET_PRODUCTS_QUERY = `
        query GetProducts($firstPage: Int!, $searchKeyword: String, $nextCursor: String) {
          products(pageSize: $firstPage, searchKeyword: $searchKeyword, nextCursor: $nextCursor) {
            edges {
              node {
                id
                handle
                title
                description
                totalInventory
                productType
                createdAt
                updatedAt
                featuredImage {
                  id
                  width
                  height
                  url
                }
                variants {
                  edges {
                    node {
                      price
                    }
                  }
                }
              }
            }
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
          }
        }
      `;

      const PAGE_SIZE = 8;
      it('should get products', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: GET_PRODUCTS_QUERY,
            variables: { firstPage: PAGE_SIZE },
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.products.edges.length).toEqual(PAGE_SIZE);
          });
      });

      it('should search', () => {
        const SEARCH_KEYWORD = 'Nike';

        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: GET_PRODUCTS_QUERY,
            variables: { firstPage: PAGE_SIZE, searchKeyword: SEARCH_KEYWORD },
          })
          .expect(200)
          .expect((res) => {
            const [{ node: product }] = res.body.data.products.edges;
            const { title } = product;
            expect(title).toContain(SEARCH_KEYWORD);
          });
      });

      it('Should paginate', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: GET_PRODUCTS_QUERY,
            variables: { firstPage: PAGE_SIZE },
          })
          .expect(200)
          .then((res) => {
            const { pageInfo, edges: firsEdges } = res.body.data.products;
            const { endCursor: nextCursor } = pageInfo;

            return request(app.getHttpServer())
              .post(gql)
              .send({
                query: GET_PRODUCTS_QUERY,
                variables: { firstPage: PAGE_SIZE, nextCursor },
              })
              .expect(200)
              .expect((res) => {
                const { edges } = res.body.data.products;

                const allEdges = [...edges, ...firsEdges];

                expect(allEdges.length).toBeGreaterThan(PAGE_SIZE);
              });
          });
      });
    });
  });
});
