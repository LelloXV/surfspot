const bcrypt = require('bcrypt');

async function generateHash(plainPassword) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  console.log(`Password: ${plainPassword}`);
  console.log(`Hash: ${hash}`);
}

// Esempio: genera hash per alcune password di test
generateHash('password123');
generateHash('qwertyui');
generateHash('12345678');