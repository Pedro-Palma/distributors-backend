import { Id, RelationMappings } from "objection";
import { Distributors } from "./distributors";
import Base from "./base";

export class Products extends Base {
  id!: Id;
  name!: string;
  code!: string;
  description!: string;
  amount!: number;
  idDistributor?: Id;
  distributor!: Distributors;

  static get relationMappings(): RelationMappings{
      return {
          distributor:{
              relation: Base.BelongsToOneRelation,
              modelClass: Distributors,
              join:{
                  from: ' products.idDistributor',
                  to:'distributors.id'
              }
          }
      }
  }




  static get tableName() {
    return "products";
  }
}

export default Products;
