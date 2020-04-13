const db = require('../config/db');
const {
  getQueryValues,
  createQueryFromObject,
} = require('../helpers/queryHelper');

const incidents_table = 'fire_inspector.incidents';

const createIncidents = async data => {
  const {
    incident_address,
    incident_date,
    building_damage_percentage,
    losses,
    reason,
    victims_number,
  } = data;
  return await db.any(
    'INSERT ' +
      `INTO ${incidents_table} (incident_address, incident_date, building_damage_percentage, losses, reason, victims_number) ` +
      ' VALUES ($1, $2, $3, $4, $5, $6) ' +
      'RETURNING *',
    [
      incident_address,
      incident_date,
      building_damage_percentage,
      losses,
      reason,
      victims_number,
    ],
  );
};

const readIncidents = async () => {
  const selection = await db.any(`SELECT * FROM ${incidents_table}`);
  return selection;
};

const updateIncidents = async data => {
  const { incident_date, reason } = data;
  const currentObjectReview = await db.one(
    `SELECT * FROM ${incidents_table} WHERE incident_date=$1 AND reason=$2`,
    [incident_date, reason],
  );
  if (currentObjectReview) {
    const updateQueryValue = await getQueryValues(currentObjectReview, data);
    if (updateQueryValue.length > 0) {
      const responce = await db.any(
        `UPDATE ${incidents_table} SET ${updateQueryValue} WHERE incident_date=$1 AND reason=$2 RETURNING *`,
        [incident_date, reason],
      );
      return responce;
    }
  }
};

const deleteIncidents = async data => {
  const { incident_date, reason } = data;
  const deleteQueryValues = await createQueryFromObject(
    { incident_date, reason },
    ' AND ',
  );
  const responce = db.one(
    `DELETE FROM ${incidents_table} WHERE ${deleteQueryValues} RETURNING *`,
  );
  return responce;
};

module.exports = {
  createIncidents,
  readIncidents,
  updateIncidents,
  deleteIncidents,
};
