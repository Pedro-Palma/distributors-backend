import request from "supertest";
import Knex from "knex";
import { Model } from "objection";
import app from "../src/app";
import knexfile from "../knexfile";

describe("Products test", () => {
  let knex: any;
  let seedDistributors: any;
  let seedProducts: any;

  beforeAll(async () => {
    const env = process.env.ENV || "development";
    // @ts-ignore
    const conf: any = { ...knexfile.test };
    conf["connection"]["database"] = "distributors_test";
    await Knex(conf).migrate.latest();
    await Knex(conf).destroy();
    knex = Knex(conf);

    Model.knex(knex);
    seedDistributors = await knex("distributors")
      .insert([
        {
          name: "Distributor 1",
          code: "9999",
          emailNotification: "email@email.com",
          emailAlert: "email@email.com",
        },
      ])
      .returning("*");
    seedProducts = await knex("products")
      .insert([
        {
          name: "Product 1",
          code: "9999",
          amount: 5,
          description: "description poduct 1",
          idDistributor: seedDistributors[0].id,
        },
      ])
      .returning("*");
  });
  afterAll(async () => {
    await knex.destroy();
  });
  describe("all success", () => {
    it("get alls products", async () => {
      const response = await request(app).get(`/api/product`).expect(200);
      expect(response.body.product.length).toBe(1);
    });
    it("get one product", async () => {
      const response = await request(app)
        .get(`/api/product/${seedProducts[0].id}`)
        .expect(200);
      expect(response.body.product.name).toBe("Product 1");
    });
    it("update product", async () => {
      const response = await request(app)
        .put(`/api/product/${seedProducts[0].id}`)
        .send({
          name: "Product update",
          code: "000",
          amount: 15,
          description: "description poduct 1 update",
          idDistributor: seedDistributors[0].id,
        })
        .expect(200);
      expect(response.body.product).toBeTruthy();
    });
    it("delete product", async () => {
      const response = await request(app)
        .delete(`/api/product/${seedProducts[0].id}`)
        .expect(200);
      expect(response.body.product).toBeTruthy();
    });
    it("create product", async () => {
        const response = await request(app)
          .post(`/api/product`)
          .send({
          name: "Product test",
          code: "000",
          amount: 15,
          description: "description poduct 1 test",
          idDistributor: seedDistributors[0].id,
          })
          .expect(201);
        expect(response.body.product.name).toBe("Product test");
      });

  });
  describe("all failed", () => {
    it("update product", async () => {
      const response = await request(app)
        .put(`/api/product/8`)
        .send({
          name: "Product update",
          code: "000",
          amount: 15,
          description: "description poduct 1 update",
          idDistributor: seedDistributors[0].id,
        })
        .expect(400);
      expect(response.body.message).toBe("No existing product with that Id");
    });
    it("delete product", async () => {
      const response = await request(app)
        .delete(`/api/product/8`)
        .expect(400);
      expect(response.body.message).toBe("No existing product with that Id");
    });
    it("create product", async () => {
        const response = await request(app)
          .post(`/api/product`)
          .send({
          code: "000",
          amount: 15,
          description: "description poduct 1 test",
          idDistributor: seedDistributors[0].id,
          })
          .expect(500);
        expect(response.body.message).toBe("Enter the resquested parameters");
      });

  });
  
});
