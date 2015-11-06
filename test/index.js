var prep = require('..')
var assert = require('assert')

describe('track-prep', function () {

  it('should prepare generic data', function () {
    var date = new Date()
    var props = prep({
      _id: 0,
      displayName: 'foo',
      nested: {
        displayName: 'bar'
      },
      createdAt: date,
      omit: 'qux'
    }, ['_id', 'displayName', 'nested', 'createdAt'])

    assert.deepEqual(props, {
      _id: 0,
      displayName: 'foo',
      'nested.displayName': 'bar',
      createdAt: date / 1000
    })

  })

  it('should prepare user properties for tracking', function () {
    var date = new Date()
    var props = prep.user({
      _id: 1,
      email: 'foo@gmail.com',
      displayName: 'foo',
      invitations: 3,
      admin: true,
      inviteCode: 'ABDCDF',
      followers: 3,
      following: 3,
      readNotifications: 3,
      name: {
        givenName: 'foo',
        familyName: 'bar',
        honorificPrefix: 'Mr.'
      },
      username: 'foobar2',
      userType: 'teacher',
      createdAt: date
    })

    assert.deepEqual({
      displayName: 'foo',
      'name.givenName': 'foo',
      'name.familyName': 'bar',
      'name.honorificPrefix': 'Mr.',
      'firstName': 'foo',
      'lastName': 'bar',
      'username': 'foobar2',
      'userType': 'teacher',
      'email': 'foo@gmail.com',
      'createdAt': date / 1000,
      'id': 1,
      kind: 'user'
    }, props)
  })

  it('should prepare activity properties for tracking', function () {
    var date = new Date()
    var props = prep.activity({
      _id: 2,
      shareType: 'sheet',
      title: 'woot',
      displayName: 'woot',
      publishedAt: date,
      createdAt: date,
      published: true,
      actor: {
        displayName: 'foo',
        _id: 1
      },
      description: 'super cool activity',
      fork: true
    })

    assert.deepEqual({
      id: 2,
      displayName: 'woot',
      publishedAt: date / 1000,
      createdAt: date / 1000,
      'actor.displayName': 'foo',
      'actor._id': 1,
      description: 'super cool activity',
      kind: 'share'
    }, props)
  })

  it ('should prepare group for tracking', function () {
    var date = new Date()
    var props = prep.group({
      _id: 3,
      displayName: '1st',
      createdAt: date,
      groupType: 'class',
      owners: [{displayName: 'foo', _id: 1}],
      code: 'Abaceda',
      status: 'active'
    })
    assert.deepEqual({
      id: 3,
      displayName: '1st',
      createdAt: date / 1000,
      groupType: 'class',
      'owners.0.displayName': 'foo',
      'owners.0._id': 1,
      kind: 'group'
    }, props)
  })

})
