'use strict';

var _ = require('underscore');


/**
 * Updates a whitelist of an object's properties and returns changes, if any
 * 
 * @param {Object} obj                  Object to update
 * @param {Object} props                Properties user wants to update
 * @param {String[]} [allowedKeys]      Optional key names of properties that are allowed to change (will ignore others)
 *
 * @return {Boolean|Object} changes     The old and new values, or false if no changes were made
 */
module.exports = function(obj, props, allowedKeys) {
  var allowedProps;

  //Pick only allowed properties to update
  if (allowedKeys) {
    allowedProps = _.pick(props, allowedKeys);
  } else {
    allowedProps = props;
  }

  if (_.isEmpty(allowedProps)) return false;

  //Filter down to only changed attributes
  var before = {},
      after = {};

  _.each(allowedProps, function(newVal, key) {
    var oldVal = _.isUndefined(obj[key]) ? null : obj[key];

    if (!_.isEqual(oldVal, newVal)) {
      before[key] = oldVal;
      after[key] = newVal;

      obj[key] = newVal;
    }
  });

  //Exit if there are no changes
  if (_.isEmpty(after)) return false;

  return {
    before: before,
    after: after
  };
};
