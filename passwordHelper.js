const bcrypt = require("bcryptjs");

module.exports.hashPassword = (userPassword) => {
  return bcrypt.hash(userPassword, 10)
      
  /* 
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(userPassword, salt); */
};

module.exports.isValidPassword = async (userPassword, dbPassword) => {
  await bcrypt.compare(userPassword, dbPassword);
};
