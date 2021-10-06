import { Id} from 'objection';
import Base from './base';


export class Distributors extends Base {
id!: Id;
name! : string;
code! : string;
emailNotification! : string;
emailAlert! : string; 

static get tableName(){
    return'distributors';}



}



export default Distributors;