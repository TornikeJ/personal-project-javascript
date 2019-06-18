export function merge(prevobj, newobj) {

    for (let property of Object.keys(newobj)) {
        if (typeof newobj[property] !== 'object') {
            if ((prevobj.hasOwnProperty(property)) && typeof prevobj[property] === typeof prevobj[property]) {
                prevobj[property] = newobj[property];
            }
        }
        else if (Array.isArray(newobj[property])) {
            if ((prevobj.hasOwnProperty(property)) && typeof prevobj[property] === typeof newobj[property]) {
                for (let i = 0; i < newobj[property].length; i++) {
                    merge(prevobj[property][0], newobj[property][i])
                    prevobj[property][i] = newobj[property][i];

                    if (!(newobj[property][i].hasOwnProperty('primary'))) {
                        prevobj[property][i].primary = false;
                    }
                }
            }
        }
        else {
            if ((prevobj.hasOwnProperty(property)) && typeof prevobj[property] === typeof newobj[property]) {
                merge(prevobj[property], newobj[property])
            }
        }
    }
    return prevobj;
};