var anyDB = require('any-db');
// var conn = anyDB.createConnection('sqlite3://db.sqlite');
var conn = anyDB.createConnection(process.env.DATABASE_URL || 'postgres://gavila:guest@localhost:5432/gpslogger');

LOCATION = {};

LOCATION.create = function (callback) {
    var sql = "CREATE TABLE IF NOT EXISTS locations (id SERIAL NOT NULL PRIMARY KEY, lat TEXT, lon TEXT, time TEXT)";
    conn.query(sql, function (error, result) {
        if (!error) {
            console.log("Successfully created table locations");
            callback(null, result);
        } else {
            console.error(error);
        };
    });
}

LOCATION.drop = function () {
    conn.query("DROP TABLE IF EXISTS locations");
}

LOCATION.insert = function(location) {
    var values = [location.lat, location.lon, location.time];
    var query = conn.query("INSERT INTO locations(lat, lon, time) VALUES ($1,$2,$3)", values);
    // var query = conn.query("INSERT INTO locations VALUES (?,?,?,?)", values);
    query.on('end', function () {
        console.log('done inserting!');
    });
}

LOCATION.all = function(callback) {
    var fields, rows = [];

    conn.query("SELECT * FROM locations")
        .on('error', function (error) {
            throw error;
        })
        .on('fields', function (_fields) {
            fields = _fields;
        })
        .on('data', function (row) {
            rows.push(row);
        })
        .on('end', function () {
            callback(null, rows);
        });
}

module.exports = LOCATION;