import { Id, RelationMappings } from "objection";
import { Distributors } from "./distributors";
import Base from "./base";

export class Channel_authorization extends Base {
    id!: Id;
    name!: string;
    code!: string;
    idDistributor?: Id;
    distributor!: Distributors;
  
    static get relationMappings(): RelationMappings{
        return {
            distributor:{
                relation: Base.BelongsToOneRelation,
                modelClass: Distributors,
                join:{
                    from: 'channel-authorizations.idDistributor',
                    to:'distributors.id'
                }
            }
        }
    }
  
  
  
  
    static get tableName() {
      return "channel-authorizations";
    }
  }
  
  export default Channel_authorization;