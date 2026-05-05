const mysql = require('mysql');
const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
};

const connection = mysql.createConnection(dbConfig);

function handleConnection() {
  connection.connect((error) => {
    if (error) {
      console.error('DB error:', error);
      setTimeout(handleConnection, 2000);
    } else {
      console.log("DB Connected!");
    }
  });

  connection.on('error', (error) => {
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConnection();
    } else {
      throw error;
    }
  });
}
handleConnection();