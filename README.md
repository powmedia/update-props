[![Build Status](https://travis-ci.org/powmedia/update-props.svg)](https://travis-ci.org/powmedia/update-props)

# update-props
Updates a whitelist of an object's properties and returns changes, if any

## Install
```javascript
npm i --save update-props
```

## API
```javascript
updateProps({Object} object, {Object} newProperties, {[String]} allowedKeys);
```

## Usage
```javascript
var update = require('update-props');

var user = {
  name: 'John',
  password: 'foo'
};

var changes = update(user, { name: 'Jane', password: 'bar' }, ['name']);

console.log(changes); // { before: { name: 'John' }, after: { name: 'Jane' } }
console.log(user);    // { name: 'Jane', password: 'foo' }
```

## Mongoose plugin usage
```javascript
var mongoose = require('mongoose');
var updatePropsPlugin = require('update-props/mongoose-plugin');

var userSchema = new mongoose.Schema({ /*...*/ });
userSchema.plugin(updatePropsPlugin);

userSchema.methods.update = function(props) {
  var allowedKeys = [];
  
  if (this.hasPermission('update:name') {
    allowedKeys.push('firstName', 'lastName');
  }
  
  if (this.hasPermission('update:address') {
    allowedKeys.push('address1', 'address2', 'city');
  }
  
  return this.updateProps(props, allowedKeys);
};
```
