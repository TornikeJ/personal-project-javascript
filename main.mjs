import {
  SubjectsModel,
  LMSModel,
  TeachersModel,
  PupilsModel,
  GroupsModel,
  GradebooksModel
} from './models'



const history = new SubjectsModel({
  title: 'History',
  lessons: 24
});


// const math = new SubjectsModel({
//   title: 'math',
//   lessons: 24
// });



// const literature = new SubjectsModel({
//     title: 'Literature',
//     lessons: 23
//   }); 

console.log(history.id);
// console.log(literature); EXTRA

const lms = new LMSModel();


(async () => {
  await lms.remove(history);
  await lms.add(history);
  console.log(await lms.verify(history));
  console.log(await lms.readAll());
})();


// Create new Teacher from Teacher's data
const teachers = new TeachersModel();
let data = {
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
    },
  ],
  "phones": [
    {
      "phone": "string",
      "primary": true
    },
  ],
  "sex": "male", // male or female
  "subjects": [
    {
      "subject": "string"
    }
  ],

  "description": "string",
}



// // will return Teacher's id

let teacherId;

// // will return Teachers data including teacher's id

(async () => {
  const teacherId = await teachers.add(data);
//   console.log(await teachers.read(teacherId));
//   console.log(await teachers.update(teacherId,
//     {
//       "name": {
//         'first':'john'
//       },
//       "emails": [
//         {
//           "email": "5",
//           'primary':true
//         }, 
//         {
//           "email": "6",
//           'primary':true
//         }
//       ],
//       "sex":'female',
//       "phones":[
//         {
//           "phone": "5",
//         }
//       ]
//     }
//     ));
//     // await teachers.remove(teacherId);


let pupilData =
{
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


const pupils = new PupilsModel();

// // Create a new pupil


// // will return Pupils data including pupil's id


const room = 236;
const groups = new GroupsModel();


  const pupil = await pupils.add(pupilData);
  console.log(await pupil.id);
  //   console.log(await pupils.read(await pupil.id));
  //   console.log(await pupils.update(pupil.id,
  //     {
  //       "name": {
  //         'first':'john'
  //       },
  //       "sex":'female',
  //       "phones":[
  //         {
  //           "phone": "5",
  //         }
  //       ]
  //     }
  //     ));
  //     // await teachers.remove(pupil.id);

  // Create a new group
  const groupId = await groups.add(room);

  // Remove this pupil from this group
  // groups.removePupil(groupId, pupil.id);

  // Add this pupil to this group
  await groups.addPupil(groupId, pupil.id);

  // Update room for this group
  await groups.update(groupId, {
    room: 237
  });



  // Read information about group
  console.log(await groups.read(groupId));


  // It will return array of groups
  console.log(await groups.readAll());



const pupilId = pupil.id;
// const teacherId = teacherId;
const gradebooks = new GradebooksModel(groups, teachers, lms);

// Create a new gradebook
const level = 1;
const gradebookId = await gradebooks.add(level, groupId);

// Destroy all data inside this gradebook
// gradebooks.clear();

const record = {
  pupilId: pupilId,
  teacherId: teacherId,
  subjectId: history.id,
  lesson: 1,
  mark: 9
};



gradebooks.addRecord(gradebookId, record);

// Read information about oliver results
const oliver = await gradebooks.read(gradebookId, pupilId);

console.log(oliver);

// Read information about all students in this gradebook
const students = gradebooks.readAll(gradebookId); // It will return the array of objects
})();

