import mysql from 'mysql2';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Johanna2408',
    database: 'veterinaria',
    port: 3306
});

con.connect(error => {
    if (error) {
        console.error('error conexion', error);
    }else{
        console.log('ok');
    }
});

export const conn = con;