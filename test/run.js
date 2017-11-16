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
  console.log('SCHEMA ' + schema);
    // schema is a JSON-serializable object representing the database structure
}).catch((err) => {
  console.error('describe error' + err);
})


var diff = new dbdiff.DbDiff()
// Compare two databases passing the connection strings
diff.compare(conString1, conSettings2).then(() => {
    console.log(diff.commands('drop'))
}).catch((err) => {
  console.error(err);
})
