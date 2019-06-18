export function validate(schema, obj, flag) {
    // check the length
    // throw error if is not equal and flag is falser

    if (flag===false) {
        for (let properties of Object.keys(obj)) {
            if (!schema.hasOwnProperty(properties)) {
                throw new Error('Incorrect property entered')
            }
        }

        for (let property of Object.keys(obj)) {
            if (typeof obj[property] !== 'object') {
                if ((schema.hasOwnProperty(property)) && typeof schema[property] === typeof obj[property]) {
                    schema[property] = obj[property];
                }
                else {
                    throw new Error(property + ' should be a type of ' + typeof schema[property]);
                }
            }
            else if (Array.isArray(obj[property])) {
                if ((schema.hasOwnProperty(property)) && typeof schema[property] === typeof obj[property]) {
                    for (let i = 0; i < obj[property].length; i++) {
                        validate(schema[property][0], obj[property][i],false)


                        if (!(obj[property][i].hasOwnProperty('primary'))) {
                            schema[property][i].primary = false;
                        }

                    }
                }
                else {
                    throw new Error(property + ' should be a type of ' + typeof schema[property]);
                }

            }
            else {
                if ((schema.hasOwnProperty(property)) && typeof schema[property] === typeof obj[property]) {
                    validate(schema[property], obj[property],false)
                }
                else {
                    throw new Error(property + ' should be a type of ' + typeof schema[property]);
                }
            }
        }
    }
    else {
        for (let property of Object.keys(schema)) {
            if (!(obj.hasOwnProperty(property))) {
                throw new Error(property + ' is missing');
            }
        }
        for (let property of Object.keys(obj)) {
            if (typeof obj[property] !== 'object') {
                if (!(schema.hasOwnProperty(property))) {
                    throw new Error(property + ' is extra property');
                }
                if (typeof schema[property] !== typeof obj[property]) {
                    throw new Error(property + ' should be a type of ' + typeof schema[property]);
                }
            }
            else if (Array.isArray(obj[property])) {
                if (!(schema.hasOwnProperty(property))) {
                    throw new Error(property + ' is extra property');
                }
                if (typeof schema[property] !== typeof obj[property]) {
                    throw new Error(property + ' should be a type of ' + typeof schema[property]);
                }

                for (let item of obj[property]) {
                    validate(schema[property][0], item,true)
                }

            }
            else {
                if (!(schema.hasOwnProperty(property))) {
                    throw new Error(property + ' is extra property');
                }
                if (typeof schema[property] !== typeof obj[property]) {
                    throw new Error(property + ' should be a type of ' + typeof schema[property]);
                }

                validate(schema[property], obj[property],true)
            }
        }
        return;
    }
};
