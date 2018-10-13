const mysql = require('mysql');
//连接mysql数据库的模块
var pool = mysql.createPool({
  host:'w.rdc.sae.sina.com.cn',
  user:'omkylzkko5',
  password:'zi0lmyyzi2mlmzlk21w00yhwzi434j0j5zhz3w5y',
  database:'app_hzeemy',
  connectionLimit:100
});
//导出连接数据库
module.exports = pool; 































