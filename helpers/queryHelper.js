const _ = require('lodash');
const moment = require('moment');

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

const convertDate = date => {
  const dd = date.slice(0, 2);
  const mm = date.slice(3, 5);
  const yyyy = date.slice(6, 10);

  const rightDate = new Date(`${mm}/${dd}/${yyyy}`);
  return moment(rightDate).format('YYYY-MM-DD');
};

const createSearchQuery = body => {
  const updateKeys = [];
  _.forIn(body, (item, key) => {
    let logicSymbol = '=';
    if (item[0] === '>' || item[0] === '<') {
      logicSymbol = item[0];
    }
    return updateKeys.push(
      `${[key]}${logicSymbol}'${
        logicSymbol === '=' ? [item] : [item.substring(1)]
      }'`,
    );
  });
  if (updateKeys.length > 0) {
    const filter = 'WHERE ' + updateKeys.join(' AND ');
    return filter;
  }
};

module.exports = { getQueryValues, createQueryFromObject, createSearchQuery, convertDate };
