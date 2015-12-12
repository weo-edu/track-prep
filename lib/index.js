/**
 * Modules
 */

var is = require('@weo-edu/is')
var flat = require('flat')
var map = require('@micro-js/map-obj')
var pick = require('@micro-js/pick')

/**
 * Expose track-prep
 */

var exports = module.exports = prep

function prep (data, keys) {
  data = data.toJSON && data.toJSON() || data
  data = pick(keys || ['_id', 'displayName', 'createdAt', 'updatedAt'], data)
  data = map(convertDates, data)
  data = map(convertArray, data)
  if (data._id) {
    data.id = (data._id.toString && data._id.toString()) || data._id
    delete data._id
  }
  return flat(data)
}

exports.user = function (user, pick) {
  user = prep(user, pick || ['displayName', 'name', 'username', 'userType', 'email', 'createdAt', '_id', 'gradeLevels', 'subjects'])
  if (user['name.givenName']) {
    user.firstName = user['name.givenName']
  }
  if (user['name.familyName']) {
    user.lastName = user['name.familyName']
  }
  user.kind = 'user'
  return user
}

exports.activity = function (activity, pick) {
  var activity = prep(activity, pick || ['displayName', 'publishedAt', 'createdAt', 'actor', 'description', '_id'])
  activity.kind = 'share'
  return activity
}

exports.group = function (group, pick) {
  var group = prep(group, pick || ['displayName', 'createdAt', 'groupType', 'owners', '_id'])
  group.kind = 'group'
  return group
}

function convertDates(val) {
  if (is.date(val)) {
    return val / 1000
  } else {
    return val
  }
}

function convertArray(val) {
  if (is.array(val) && (is.string(val[0]) || is.number(val[0]))) {
    return val.join(',')
  } else {
    return val
  }
}
