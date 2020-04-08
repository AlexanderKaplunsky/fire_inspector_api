const db = require('../config/db');
const {
  getQueryValues,
  createQueryFromObject,
} = require('../helpers/queryHelper');

const review_objects_table = 'fire_inspector.review_objects';

const createObjectReview = async data => {
  const {
    object_owner,
    institution_type,
    worker_amount,
    comment,
    city,
    address,
    review_date,
    review_status,
  } = data;
  return await db.any(
    'INSERT ' +
      `INTO ${review_objects_table} (object_owner, institution_type, worker_amount, comment, city, address, review_date, review_status)` +
      ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ' +
      'RETURNING *',
    [
      object_owner,
      institution_type,
      worker_amount,
      comment,
      city,
      address,
      review_date,
      review_status,
    ],
  );
};

const readObjectReview = async () => {
  const selection = await db.any(`SELECT * FROM ${review_objects_table}`);
  return selection;
};

const updateObjectReview = async data => {
  const { object_owner, institution_type, review_date } = data;
  const currentObjectReview = await db.one(
    `SELECT * FROM ${review_objects_table} WHERE object_owner=$1 AND institution_type=$2 AND review_date=$3`,
    [object_owner, institution_type, review_date],
  );
  if (currentObjectReview) {
    const updateQueryValue = await getQueryValues(currentObjectReview, data);
    if (updateQueryValue.length > 0) {
      const responce = await db.any(
        `UPDATE ${review_objects_table} SET ${updateQueryValue} WHERE object_owner=$1 AND institution_type=$2 AND review_date=$3 RETURNING *`,
        [object_owner, institution_type, review_date],
      );
      return responce;
    }
  }
};

const deleteObjectReview = async data => {
  const { object_owner, institution_type, review_date } = data;
  const deleteQueryValues = await createQueryFromObject(
    { object_owner, institution_type, review_date },
    ' AND ',
  );
  const responce = db.one(
    `DELETE FROM fire_inspector.review_objects WHERE ${deleteQueryValues} RETURNING *`,
  );
  return responce;
};

module.exports = {
  createObjectReview,
  readObjectReview,
  updateObjectReview,
  deleteObjectReview,
};
