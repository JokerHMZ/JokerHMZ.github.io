const cssnext = require('postcss-cssnext');
const cssvariables = require('postcss-css-variables');
const precss = require('precss');
const cssnano=require('cssnano');
module.exports = {
    plugins: [
        precss({ browsers: "last 3 versions" }),
        cssnext({}),
        cssvariables({}),
        cssnano({})
    ]
};
