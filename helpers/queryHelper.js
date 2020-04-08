const _ = require('lodash');

const getQueryValues = async (object, objectToCompare) => {
  const updateKeys = [];
  _.forIn(object, (item, key) => {
    if (item !== objectToCompare[key]) {
      return updateKeys.push(`${[key]}='${objectToCompare[key]}'`);
    }
  });
  if (updateKeys.length > 0) {
    return updateKeys.join(', ');
  }
  return [];
};

const createQueryFromObject = async (object, separator = ', ') => {
  const queryKeys = [];
  _.forIn(object, (item, key) => {
    return queryKeys.push(`${[key]}='${[item]}'`);
  });
  return queryKeys.join(separator);
};

module.exports = { getQueryValues, createQueryFromObject };
