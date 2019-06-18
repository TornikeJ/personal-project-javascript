export class SubjectsModel{
    constructor(obj){
        this.obj=obj;
        this.verify(this.obj)
        let idBase=[];
        let id=(Math.floor(Math.random()*1000) + 1).toString();
  
        for(let i=0; i<idBase.length; i++)
        {
            if(idBase[i]===id)
            {
                id=Math.floor(Math.random()*1000) + 1;
                i=0;
            }
        }
  
        idBase.push(id);
        
        this.id=this.obj.id=id;
  
        return this.obj
    }
  
    verify(obj){
        if(!obj.title || typeof obj.title !== 'string')
        {
            throw new Error('Title required to be a string');
        }
        
        if(!obj.lessons || typeof obj.lessons !== 'number')
        {
            throw new Error('Lessons required to be a number');
        }
  
        if(!obj.description)
        {
            obj.description = null;
        }
        else if(obj.description !== null && typeof obj.description !== 'string')
        {
            throw new Error('Description required to be a string');
        }
    }
}
