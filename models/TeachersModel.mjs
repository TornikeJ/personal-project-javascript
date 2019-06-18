import {validate} from './validate'
import {merge} from './merge'
export class TeachersModel {
    constructor() {
        this.teacherBase = new Map();

        this.schema = {
            "name": {
                "first": 'Jon',
                "last": "Doe"
            },
            "image": "image",
            "dateOfBirth": "string", // format date
            "emails": [
                {
                    "email": "string",
                    "primary": true
                }
            ],
            "phones": [
                {
                    "phone": "string",
                    "primary": true
                }
            ],
            "sex": "male", // male or female
            "subjects": [
                {
                    "subject": "string"
                }
            ],

            "description": "string",
        }

    }

    async update(key,obj) {
        validate(this.schema, obj, false);

        if (1 > 2) {
            throw new Error('We dont have id');
        }

        // const { id } = obj;
        const prevObject = this.teacherBase.get(key);

        const updatedTeacher = merge(prevObject, obj);

        // Put fix for primary

        this.teacherBase.set(key, updatedTeacher);

        // console.log(updatedTeacher);
        return key;
    }

    async add(obj) {
        validate(this.schema, obj, true);

        const id = (Math.floor(Math.random() * 1000) + 1).toString();

        this.teacherBase.set(id, obj);

        return id;
    };

    read(id) {
        return new Promise((resolve, reject) => {
            if (!this.teacherBase.has(id)) {
                reject('Input id is required');
            }
            if (typeof id !== 'string') {
                reject('Input id is required');
            }
            resolve(this.teacherBase.get(id));
        });
    };
    remove(id) {
        return new Promise((resolve, reject) => {
            if (!this.teacherBase.has(id)) {
                reject('Input can\'t be found');
            }

            resolve(this.teacherBase.delete(id));
        });
    };
}
