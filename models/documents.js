const db = require('../config/db');
const { createQueryFromObject } = require('../helpers/queryHelper');
const _ = require('lodash');

const moment = require('moment');
const { convertDate } = require('../helpers/queryHelper');
const { createSearchQuery } = require('../helpers/queryHelper');

const documents_table = 'fire_inspector.documents';

const createDocuments = async data => {
  const {
    document_parties_names,
    document_creating_date,
    document_type,
    document_validity,
  } = data;
  const formatted_document_creating_date = moment(
    document_creating_date,
  ).format('YYYY-MM-DD');
  return await db.any(
    'INSERT ' +
      `INTO ${documents_table} (document_parties_names, document_creating_date, document_type, document_validity) ` +
      ' VALUES ($1, $2, $3, $4) ' +
      'RETURNING *',
    [
      document_parties_names,
      formatted_document_creating_date,
      document_type,
      document_validity,
    ],
  );
};

const readDocuments = async body => {
  if (body) {
    body.document_creating_date = convertDate(body.document_creating_date);
  }
  const filter = createSearchQuery(body);
  const selection = await db.any(
    `SELECT * FROM ${documents_table} ${body && filter}`,
  );
  return selection;
};

const updateDocuments = async data => {
  const {
    document_creating_date,
    document_validity,
    document_parties_names,
    document_type,
  } = data;
  const formatted_document_creating_date = moment(
    document_creating_date,
  ).format('YYYY-MM-DD');
  const responce = await db.any(
    `UPDATE ${documents_table}
         SET document_creating_date=$1,document_validity=$2 WHERE document_parties_names=$3 AND document_type=$4 RETURNING *`,
    [
      formatted_document_creating_date,
      document_validity,
      document_parties_names,
      document_type,
    ],
  );
  return responce;
};

const deleteDocuments = async data => {
  const { incident_date, reason } = data;
  const deleteQueryValues = await createQueryFromObject(
    { incident_date, reason },
    ' AND ',
  );
  const responce = db.one(
    `DELETE FROM ${documents_table} WHERE ${deleteQueryValues} RETURNING *`,
  );
  return responce;
};

module.exports = {
  createDocuments,
  readDocuments,
  updateDocuments,
  deleteDocuments,
};
