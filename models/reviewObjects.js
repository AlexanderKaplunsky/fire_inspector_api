const db = require('../config/db');

const createObjectReview = async (object_owner, institution_type, worker_amount, comment, city, address, review_date, review_status) => {
  try {
    return await db.any(
      'INSERT INTO fire_inspector.review_objects (object_owner, institution_type, worker_amount, comment, city, address, review_date, review_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [object_owner, institution_type, worker_amount, comment, city, address, review_date, review_status],
    );
  } catch (error) {
    console.log(error);
  }
};

const readObjectReview = async () => {
    try {
        const selection = await db.one('SELECT * FROM fire_inspector.review_objects');
        console.log(selection)
        return
      } catch (error) {
        console.log(error);
      } 
}

class ReviewObjects {
  constructor(object_owner, institution_type, worker_amount, comment, city, address, review_date, review_status) {
    this.object_owner = object_owner;
    this.institution_type = institution_type;
    this.worker_amount = worker_amount;
    this.comment = comment;
    this.city = city;
    this.address = address;
    this.review_date = review_date;
    this.review_status = review_status
  }
}

module.exports = { createObjectReview, readObjectReview  };
