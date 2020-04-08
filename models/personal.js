const db = require('../config/db');
const {
  getQueryValues,
  createQueryFromObject,
} = require('../helpers/queryHelper');

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
    ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ' +
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
  const { first_aid_level, work_experience } = data;
  const currentObjectReview = await db.one(
    `SELECT * FROM ${personal_table} WHERE certification_authority=$1 AND installer=$2`,
    [first_aid_level, work_experience],
  );
  if (currentObjectReview) {
    const updateQueryValue = await getQueryValues(currentObjectReview, data);
    if (updateQueryValue.length > 0) {
      const responce = await db.any(
        `UPDATE ${personal_table} SET ${updateQueryValue} WHERE first_aid_level=$1 AND work_experience=$2 RETURNING *`,
        [first_aid_level, work_experience],
      );
      return responce;
    }
  }
};

const deletePersonal = async data => {
  const { incident_date, reason } = data;
  const deleteQueryValues = await createQueryFromObject(
    { incident_date, reason },
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
