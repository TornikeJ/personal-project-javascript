import { validate } from './validate'
import { merge } from './merge'
export class GradebooksModel {
    constructor() {
        this.gradeModelBase = new Map();


    }

    clear() {
        return new Promise((resolve, reject) => {
            if (arguments.length > 0) {
                reject("This function doesn't have an input");
            }

            resolve(this.gradeModelBase.clear());
        });
    };

    async add(level, groupId) {
        // validate(this.schema, obj, true);

        const id = (Math.floor(Math.random() * 1000) + 1).toString();

        this.gradeModelBase.set(level, groupId);

        return id;
    };

    addRecord(gradebookId, record) {
        return new Promise((resolve, reject) => {

            const id = (Math.floor(Math.random() * 1000) + 1).toString();

            resolve(this.gradeModelBase.set(gradebookId, record));
        });
    };


    read(gradebookId, pupilId) {
        return new Promise((resolve, reject) => {
            if (!this.gradeModelBase.has(gradebookId)) {
                reject('Input id is required');
            }
            if (typeof gradebookId !== 'string') {
                reject('Input id should be a string');
            }

            resolve(
                {
                    name: pupilId,
                    records: [this.gradeModelBase.get(gradebookId)]
                }
            );
        });
    };
    remove(id) {
        return new Promise((resolve, reject) => {
            if (!this.gradeModelBase.has(id)) {
                reject('Input can\'t be found');
            }

            resolve(this.gradeModelBase.delete(id));
        });
    };

    readAll() {
        return new Promise((resolve, reject) => {
 
            resolve([...this.gradeModelBase.values()]);
        });
    };
}
