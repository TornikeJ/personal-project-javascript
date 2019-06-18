import { validate } from './validate'
import { merge } from './merge'
export class GroupsModel {
    constructor() {
        this.groupsBase = new Map();

        this.schema = {
                id: 'string',
                room: 5
            }

    }

    async update(key, obj) {
        validate(this.schema, obj, false);

        if (!this.groupsBase.has(key)) {
            throw new Error('We dont have id');
        }

        // const { id } = obj;
        const prevObject = this.groupsBase.get(key);

        const updatedGroup = merge(prevObject, obj);

        // Put fix for primary

        this.groupsBase.set(key, updatedGroup);

        // console.log(updatedTeacher);
        return key;
    }

    async add(room) {
        // validate(this.schema, obj, true);

        const id = (Math.floor(Math.random() * 1000) + 1).toString();

        this.groupsBase.set(id,{room:room});

        return id;
    };

    async addPupil(groupId,pupilId) {
        // validate(this.schema, obj, true);

        
        Object.assign(this.groupsBase.get(groupId),{id:pupilId});
        
        console.log(this.groupsBase.get(groupId));
        
    
    };

    read(id) {
        return new Promise((resolve, reject) => {
            if (!this.groupsBase.has(id)) {
                reject('Input id is required');
            }
            if (typeof id !== 'string') {
                reject('Input id should be a string');
            }
            resolve(this.groupsBase.get(id));
        });
    };
    remove(id) {
        return new Promise((resolve, reject) => {
            if (!this.groupsBase.has(id)) {
                reject('Input can\'t be found');
            }

            resolve(this.groupsBase.delete(id));
        });
    };

    readAll(){ 
        return new Promise((resolve,reject) => {
            if(arguments.length > 0)
            {
                reject("This function doesn't have an input");
            }
            
            resolve([...this.groupsBase.values()]);
        });
    };
}
