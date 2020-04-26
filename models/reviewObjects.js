const db = require('../config/db');
const { createQueryFromObject } = require('../helpers/queryHelper');
const moment = require('moment');
const _ = require('lodash');
const { convertDate } = require('../helpers/queryHelper');
const { createSearchQuery } = require('../helpers/queryHelper');

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
    object_name,
    extinguishing_system,
    build_materials,
    build_area,
    fire_exit_count,
    floor_count,
  } = data;
  return await db.any(
    'INSERT ' +
      `INTO ${review_objects_table} (object_owner, institution_type, worker_amount, comment, city, address, review_date, review_status, object_name, extinguishing_system, build_materials, build_area, fire_exit_count, floor_count)` +
      ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) ' +
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
      object_name,
    extinguishing_system,
    build_materials,
    build_area,
    fire_exit_count,
    floor_count,
    ],
  );
};

const readObjectReview = async body => {
  console.log(body)
  if (body && typeof(body.review_date) !== 'undefined') {
    body.review_date = convertDate(body.review_date);
  }
  const filter = createSearchQuery(body);
  const selection = await db.any(
    `SELECT * FROM ${review_objects_table} ${body && filter}`,
  );
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
    object_name,
    extinguishing_system,
    build_materials,
    build_area,
    fire_exit_count,
    floor_count,
    institution_type,
    review_date,
  } = data;
  console.log(data);
  const formatted_review_date = moment(review_date).format('YYYY-MM-DD');
  const responce = await db.any(
    `UPDATE ${review_objects_table}
         SET worker_amount=$1,comment=$2,city=$3,address=$4,review_status=$5, object_name=$6, extinguishing_system=$7, build_materials=$8, build_area=$9, fire_exit_count=$10, floor_count=$11  WHERE object_owner=$12 AND institution_type=$13 AND review_date=$14 RETURNING *`,
    [
      worker_amount,
      comment,
      city,
      address,
      review_status,
      object_owner,
      object_name,
    extinguishing_system,
    build_materials,
    build_area,
    fire_exit_count,
    floor_count,
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
