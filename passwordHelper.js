const bcrypt = require("bcryptjs");

module.exports.hashPassword = async (userPassword) => {
  const hashedPassword = bcrypt.hash(userPassword, 10, async (err, hashedPassword) => {
    if (err) {
      console.log(err);
    } else {
      return await hashedPassword; 
    }
  });/* 
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(userPassword, salt); */
  return hashedPassword;
};

module.exports.isValidPassword = async (userPassword, dbPassword) => {
  await bcrypt.compare(userPassword, dbPassword);
};
