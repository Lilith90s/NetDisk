let mysql = require('mysql');
mysqlconfig = {
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    port     : '3306',
    database : 'nodejs'
};


function connect() {
    let connection = mysql.createConnection(mysqlconfig);
    connection.connect();
    console.log('打开数据库成功');
    return connection;
}

function createDataBase(dbname){
    let connection = connect();
    let sql = '';
    connection.query(sql,function (err,result) {
        if (err) throw err;
        console.log(result);
    });
}

createDataBase('dabs65');
module.exports = mysqlconfig;