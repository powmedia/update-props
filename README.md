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
