const db = require('../config/db');

// const addUser = async (first_name, last_name, city, university) => {
//   try {
//     return await db.one(
//       'INSERT INTO Users (first_name, last_name, city, university) VALUES ($1, $2, $3, $4)',
//       [first_name, last_name, city, university],
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

class User {
  constructor(first_name, last_name, city, university) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.city = city;
    this.university = university;
  }
}

// module.exports = { addUser };
