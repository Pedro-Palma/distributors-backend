import request from "supertest";
import Knex from "knex";
import { Model } from "objection";
import app from "../src/app";
import knexfile from "../knexfile";

describe("Users test", () => {
  let knex: any;
  let seedDistributors: any;
  let seedUsers: any;

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
      seedUsers = await knex("users")
      .insert([
        {
          name: "User 1",
          code: "9999",
          email: "email@gmail.com",
          phoneNumber: "+502 5555-5555",
          idDistributor: seedDistributors[0].id,
        },
      ])
      .returning("*");
  });
  afterAll(async () => {
    await knex.destroy();
  });
  describe("all success", () => {
    it("get alls users", async () => {
      const response = await request(app).get(`/api/user`).expect(200);
      expect(response.body.user.length).toBe(1);
    });
    it("get one user", async () => {
      const response = await request(app)
        .get(`/api/user/${seedUsers[0].id}`)
        .expect(200);
      expect(response.body.user.name).toBe("User 1");
    });
    it("update user", async () => {
      const response = await request(app)
        .put(`/api/user/${seedUsers[0].id}`)
        .send({
          name: "User update",
          code: "000",
          email: "email@gmail.com",
          phoneNumber: "+502 0000-0000",
          idDistributor: seedDistributors[0].id,
        })
        .expect(200);
      expect(response.body.user).toBeTruthy();
    });
    it("delete user", async () => {
      const response = await request(app)
        .delete(`/api/user/${seedUsers[0].id}`)
        .expect(200);
      expect(response.body.user).toBeTruthy();
    });
    it("create user", async () => {
        const response = await request(app)
          .post(`/api/user`)
          .send({
          name: "User test",
          code: "000",
          phoneNumber: "+502 1111-1111",
          email: "test@gmail.com",
          idDistributor: seedDistributors[0].id,
          })
          .expect(201);
        expect(response.body.user.name).toBe("User test");
      });

  });
  describe("all failed", () => {
    it("update user", async () => {
      const response = await request(app)
        .put(`/api/user/8`)
        .send({
          name: "User update",
          code: "000",
          phoneNumber: "+502 2222-2222",
          email: "email@gmail.com",
          idDistributor: seedDistributors[0].id,
        })
        .expect(400);
      expect(response.body.message).toBe("No existing users with that Id");
    });
    it("delete user", async () => {
      const response = await request(app)
        .delete(`/api/user/8`)
        .expect(400);
      expect(response.body.message).toBe("No existing users with that Id");
    });
    it("create user", async () => {
        const response = await request(app)
          .post(`/api/user`)
          .send({
          code: "000",
          phoneNumber: "+502 2222-2222",
          email: "email@gmail.com",
          idDistributor: seedDistributors[0].id,
          })
          .expect(400);
        expect(response.body.message).toBe("Enter the resquested parameters");
      });

  });
  
});
