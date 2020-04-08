const db = require('../config/db');
const {
  getQueryValues,
  createQueryFromObject,
} = require('../helpers/queryHelper');

const documents_table = 'fire_inspector.documents';

const createDocuments = async data => {
  const {
    document_parties_names,
    document_creating_date,
    document_type,
    document_validity,
  } = data;
  return await db.any(
    'INSERT ' +
      `INTO ${documents_table} (document_parties_names, document_creating_date, document_type, document_validity) ` +
      ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ' +
      'RETURNING *',
    [
      document_parties_names,
      document_creating_date,
      document_type,
      document_validity,
    ],
  );
};

const readDocuments = async () => {
  const selection = await db.any(`SELECT * FROM ${documents_table}`);
  return selection;
};

const updateDocuments = async data => {
  const { document_parties_names, document_type } = data;
  const currentObjectReview = await db.one(
    `SELECT * FROM ${documents_table} WHERE document_parties_names=$1 AND document_type=$2`,
    [document_parties_names, document_type],
  );
  if (currentObjectReview) {
    const updateQueryValue = await getQueryValues(currentObjectReview, data);
    if (updateQueryValue.length > 0) {
      const responce = await db.any(
        `UPDATE ${documents_table} SET ${updateQueryValue} WHERE document_parties_names=$1 AND document_type=$2 RETURNING *`,
        [document_parties_names, document_type],
      );
      return responce;
    }
  }
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
