require('babel-register')({
    presets: ['env']
});

module.exports = require('./sandbox/graphql.js');