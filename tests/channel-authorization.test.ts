import request from "supertest";
import Knex from "knex";
import { Model } from "objection";
import app from "../src/app";
import knexfile from "../knexfile";

describe("Products test", () => {
  let knex: any;
  let seedDistributors: any;
  let seedChannel: any;

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
    seedChannel = await knex("channel-authorizations")
      .insert([
        {
          name: "Channel 1",
          code: "9999",
          idDistributor: seedDistributors[0].id,
        },
      ])
      .returning("*");
  });
  afterAll(async () => {
    await knex.destroy();
  });
  describe("all success", () => {
    it("get alls channels", async () => {
      const response = await request(app).get(`/api/channel`).expect(200);
      expect(response.body.channel.length).toBe(1);
    });

    it("get one channel", async () => {
      const response = await request(app)
        .get(`/api/channel/${seedChannel[0].id}`)
        .expect(200);
      expect(response.body.channel.name).toBe("Channel 1");
    });

    it("update channel", async () => {
      const response = await request(app)
        .put(`/api/channel/${seedChannel[0].id}`)
        .send({
          name: "Channel update",
          code: "000",
          idDistributor: seedDistributors[0].id,
        })
        .expect(200);
      expect(response.body.channel).toBeTruthy();
    });

    it("delete channel", async () => {
      const response = await request(app)
        .delete(`/api/channel/${seedChannel[0].id}`)
        .expect(200);
      expect(response.body.channel).toBeTruthy();
    });

    it("create channel", async () => {
      const response = await request(app)
        .post(`/api/channel`)
        .send({
          name: "Channel test",
          code: "000",
          idDistributor: seedDistributors[0].id,
        })
        .expect(201);
      expect(response.body.channel.name).toBe("Channel test");
    });
  });
  describe("all failed", () => {
    it("update channel", async () => {
      const response = await request(app)
        .put(`/api/channel/8`)
        .send({
          name: "Channel update",
          code: "000",
          idDistributor: seedDistributors[0].id,
        })
        .expect(400);
      expect(response.body.message).toBe("No existing channel with that Id");
    });
    it("delete channel", async () => {
      const response = await request(app).delete(`/api/channel/8`).expect(400);
      expect(response.body.message).toBe("No existing channel with that Id");
    });
    it("create channel", async () => {
        const response = await request(app)
          .post(`/api/channel`)
          .send({
          code: "000",
          idDistributor: seedDistributors[0].id,
          })
          .expect(400);
        expect(response.body.message).toBe("Enter the resqueted parameters" );
      });
  });
});
