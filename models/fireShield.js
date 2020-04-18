const db = require('../config/db');
const { createQueryFromObject } = require('../helpers/queryHelper');
const moment = require('moment');

const fire_shield_table = 'fire_inspector.fire_shield';

const createFireShield = async data => {
  const {
    buckets_number,
    shield_verification_date,
    instruments_amount,
    extinguishing_material_volume,
    shield_class,
  } = data;
  const formatted_shield_verification_date = moment(
    shield_verification_date,
  ).format('YYYY-MM-DD');
  return await db.any(
    'INSERT ' +
      `INTO ${fire_shield_table} (buckets_number, shield_verification_date, instruments_amount, extinguishing_material_volume, shield_class) ` +
      ' VALUES ($1, $2, $3, $4, $5) ' +
      'RETURNING *',
    [
      buckets_number,
      formatted_shield_verification_date,
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
  const {
    buckets_number,
    shield_verification_date,
    instruments_amount,
    extinguishing_material_volume,
    shield_class,
  } = data;
  const formatted_shield_verification_date = moment(
    shield_verification_date,
  ).format('YYYY-MM-DD');
  const responce = await db.any(
    `UPDATE ${fire_shield_table}
         SET buckets_number=$1,instruments_amount=$2,shield_verification_date=$3 WHERE extinguishing_material_volume=$4 AND shield_class=$5 RETURNING *`,
    [
      buckets_number,
      instruments_amount,
      formatted_shield_verification_date,
      extinguishing_material_volume,
      shield_class,
    ],
  );
  return responce;
};

const deleteFireShield = async data => {
  const { extinguishing_material_volume, shield_class } = data;
  const deleteQueryValues = await createQueryFromObject(
    {
      extinguishing_material_volume,
      shield_class,
    },
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
