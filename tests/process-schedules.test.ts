import request from "supertest";
import Knex from "knex";
import { Model } from "objection";
import app from "../src/app";
import knexfile from "../knexfile";

describe("Process-schedules test", () => {
  let knex: any;
  let seedDistributors: any;
  let seedProcess: any;

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
    seedProcess = await knex("process-schedules")
      .insert([
        {
          startTime: "12:00",
          finishTime: "15:00",
          idDistributor: seedDistributors[0].id,
        },
      ])
      .returning("*");
  });
  afterAll(async () => {
    await knex.destroy();
  });
  describe("all success", () => {
    it("get alls process", async () => {
      const response = await request(app).get(`/api/schedule`).expect(200);
      expect(response.body.process.length).toBe(1);
    });

    it("get one process", async () => {
      const response = await request(app)
        .get(`/api/schedule/${seedProcess[0].id}`)
        .expect(200);
      expect(response.body.process.startTime).toBe("12:00:00");
    });

    it("update process", async () => {
      const response = await request(app)
        .put(`/api/schedule/${seedProcess[0].id}`)
        .send({
          startTime: "16:00",
          finishTime: "20:00",
          idDistributor: seedDistributors[0].id,
        })
        .expect(200);
      expect(response.body.process).toBeTruthy();
    });

    it("delete process", async () => {
      const response = await request(app)
        .delete(`/api/schedule/${seedProcess[0].id}`)
        .expect(200);
      expect(response.body.process).toBeTruthy();
    });

    it("create process", async () => {
      const response = await request(app)
        .post(`/api/schedule`)
        .send({
          startTime: "19:00",
          finishTime: "22:00",
          idDistributor: seedDistributors[0].id,
        })
        .expect(201);
      expect(response.body.process.startTime).toBe("19:00");
    });
  });
  describe("all failed", () => {
    it("update process", async () => {
      const response = await request(app)
        .put(`/api/schedule/8`)
        .send({
            startTime: "13:00",
            finishTime: "14:00",
          idDistributor: seedDistributors[0].id,
        })
        .expect(400);
      expect(response.body.message).toBe("No existing process schedules with that Id");
    });
    it("delete process", async () => {
      const response = await request(app).delete(`/api/schedule/8`).expect(400);
      expect(response.body.message).toBe("No existing process schedules with that Id");
    });
    it("create process", async () => {
      const response = await request(app)
        .post(`/api/schedule`)
        .send({
            finishTime: "14:00",
          idDistributor: seedDistributors[0].id,
        })
        .expect(400);
      expect(response.body.message).toBe("Enter the resquested parameters");
    });
  });
});
