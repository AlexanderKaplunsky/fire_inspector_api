const db = require('../config/db');
const { createQueryFromObject } = require('../helpers/queryHelper');

const personal_table = 'fire_inspector.personal';

const createPersonal = async data => {
  const {
    employee_name,
    fire_fighting_familiarity,
    first_aid_level,
    work_experience,
  } = data;
  return await db.any(
    'INSERT ' +
      `INTO ${personal_table} (employee_name, fire_fighting_familiarity, first_aid_level, work_experience) ` +
      ' VALUES ($1, $2, $3, $4) ' +
      'RETURNING *',
    [
      employee_name,
      fire_fighting_familiarity,
      first_aid_level,
      work_experience,
    ],
  );
};

const readPersonal = async () => {
  const selection = await db.any(`SELECT * FROM ${personal_table}`);
  return selection;
};

const updatePersonal = async data => {
  const {
    employee_name,
    fire_fighting_familiarity,
    first_aid_level,
    work_experience,
  } = data;
  const responce = await db.any(
    `UPDATE ${personal_table}
         SET employee_name=$1,fire_fighting_familiarity=$2 WHERE first_aid_level=$3 AND work_experience=$4 RETURNING *`,
    [
      employee_name,
      fire_fighting_familiarity,
      first_aid_level,
      work_experience,
    ],
  );
  return responce;
};

const deletePersonal = async data => {
  const { first_aid_level, work_experience } = data;
  const deleteQueryValues = await createQueryFromObject(
    { first_aid_level, work_experience },
    ' AND ',
  );
  const responce = db.one(
    `DELETE FROM ${personal_table} WHERE ${deleteQueryValues} RETURNING *`,
  );
  return responce;
};

module.exports = {
  createPersonal,
  readPersonal,
  updatePersonal,
  deletePersonal,
};
