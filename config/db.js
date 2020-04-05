const pgp = require("pg-promise")(/*options*/);
const db = pgp("postgres://cvqxknvr:Eee6amIEdLrQgM0fYn5KBqYpYZ5yo1Xz@kandula.db.elephantsql.com:5432/cvqxknvr?ssl=false");

module.exports = db;
