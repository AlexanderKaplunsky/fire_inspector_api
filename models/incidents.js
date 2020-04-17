const db = require('../config/db');
const { createQueryFromObject } = require('../helpers/queryHelper');
const moment = require('moment');

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
  const formatted_incident_date = moment(incident_date).format('YYYY-MM-DD');
  return await db.any(
    'INSERT ' +
      `INTO ${incidents_table} (incident_address, incident_date, building_damage_percentage, losses, reason, victims_number) ` +
      ' VALUES ($1, $2, $3, $4, $5, $6) ' +
      'RETURNING *',
    [
      incident_address,
      formatted_incident_date,
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
  const {
    incident_address,
    building_damage_percentage,
    losses,
    victims_number,
    incident_date,
    reason,
  } = data;
  const formatted_incident_date = moment(incident_date).format('YYYY-MM-DD');
  const responce = await db.any(
    `UPDATE ${incidents_table}
         SET incident_address=$1,building_damage_percentage=$2,losses=$3,victims_number=$4 WHERE incident_date=$5 AND reason=$6 RETURNING *`,
    [
      incident_address,
      building_damage_percentage,
      losses,
      victims_number,
      formatted_incident_date,
      reason,
    ],
  );
  return responce;
};

const deleteIncidents = async data => {
  const { incident_date, reason } = data;
  const deleteQueryValues = await createQueryFromObject(
    { incident_date: moment(incident_date).format('YYYY-MM-DD'), reason },
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
