//creamos la base de datos tienda y el objeto LOCATION donde iremos almacenando la info
var sqlite3 = require('sqlite3').verbose(),
db = new sqlite3.Database('db.sqlite'),
LOCATION = {};

//elimina y crea la tabla clientes
LOCATION.create = function () {
    db.run("CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, lat TEXT, lon TEXT, timestamp TEXT)");
    console.log("Successfully created table locations");
}

LOCATION.drop = function () {
	db.run("DROP TABLE IF EXISTS locations");
}

LOCATION.insert = function(location) {
	var stmt = db.prepare("INSERT INTO locations VALUES (?,?,?,?)");
	stmt.run(null, location.lat, location.lon, location.time);
	stmt.finalize();
}

LOCATION.all = function(callback) {
	db.all("SELECT * FROM locations", function(err, rows) {
		if(err) {
			throw err;
		} else {
			callback(null, rows);
		}
	});
}

LOCATION.get = function(userId,callback) {
	stmt = db.prepare("SELECT * FROM locations");
    stmt.get(function (error, row) {
    	if(error) {
            throw err;
        } else {
            if(row) {
                callback("", row);
            } else {
            	console.log("No locations found");
            }
        }
    });
}

module.exports = LOCATION;