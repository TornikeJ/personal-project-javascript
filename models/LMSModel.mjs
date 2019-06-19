export class LMSModel{
    constructor(){
        this.mp = new Map();
    }

    add(obj) { 
        return new Promise((resolve,reject) => {
            if(typeof obj !== 'object')
            {
                reject('Input must be an object');
            }
            if(!obj.id)
            {
                reject('Input id is required');
            }
            
            resolve(this.mp.set(obj.id,obj));
        });
    };

    
    remove(obj) { 
        return new Promise((resolve,reject) => {
            if(typeof obj !== 'object')
            {
                reject('Input must be an object');
            }
            if(!obj.id)
            {
                reject('Input can\'t be found');
            }
            
            resolve(this.mp.delete(obj.id));
        });
    };

    verify(obj) { 
        return new Promise((resolve,reject) => {
            if(typeof obj !== 'object')
            {
                reject('Input must be an object');
            }
            if(this.mp.has(obj.id))
            {
               resolve(true);
            }

            reject(false);
        });
    };

    read(id){ 
        return new Promise((resolve,reject) => {
            resolve(this.mp.get(id));
        });
    };
    readAll(){ 
        return new Promise((resolve,reject) => {
            if(arguments.length > 0)
            {
                reject("This function doesn't have an input");
            }
            
            resolve([...this.mp.values()]);
        });
    };

}