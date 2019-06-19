import {validate} from "./validate";
export class GradebooksModel {
    constructor(groups, teachers, lms) {
        this.database = new Map();

        this.database.set('groups', groups);
        this.database.set('teachers', teachers);
        this.database.set('lms', lms);
        this.database.set('gradebooks', new Map());

        this.schema = {
            pupilId: "pupilId",
            teacherId: "teacherId",
            subjectId: "history.id",
            lesson: 1,
            mark: 9
        };
    }

    add(level, groupId) {
        return new Promise((resolve, reject) => {
            if(typeof level !== 'number') {
                reject("level is not a number");
            }
            if(typeof groupId !== 'string') {
                reject("groupId is not a string");
            }
            let id = String(Math.floor(Math.random() * new Date().getTime())); 
            let gradebook = Object.create(Object.prototype, {
                id: {
                    value: id,
                    enumerable: true
                },
                level: {
                    value: level,
                    writable: true,
                    enumerable: true
                },
                groupId: {
                    value: groupId,
                    writable: true,
                    enumerable: true
                },
                records: {
                    value: []
                }
            });
            const gradebooks = this.database.get('gradebooks');

            gradebooks.set(id, gradebook);
            resolve(id);
        });
    }

    clear() {
        return new Promise((resolve, reject) => {
            if(arguments.length > 0) {
                reject("clear() does not receive any parameters");
            } else {
                const gradebooks = this.database.get('gradebooks');
                resolve(gradebooks.clear());
            }
        });
    }

    addRecord(gradebookId, record) {
        return new Promise((resolve, reject) => {
            if(typeof gradebookId !== 'string') {
                reject("Id should be a string");
            }
            if(typeof record !== 'object') {
                reject("Pupil should be an object");
            }
            validate(this.schema, record);

            const gradebooks = this.database.get('gradebooks');
            const currentGradebook = gradebooks.get(gradebookId);
            currentGradebook.records.push(record);

            resolve();
        });
    }

    _findPupil(pupils, pupilId) {
        return pupils.find(pupil => pupil.id === pupilId);
    }
    
    _findTeacher(teachers, teacherId) {
        return teachers.find(teacher => teacher.id === teacherId);
    }

    async read(gradebookId, pupilId) {
        if(typeof gradebookId !== 'string') {
            throw new Error("gradebookId should be a string");
        }

        if(typeof pupilId !== 'string') {
            throw new Error("pupilId should be a string");
        }

        const groupsInstanse = this.database.get('groups');
        
        const groups = await groupsInstanse.readAll();

        let pupil;

        groups.forEach((group) => {
            const currentGroup = group;
            const pupils = currentGroup.pupils;
            
            pupil = this._findPupil(pupils, pupilId);
        })

        const gradebooks = this.database.get('gradebooks');
        const currentGradebook = gradebooks.get(gradebookId);
        const recordsDateBase = currentGradebook.records;
        
        let updatedRecords = [];
        
        for (const record of recordsDateBase) {
            const { teacherId, subjectId, lesson, mark } = record;
            const teachers = this.database.get('teachers');
            const lms = this.database.get('lms');
            const { name: { first, last } } = await teachers.read(teacherId);
            const { title } = await lms.read(subjectId);

            updatedRecords.push({
                teacher: `${first} ${last}`,
                subject: title,
                lesson,
                mark
            });
        }
        
        return {
            name: `${pupil.name.first} ${pupil.name.last}`,
            records: updatedRecords
        };
    }

    readAll(gradebookId) {
        return new Promise((resolve, reject) => {
            if(typeof gradebookId !== 'string') {
                reject("Id should be a string");
            }
            resolve([...this.database.get("gradebooks").values()]);
        });
    }
}