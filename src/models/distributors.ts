import { Id, RelationMappings} from 'objection';
import Base from './base';
import { Products } from './products';


export class Distributors extends Base {
id!: Id;
name! : string;
code! : string;
emailNotification! : string;
emailAlert! : string; 

static get tableName(){
    return 'distributors';
}

static get relationMappings(): RelationMappings {
    return {
    idProducts:{
        relation: Base.HasManyRelation,
        modelClass: Products,
        join:{
            from:'distributors.id',
            to:'products.idDistributors'
        }
    }
}
}

}



export default Distributors;