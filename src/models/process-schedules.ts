import { Id, RelationMappings } from "objection";
import { Distributors } from "./distributors";
import Base from "./base";

export class Process_Schedules extends Base {
  id!: Id;
  startTime!: Date;
  finishTime!: Date;
  idDistributor?: Id;
  distributor!: Distributors;

  static get relationMappings(): RelationMappings{
      return {
          distributor:{
              relation: Base.BelongsToOneRelation,
              modelClass: Distributors,
              join:{
                  from: 'process-schedules.idDistributor',
                  to:'distributors.id'
              }
          }
      }
  }




  static get tableName() {
    return "process-schedules";
  }
}

export default Process_Schedules;
