import { Id, RelationMappings} from 'objection';
import Base from './base';
import Distributors from './distributors';


export class Users extends Base {
id!: Id;
name! : string;
code! : string;
email! : string;
phoneNumber! : string;

idDistributor? : Id; 
distributor!: Distributors;

static get tableName(){
    return'users';}



static get relationMappings(): RelationMappings{
    return {
        distributor:{
            relation: Base.BelongsToOneRelation,
            modelClass: Distributors,
            join:{
                from: 'users.id',
                to: 'distributors.idUser',
            }

        },
        
    }
}
}


export default Users;