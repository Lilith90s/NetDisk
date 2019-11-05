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
    });
};

exports.insertFileInfo = function insertFileInfo(fileinfo){
    let sql = 'INSERT INTO fileinfo(md5,username,type,size,uptime,originalfilename,newfilename,location) ';
    sql += 'VALUES ';
    sql += '(';
    sql += '\''+ fileinfo['md5']          +'\',';
    sql += '\''+ fileinfo['username']     +'\',';
    sql += '\''+ fileinfo['type']         +'\',';
    sql += '\''+ fileinfo['size']         +'\',';
    sql += '\''+ fileinfo['uptime']       +'\',';
    sql += '\''+ fileinfo['originalname'] +'\',';
    sql += '\''+ fileinfo['newfilename']  +'\',';
    sql += '\''+ fileinfo['location']     +'\'';
    sql += ');';
    this.query(sql);
};

exports.getFileList = function (username,callback) {
    let connction = connect();
    let sql = 'SELECT * FROM fileinfo WHERE username = \'';
    sql+= username;
    sql+= '\';';
    // console.log(sql);
    connction.query(sql,function (err,result) {
        console.log(result);
        callback(result);
    });
};

//module.exports = mysqlconfig;