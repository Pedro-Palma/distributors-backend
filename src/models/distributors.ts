import { Id, RelationMappings} from 'objection';
import Base from './base';
import { Channel_authorization } from './channel-authorization';
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
    },
    idChannels:{
        relation: Base.HasManyRelation,
        modelClass: Channel_authorization,
        join:{
            from:'distributors.id',
            to:'channel-authorizations.idDistributors'
        }
    }
}
}

}



export default Distributors;