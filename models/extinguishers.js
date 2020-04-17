const db = require('../config/db');
const { createQueryFromObject } = require('../helpers/queryHelper');

const extinguishers_table = 'fire_inspector.extinguishers';

const createExtinguishers = async data => {
  const {
    batch_number,
    producing_country,
    production_year,
    filling_type,
    bulk,
  } = data;
  return await db.any(
    'INSERT ' +
      `INTO ${extinguishers_table} (batch_number, producing_country, production_year, filling_type, bulk) ` +
      ' VALUES ($1, $2, $3, $4, $5) ' +
      'RETURNING *',
    [batch_number, producing_country, production_year, filling_type, bulk],
  );
};

const readExtinguishers = async () => {
  const selection = await db.any(`SELECT * FROM ${extinguishers_table}`);
  return selection;
};

const updateExtinguishers = async data => {
  const {
    producing_country,
    production_year,
    bulk,
    batch_number,
    filling_type,
  } = data;
  const responce = await db.any(
    `UPDATE ${extinguishers_table}
         SET producing_country=$1,production_year=$2,bulk=$3 WHERE batch_number=$4 AND filling_type=$5 RETURNING *`,
    [producing_country, production_year, bulk, batch_number, filling_type],
  );
  return responce;
};

const deleteExtinguishers = async data => {
  const { batch_number, filling_type } = data;
  const deleteQueryValues = await createQueryFromObject(
    { batch_number, filling_type },
    ' AND ',
  );
  const responce = db.one(
    `DELETE FROM ${extinguishers_table} WHERE ${deleteQueryValues} RETURNING *`,
  );
  return responce;
};

module.exports = {
  createExtinguishers,
  readExtinguishers,
  updateExtinguishers,
  deleteExtinguishers,
};
