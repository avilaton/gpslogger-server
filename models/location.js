//creamos la base de datos tienda y el objeto LOCATION donde iremos almacenando la info
var sqlite3 = require('sqlite3').verbose(),
db = new sqlite3.Database('db.sqlite'),
LOCATION = {};

//elimina y crea la tabla clientes
LOCATION._init = function()
{
	db.run("DROP TABLE IF EXISTS locations");
	db.run("CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, lat TEXT, lon TEXT, timestamp TEXT)");
	console.log("Successfully created table locations");
}

//inserta un nuevo usuario en la tabla clientes
LOCATION.insert = function(location)
{
	var stmt = db.prepare("INSERT INTO locations VALUES (?,?,?,?)");
	stmt.run(null,location.lat,location.lon, location.timestamp);
	stmt.finalize();
}

//obtenemos todos los clientes de la tabla clientes
//con db.all obtenemos un array de objetos, es decir todos
LOCATION.all = function(callback)
{
	db.all("SELECT * FROM locations", function(err, rows) {
		if(err)
		{
			throw err;
		}
		else
		{
			callback(null, rows);
		}
	});
}

//obtenemos un usuario por su id, en este caso hacemos uso de db.get
//ya que sólo queremos una fila
LOCATION.get = function(userId,callback)
{
	stmt = db.prepare("SELECT * FROM clientes WHERE id = ?");
	//pasamos el id del cliente a la consulta
    stmt.bind(userId); 
    stmt.get(function(error, row)
    {
    	if(error) 
        {
            throw err;
        } 
        else 
        {
        	//retornamos la fila con los datos del usuario
            if(row) 
            {
                callback("", row);
            }
            else
            {
            	console.log("El usuario no existe");
            }
        }
    });
}
//exportamos el modelo para poder utilizarlo con require
module.exports = LOCATION;