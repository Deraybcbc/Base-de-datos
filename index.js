const fs = require("fs");

var mysql = require("mysql2");


const ArchivoLog = 'log.txt';

function FechaHora(mensajes) {
    const FechaTiempo = new Date().toLocaleString();
    const mensaje = `${FechaTiempo} : ${mensajes}\n`;
    fs.appendFileSync(ArchivoLog, mensaje);
    console.log(FechaTiempo);
};

var con = mysql.createConnection({
    host: "dam.inspedralbes.cat",
    user: "a22kevburcac_user",
    password: "A22kevburcac",
    database: "a22kevburcac_Prueba"
});


var pre = [
    ['¿Cuándo acabó la II Guerra Mundial?'],
    ['¿Cuál era el apellido de la reina Isabel II de Inglaterra?'],
    ['¿En qué año se aprobó la actual Constitución española?'],
    ['¿Qué día es la fiesta de la hispanidad?'],
    ['¿Cuál fue el primer presidente democrático de España tras la dictadura franquista?'],
];

var res = [
    ['En 1945'],
    ['Windsor'],
    ['En 1978'],
    ['El 12 de octubre'],
    ['Adolfo Suárez']
];

function InsertPreguntas() {
    var insert = "INSERT INTO PREGUNTAS (pregunta) VALUES ?";

    con.query(insert, [pre], function(error, result) {
        if (error) {
            FechaHora("ERROR AL HACER EL INSERT DE PREGUNTAS EN LA BASE DE DATOS");
            console.log("ERROR AL HACER EL INSERT DE PREGUNTAS EN LA BASE DE DATOS");
        } else {
            FechaHora("NUMERO INSERTADOS DE PREGUNTAS: " + result.affectedRows);
            console.log("NUMERO INSERTADOS DE PREGUNTAS: " + result.affectedRows);
        }

        if (!fs.existsSync(ArchivoLog)) {
            try {
                fs.writeFile(ArchivoLog, "", 'utf8', (error) => {
                    if (error) {
                        //FechaHora("Error al escribir en el archivo");
                        console.log("Error al escribir en el archivo");
                    } else {
                        //FechaHora("Exito al escribi en el archivo");
                        console.log("Exito al escribi en el archivo");
                    }
                })
            } catch (error) {
                console.log("Error al crear el fichero");
            }
        } else {
            console.log("EL fichero LOG ya existe");
        }
    });
};

function InsertRespuestas() {

    var insert2 = "INSERT INTO RESPUESTAS (respuestas) VALUES ?";

    con.query(insert2, [res], function(error, result) {
        if (error) {
            FechaHora("ERROR AL HACER EL INSERT DE RESPUESTAS EN LA BASE DE DATOS");
            console.log("ERROR AL HACER EL INSERT DE RESPUESTAS EN LA BASE DE DATOS");
        } else {
            FechaHora("NUMERO INSERTADOS DE RESPUESTAS: " + result.affectedRows);
            console.log("NUMERO INSERTADOS DE RESPUESTAS: " + result.affectedRows);
        }

        if (!fs.existsSync(ArchivoLog)) {
            try {
                fs.writeFile(ArchivoLog, "", 'utf8', (error) => {
                    if (error) {
                        //FechaHora("Error al escribir en el archivo");
                        console.log("Error al escribir en el archivo");
                    } else {
                        //FechaHora("Exito al escribi en el archivo");
                        console.log("Exito al escribi en el archivo");
                    }
                })
            } catch (error) {
                console.log("Error al crear el fichero");
            }
        } else {
            console.log("EL fichero LOG ya existe");
        }
    });
};
/*
function Delete() {
    const IdUsuario = 140;
    const borrar = "DELETE FROM USUARIOS WHERE id = ?";

    con.query(borrar, [IdUsuario], function(error) {
        if (error) {
            FechaHora("USUARIO NO ENCONTRADO");
            console.log("USUARIO NO ENCONTRADO");
        } else {
            FechaHora("USUARIO ELIMINADO CON LA ID: " + IdUsuario);
            console.log("USUARIO ELIMINADO CON LA ID: " + IdUsuario);
        }
    });
};
*/
function Select() {
    con.query("SELECT P.idPre, P.pregunta, R.respuestas FROM PREGUNTAS P INNER JOIN RESPUESTAS R ON P.idPre =R.idRes", function(error, result) {
        if (error) {
            console.log("ERROR AL HACER LA CONSULTA");
        } else {
            FechaHora("CONSULTA ECHA");
            for (var i = 0; i < result.length; i++) {
                const row = result[i];

                // Print the columns for each row
                for (const key in row) {
                    if (row.hasOwnProperty(key)) {
                        console.log(`${ key }: ${row[key]}`);
                    };
                };
            };
        };
    });
};

con.connect(function(error) {
    if (error) {
        console.log("FALLO AL CONECTAR CON LA BASE DE DATOS");
    } else {
        FechaHora("CONEXION ESTABLECIDA CON LA BASE DE DATOS");
        console.log("CONEXION ESTABLECIDA CON LA BASE DE DATOS");
    }

    //InsertPreguntas();
    //InsertRespuestas();
    //Delete();
    Select();

    con.end(function(error) {
        if (error) {
            FechaHora("FALLO AL CERRAR EL ARCHIVO")
            console.log("FALLO AL CERRAR EL ARCHIVO");
        } else {
            FechaHora("CONEXION CERRADA")
            console.log("CONEXION CERRADA");
        }
    });
});