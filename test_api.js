const crypto = require('crypto');
require('dotenv').config();

function base64url(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function signJwt(payload, secret) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const headerStr = base64url(JSON.stringify(header));
  const payloadStr = base64url(JSON.stringify(payload));
  
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`${headerStr}.${payloadStr}`);
  const signature = hmac.digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
    
  return `${headerStr}.${payloadStr}.${signature}`;
}

async function testEndpoint(endpoint, token, email, tenantId) {
  try {
    const res = await fetch(`http://localhost:3000${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    console.log(`\nEndpoint: ${endpoint}`);
    console.log(`Status: ${res.status}`);
    if (data.data) {
      console.log(`Returned ${data.data.length} items:`);
      console.log(JSON.stringify(data.data.map(x => {
        const cleaned = { ...x };
        delete cleaned.password;
        return cleaned;
      }), null, 2));
    } else {
      console.log(data);
    }
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err.message);
  }
}

async function run() {
  const secret = process.env.JWT_SECRET;
  
  const tokenKarl = signJwt({ sub: '23', roles: ['Administrador'], tenantId: '2', exp: Math.floor(Date.now() / 1000) + 300 }, secret);
  const tokenAdmin = signJwt({ sub: '11', roles: ['Administrador'], tenantId: '1', exp: Math.floor(Date.now() / 1000) + 300 }, secret);

  console.log("=================== TESTING FOR KARL (tenantId: 2) ===================");
  await testEndpoint('/sitios', tokenKarl, 'karlprada@sena.edu.co', '2');
  await testEndpoint('/sedes', tokenKarl, 'karlprada@sena.edu.co', '2');
  await testEndpoint('/productos', tokenKarl, 'karlprada@sena.edu.co', '2');
  await testEndpoint('/areas', tokenKarl, 'karlprada@sena.edu.co', '2');

  console.log("\n=================== TESTING FOR ADMIN (tenantId: 1) ===================");
  await testEndpoint('/sitios', tokenAdmin, 'admin@sena.edu.co', '1');
  await testEndpoint('/sedes', tokenAdmin, 'admin@sena.edu.co', '1');
  await testEndpoint('/productos', tokenAdmin, 'admin@sena.edu.co', '1');
  await testEndpoint('/areas', tokenAdmin, 'admin@sena.edu.co', '1');
}

run();
