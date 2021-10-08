import { Id, RelationMappings } from "objection";
import Base from "./base";
import { Channel_authorization } from "./channel-authorization";
import { Process_Schedules } from "./process-schedules";
import { Products } from "./products";
import { Users } from "./users";

export class Distributors extends Base {
  id!: Id;
  name!: string;
  code!: string;
  emailNotification!: string;
  emailAlert!: string;

  static get tableName() {
    return "distributors";
  }

  static get relationMappings(): RelationMappings {
    return {
      idProducts: {
        relation: Base.HasManyRelation,
        modelClass: Products,
        join: {
          from: "distributors.id",
          to: "products.idDistributors",
        },
      },
      idChannels: {
        relation: Base.HasManyRelation,
        modelClass: Channel_authorization,
        join: {
          from: "distributors.id",
          to: "channel-authorizations.idDistributors",
        },
      },
      idProcessSchedules: {
        relation: Base.HasManyRelation,
        modelClass: Process_Schedules,
        join: {
          from: "distributors.id",
          to: "process-schedules.idDistributors",
        },
      },
      idUsers: {
        relation: Base.HasManyRelation,
        modelClass: Users,
        join: {
          from: "distributors.id",
          to: "users.idDistributors",
        },
      },
    };
  }
}

export default Distributors;
