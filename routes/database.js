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
    // console.log('打开数据库成功');
    return connection;
}
exports.query = function query(sql,callback){
    let connection = connect();
    connection.query(sql,function (err,result) {
        if (err) throw err;
        callback(result[0].newfilename);
    });
};

exports.insertFileInfo = function insertFileInfo(fileinfo){
    let sql = 'INSERT INTO fileinfo(md5,username,originalfilename,newfilename,location) ';
    sql += 'VALUES ';
    sql += '(';
    sql += '\''+ fileinfo['md5']          +'\',';
    sql += '\''+ fileinfo['username']     +'\',';
    sql += '\''+ fileinfo['originalname'] +'\',';
    sql += '\''+ fileinfo['newname']      +'\',';
    sql += '\''+ fileinfo['location']     +'\'';
    sql += ');';
    this.query(sql);
};


//module.exports = mysqlconfig;