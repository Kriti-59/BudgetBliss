const bcrypt = require('bcryptjs');

const password = ''; //  test password

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hashed Password:', hash);
});
