/**
 * Modules
 */

var _ = require('lodash')
var is = require('@weo-edu/is')
var flat = require('flat')

/**
 * Expose track-prep
 */

var exports = module.exports = prep

function prep (data, pick) {
  data = data.toJSON && data.toJSON() || data
  data = _.pick(data, pick || ['_id', 'displayName', 'createdAt', 'updatedAt'])
  data = convertDates(data)
  if (data._id) {
    data.id = (data._id.toString && data._id.toString()) || data._id
    delete data._id
  }
  return flat(data)
}

exports.user = function (user, pick) {
  user = prep(user, pick || ['displayName', 'name', 'username', 'userType', 'email', 'createdAt', '_id'])
  if (user['name.givenName']) {
    user.firstName = user['name.givenName']
  }
  if (user['name.familyName']) {
    user.lastName = user['name.familyName']
  }

  return user
}

exports.activity = function (activity, pick) {
  return prep(activity, pick || ['displayName', 'publishedAt', 'createdAt', 'actor', 'description', '_id'])
}

exports.group = function (group, pick) {
  return prep(group, pick || ['displayName', 'createdAt', 'groupType', 'owners', '_id'])
}

function convertDates(data) {
  for (var key in data) {
    if (is.date(data[key])) {
      data[key]  = data[key] / 1000
    }
  }
  return data
}
