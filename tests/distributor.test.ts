import request from "supertest";
import Knex from "knex";
import { Model } from "objection";
import app from "../src/app";
import knexfile from "../knexfile";

describe("Distributor test", () => {
  let knex: any;
  let seedDistributors: any;

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
  });
  afterAll(async () => {
    await knex.destroy();
  });
  describe("all success", () => {
    it("get alls distributors", async () => {
      const response = await request(app).get(`/api/distributor`).expect(200);
      expect(response.body.distributor.length).toBe(3);
    });
    it("create distributor", async () => {
      const response = await request(app)
        .post(`/api/distributor`)
        .send({
          name: "Distributor Test",
          code: "9999",
          emailNotification: "email@email.com",
          emailAlert: "email@email.com",
        })
        .expect(201);
      expect(response.body.distributor.name).toBe("Distributor Test");
    });

    it("get one distributor", async () => {
      const response = await request(app)
        .get(`/api/distributor/${seedDistributors[0].id}`)
        .expect(200);
      expect(response.body.distributor.name).toBe("Distributor 1");
    });

    it("update distributor", async () => {
      const response = await request(app)
        .put(`/api/distributor/${seedDistributors[0].id}`)
        .send({
          name: "Distributor Test Update",
          code: "9999",
          emailNotification: "email@email.com",
          emailAlert: "email@email.com",
        })
        .expect(200);
      expect(response.body.distributor).toBeTruthy();
    });

    it("delete distributor", async () => {
      const response = await request(app)
        .delete(`/api/distributor/${seedDistributors[0].id}`)
        .expect(200);
      expect(response.body.distributor).toBeTruthy();
    });
  });
  describe("all failed", () => {
    it("create distributor", async () => {
      const response = await request(app)
        .post(`/api/distributor`)
        .send({
          code: "9999",
          emailNotification: "email@email.com",
          emailAlert: "email@email.com",
        })
        .expect(400);
       expect(response.body.message).toBe("Enter the resquested parameters");
    });
    it("update distributor", async () => {
      const response = await request(app)
        .put(`/api/distributor/5`)
        .send({
          name: "Distributor Test Update",
          code: "9999",
          emailNotification: "email@email.com",
          emailAlert: "email@email.com",
        })
        .expect(400);
      expect(response.body.message).toBe("No existing distributor with that Id");
    });
    it("delete distributor", async () => {
      const response = await request(app)
        .delete(`/api/distributor/8`)
        .expect(400);
      expect(response.body.message).toBe("No existing distributor with that Id");
    });

  });
});
