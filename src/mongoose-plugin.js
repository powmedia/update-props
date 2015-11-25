/**
 * Plugin for Mongoose
 *
 * Usage:
 * schema.plugin(updatePropsPlugin);
 * ...
 * (From within a model method:)
 * this.updateProps(attrs, allowedKeys)
 */
var update = require('./index.js');

module.exports = function(schema) {
  schema.methods.updateProps = function(attrs, allowedKeys) {
    return update(this, attrs, allowedKeys);
  };
};