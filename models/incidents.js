const db = require('../config/db');
const { createQueryFromObject } = require('../helpers/queryHelper');
const moment = require('moment');
const _ = require('lodash');
const { convertDate } = require('../helpers/queryHelper');
const { createSearchQuery } = require('../helpers/queryHelper');

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

const readIncidents = async body => {
  if (body) {
    body.incident_date = convertDate(body.incident_date);
  }
  const filter = createSearchQuery(body);
  const selection = await db.any(
    `SELECT * FROM ${incidents_table} ${body && filter}`,
  );
  return selection;
};

const updateIncidents = async data => {
  const {
    building_damage_percentage,
    losses,
    victims_number,
    incident_date,
    incident_address,
    reason,
  } = data;
  const formatted_incident_date = moment(incident_date).format('YYYY-MM-DD');
  const responce = await db.any(
    `UPDATE ${incidents_table}
         SET building_damage_percentage=$1,losses=$2,victims_number=$3,incident_date=$4 WHERE incident_address=$5 AND reason=$6 RETURNING *`,
    [
      building_damage_percentage,
      losses,
      victims_number,
      formatted_incident_date,
      incident_address,
      reason,
    ],
  );
  return responce;
};

const deleteIncidents = async data => {
  const { incident_address, reason } = data;
  const deleteQueryValues = await createQueryFromObject(
    { incident_address, reason },
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
