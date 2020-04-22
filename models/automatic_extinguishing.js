const db = require('../config/db');
const _ = require('lodash');
const { createSearchQuery } = require('../helpers/queryHelper');
const { createQueryFromObject } = require('../helpers/queryHelper');

const automatic_extinguishing_table = 'fire_inspector.automatic_extinguishing';

const createAutomaticExtinguishing = async data => {
  const { extinguishing_type, certification_authority, area, installer } = data;
  return await db.any(
    'INSERT ' +
      `INTO ${automatic_extinguishing_table} (extinguishing_type, certification_authority, area, installer) ` +
      ' VALUES ($1, $2, $3, $4) ' +
      'RETURNING *',
    [extinguishing_type, certification_authority, area, installer],
  );
};

const readAutomaticExtinguishing = async body => {
  const filter = createSearchQuery(body);
  const selection = await db.any(
    `SELECT * FROM ${automatic_extinguishing_table} ${body && filter}`,
  );
  return selection;
};

const updateAutomaticExtinguishing = async data => {
  const { extinguishing_type, area, certification_authority, installer } = data;
  const responce = await db.any(
    `UPDATE ${automatic_extinguishing_table}
         SET extinguishing_type=$1,area=$2 WHERE certification_authority=$3 AND installer=$4 RETURNING *`,
    [extinguishing_type, area, certification_authority, installer],
  );
  return responce;
};

const deleteAutomaticExtinguishing = async data => {
  const { certification_authority, installer } = data;
  const deleteQueryValues = await createQueryFromObject(
    { certification_authority, installer },
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
