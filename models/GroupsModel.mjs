import { validate } from './validate'
import { merge } from './merge'
export class GroupsModel {
    constructor() {
        this.groupsBase = new Map();

        this.schema = {
                id: 'string',
                room: 5,
                pupils:[]
        }

    }

    async update(key, obj) {
        validate(this.schema, obj, false);

        if (!this.groupsBase.has(key)) {
            throw new Error('We dont have id');
        }

        const prevObject = this.groupsBase.get(key);

        const updatedGroup = merge(prevObject, obj);

        return updatedGroup;

    }

    async add(room) {

        if(typeof room !== 'number') {
            throw new Error("Parameter is not a number");
        } else {
            const id = (Math.floor(Math.random() * 1000) + 1).toString();
            let group = Object.create(Object.prototype, {
                id: {
                    value: id,
                    enumerable: true
                },
                room: {
                    value: room,
                    writable:true,
                    enumerable: true
                },
                pupils: {
                    value: [],
                    enumerable: true,
                    writable:true
                }
            });

            this.groupsBase.set(id, group);
            return group.id;
        }
    };

    async addPupil(groupId,pupil) {
        if(typeof groupId !== 'string') {
            throw new Error("Parameter is not a string");
        }
        if(typeof pupil !== 'object') {
            throw new Error("Parameter is not an object");
        }
        if(!this.groupsBase.has(groupId)) {
            throw new Error("ID not found in base");
        }

        this.groupsBase.get(groupId).pupils.push(pupil);

        
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

    removePupil(groupId,pupilId) {
        return new Promise((resolve, reject) => {
            if (!this.groupsBase.has(groupId)) {
                reject('Input can\'t be found');
            }
            
            for(let i=0;i<this.groupsBase.get(groupId).pupils.length;i++)
            {
                if(this.groupsBase.get(groupId).pupils[i].id===pupilId)
                {
                    resolve(this.groupsBase.get(groupId).pupils.splice(this.groupsBase.get(groupId).pupils.indexOf(this.groupsBase.get(groupId).pupils[i]),1));
                }
            }

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
