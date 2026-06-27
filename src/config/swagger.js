const swaggerJsdoc = require("swagger-jsdoc");


const options = {

definition: {

openapi:"3.0.0",

info: {

title:"Interview Website API",

version:"1.0.0",

description:"API documentation for student interview platform"

},

servers:[

{

url:"http://localhost:5000"

}

]

},


apis:["./src/routes/*.js"]


};


const swaggerSpec = swaggerJsdoc(options);


module.exports = swaggerSpec;