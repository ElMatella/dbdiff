const conString1 = {
  dialect: 'mysql',
  username: 'sdc',
  password: '',
  database: 'dbdiff_1',
  host: 'localhost'
}
const conSettings2 = 'mysql://devuser:Amax2youmomentary@localhost:4217/dbdiff'

var commands1 = []
var commands2 = ['CREATE TABLE users (email VARCHAR(255), tags varchar(255))']
var expected = `
  CREATE TABLE \`users\` (
    \`email\` varchar(255) NULL,
    \`tags\` varchar(255) NULL
  );
`

var dbdiff = require('../index')
dbdiff.describeDatabase(conString1).then((schema) => {
    return schema
}).then((schema) => {

  dbdiff.describeDatabase(conSettings2).then((schema1) => {
    // console.log('SCHEMA 2 ' + JSON.stringify(schema2))
    // console.log('SCHEMA 1 ' + JSON.stringify(schema1))
    return [schema, schema1]
  }).then((schemas) => {
      // console.log("SCHEMAS[0] " + JSON.stringify(schemas[0].tables[0].name))
      // console.log("SCHEMAS[1] " + JSON.stringify(schemas[1].tables[0].name))
      let diff = new dbdiff.DbDiff()
      diff.compareSchemas(schemas[0], schemas[1])
      // console.log('UP: ' + diff.commands('drop'))
      return { up: diff.commands('drop'), schemas: schemas }
  }).then((result) => {
    console.log("UP: " + JSON.stringify(result.up));
    let diff = new dbdiff.DbDiff()
    // console.log("SCHEMAS[0] " + JSON.stringify(result.schemas[0].tables[0].name))
    // console.log("SCHEMAS[1] " + JSON.stringify(result.schemas[1].tables[0].name))
    diff.compareSchemas(result.schemas[1], result.schemas[0])
    console.log('DOWN: ' + diff.commands('drop'))
  }).catch((err) => {
    console.error("ERR: " + err);
  })
}).catch((err) => {
  console.error('describe error' + err);
})


// diff.compareSchemas(schema1, schema2).then(() => {
//   console.log('UP: ' + diff.commands('drop'));
// }).catch((err) => {
//   console.log('ERRR: ' + JSON.stringify(err));
// })


//
// var diff = new dbdiff.DbDiff()
// // Compare two databases passing the connection strings
// diff.compare(conString1, conSettings2).then(() => {
//     console.log(diff.commands('drop'))
// }).catch((err) => {
//   console.error(err);
// })
