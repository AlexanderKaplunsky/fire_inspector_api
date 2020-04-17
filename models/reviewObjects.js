const db = require('../config/db');
const { createQueryFromObject } = require('../helpers/queryHelper');
const moment = require('moment');

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
  const {
    worker_amount,
    comment,
    city,
    address,
    review_status,
    object_owner,
    institution_type,
    review_date,
  } = data;
  console.log(data);
  const formatted_review_date = moment(review_date).format('YYYY-MM-DD');
  const responce = await db.any(
    `UPDATE ${review_objects_table}
         SET worker_amount=$1,comment=$2,city=$3,address=$4,review_status=$5 WHERE object_owner=$6 AND institution_type=$7 AND review_date=$8 RETURNING *`,
    [
      worker_amount,
      comment,
      city,
      address,
      review_status,
      object_owner,
      institution_type,
      formatted_review_date,
    ],
  );
  return responce;
};

const deleteObjectReview = async data => {
  const { object_owner, institution_type, review_date } = data;
  const deleteQueryValues = await createQueryFromObject(
    {
      object_owner,
      institution_type,
      review_date: moment(review_date).format('YYYY-MM-DD'),
    },
    ' AND ',
  );
  const responce = db.any(
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
