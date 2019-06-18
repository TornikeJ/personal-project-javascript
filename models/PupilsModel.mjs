import { validate } from './validate'
import { merge } from './merge'
export class PupilsModel {
    constructor() {
        this.pupilBase = new Map();

        this.schema = {
            "name": {
                "first": "string",
                "last": "string"
            },
            "image": "string",
            "dateOfBirth": "string", // format date
            "phones": [
                {
                    "phone": "string",
                    "primary": "boolean"
                }
            ],
            "sex": "string", // male OR female
            "description": "string"
        }

    }

    async update(key, obj) {
        validate(this.schema, obj, false);

        if (!this.pupilBase.has(key)) {
            throw new Error('We dont have id');
        }

        // const { id } = obj;
        const prevObject = this.pupilBase.get(key);

        const updatedPupil = merge(prevObject, obj);

        // Put fix for primary

        this.pupilBase.set(key, updatedPupil);

        // console.log(updatedTeacher);
        return key;
    }

    add(obj) {
        return new Promise((resolve, reject) => {
            if (typeof obj !== 'object') {
                reject('Input type should be an object');
            }
            validate(this.schema, obj, true);

            const id = (Math.floor(Math.random() * 1000) + 1).toString();

            this.pupilBase.set(id, obj);

            obj.id = id;
       
            resolve(obj);
        });
    };

    read(id) {
        return new Promise((resolve, reject) => {
            if (!this.pupilBase.has(id)) {
                reject('Input id is required');
            }
            if (typeof id !== 'string') {
                reject('Input id should be a string');
            }
            resolve(this.pupilBase.get(id));
        });
    };
    remove(id) {
        return new Promise((resolve, reject) => {
            if (!this.pupilBase.has(id)) {
                reject('Input can\'t be found');
            }

            resolve(this.pupilBase.delete(id));
        });
    };
}
