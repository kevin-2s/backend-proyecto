const { Client } = require('pg');
require('dotenv').config();

async function run() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });

  try {
    await client.connect();
    
    console.log("=== CATEGORIAS ===");
    const res = await client.query('SELECT id_categoria, nombre, tenant_id FROM categoria;');
    console.table(res.rows);

  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

run();
