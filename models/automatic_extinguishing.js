const db = require('../config/db');
const {
  getQueryValues,
  createQueryFromObject,
} = require('../helpers/queryHelper');

const automatic_extinguishing_table = 'fire_inspector.automatic_extinguishing';

const createAutomaticExtinguishing = async data => {
  const {
    extinguishing_type,
    certification_authority,
    area,
    installer,
  } = data;
  return await db.any(
    'INSERT ' +
    `INTO ${automatic_extinguishing_table} (extinguishing_type, certification_authority, area, installer) ` +
    ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ' +
    'RETURNING *',
    [
      extinguishing_type,
      certification_authority,
      area,
      installer,
    ],
  );
};

const readAutomaticExtinguishing = async () => {
  const selection = await db.any(`SELECT * FROM ${automatic_extinguishing_table}`);
  return selection;
};

const updateAutomaticExtinguishing = async data => {
  const { certification_authority, installer } = data;
  const currentObjectReview = await db.one(
    `SELECT * FROM ${automatic_extinguishing_table} WHERE certification_authority=$1 AND installer=$2`,
    [certification_authority, installer],
  );
  if (currentObjectReview) {
    const updateQueryValue = await getQueryValues(currentObjectReview, data);
    if (updateQueryValue.length > 0) {
      const responce = await db.any(
        `UPDATE ${automatic_extinguishing_table} SET ${updateQueryValue} WHERE certification_authority=$1 AND installer=$2 RETURNING *`,
        [certification_authority, installer],
      );
      return responce;
    }
  }
};

const deleteAutomaticExtinguishing = async data => {
  const { incident_date, reason } = data;
  const deleteQueryValues = await createQueryFromObject(
    { incident_date, reason },
    ' AND ',
  );
  const responce = db.one(
    `DELETE FROM ${automatic_extinguishing_table} WHERE ${deleteQueryValues} RETURNING *`,
  );
  return responce;
};

module.exports = {
  createAutomaticExtinguishing,
  readAutomaticExtinguishing,
  updateAutomaticExtinguishing,
  deleteAutomaticExtinguishing,
};
