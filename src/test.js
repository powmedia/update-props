var test = require('assert'),
    sinon = require('sinon');


var update = require('./index.js');


//Shortcut
test.same = test.deepEqual;


describe('updateAttrs()', function() {
  var obj, allowedKeys;

  beforeEach(function() {
    obj = {
      address: 'Old address',
      phone: 'Old phone',
      instructions: 'Old instructions',
      date: '2014-01-01'
    };

    allowedKeys = ['address', 'phone', 'instructions'];
  });


  it('returns false if value has not changed', function () {
    var changes = update(obj, {
      address: 'Old address',
      phone: 'Old phone'
    });

    test.same(changes, false);
  });

  it('returns false if no properties to change', function () {
    var changes = update(obj, {});

    test.same(changes, false);
  });

  it('updates allowed properties', function () {
    var changes = update(obj, {
      address: 'New address',
      phone: 'New phone'
    }, allowedKeys);
    
    test.same(obj.address, 'New address');
    test.same(obj.phone, 'New phone');
  });

  it('does not update other attributes', function () {
    var changes = update(obj, {
      phone: 'New phone',
      date: '2016-01-01'
    }, allowedKeys);

    test.same(changes, {
      before: { phone: 'Old phone' },
      after: { phone: 'New phone' }
    });
  });

  it('does not update anything if no allowed attributes passed', function () {
    var changes = update(obj, {
      date: '2016-01-01'
    }, allowedKeys);

    test.same(changes, false);
  });

  it('returns changes made', function () {
    var changes = update(obj, {
      address: 'New address',
      instructions: 'Old instructions',
      phone: 'New phone'
    }, allowedKeys);
    
    test.deepEqual(changes, {
      before: { address: 'Old address', phone: 'Old phone' },
      after: { address: 'New address', phone: 'New phone' }
    });
  });

  it('sets changes.before to null if the property did not exist before', function() {
    delete obj.address;

    var changes = update(obj, {
      address: 'New address'
    });

    test.strictEqual(changes.before.address, null);
  });
});
