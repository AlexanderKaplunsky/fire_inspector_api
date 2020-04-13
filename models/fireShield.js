const db = require('../config/db');
const {
  getQueryValues,
  createQueryFromObject,
} = require('../helpers/queryHelper');

const fire_shield_table = 'fire_inspector.fire_shield';

const createFireShield = async data => {
  const {
    buckets_number,
    shield_verification_date,
    instruments_amount,
    extinguishing_material_volume,
    shield_class,
  } = data;
  return await db.any(
    'INSERT ' +
    `INTO ${fire_shield_table} (buckets_number, shield_verification_date, instruments_amount, extinguishing_material_volume, shield_class) ` +
    ' VALUES ($1, $2, $3, $4, $5) ' +
    'RETURNING *',
    [
      buckets_number,
      shield_verification_date,
      instruments_amount,
      extinguishing_material_volume,
      shield_class,
    ],
  );
};

const readFireShield = async () => {
  const selection = await db.any(`SELECT * FROM ${fire_shield_table}`);
  return selection;
};

const updateFireShield = async data => {
  const { shield_verification_date, shield_class } = data;
  const currentObjectReview = await db.one(
    `SELECT * FROM ${fire_shield_table} WHERE certification_authority=$1 AND installer=$2`,
    [shield_verification_date, shield_class],
  );
  if (currentObjectReview) {
    const updateQueryValue = await getQueryValues(currentObjectReview, data);
    if (updateQueryValue.length > 0) {
      const responce = await db.any(
        `UPDATE ${fire_shield_table} SET ${updateQueryValue} WHERE shield_verification_date=$1 AND shield_class=$2 RETURNING *`,
        [shield_verification_date, shield_class],
      );
      return responce;
    }
  }
};

const deleteFireShield = async data => {
  const { incident_date, reason } = data;
  const deleteQueryValues = await createQueryFromObject(
    { incident_date, reason },
    ' AND ',
  );
  const responce = db.one(
    `DELETE FROM ${fire_shield_table} WHERE ${deleteQueryValues} RETURNING *`,
  );
  return responce;
};

module.exports = {
  createFireShield,
  readFireShield,
  updateFireShield,
  deleteFireShield,
};
