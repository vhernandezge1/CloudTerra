import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'Valentin',    
  host: '34.163.75.19', 
  database: 'quickquote-db',    
  password: 'Password123!', 
  port: 5432, 
  ssl: false                  
});

export default pool;
