const bcrypt = require("bcryptjs");

module.exports.hashPassword = (userPassword) => {
  bcrypt.hash(userPassword, 10, (err, hashedPassword) => {
    console.log(hashedPassword);
    if (err) {
      console.log(err);
    } else {
      return hashedPassword; 
    }
  });/* 
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(userPassword, salt); */
};

module.exports.isValidPassword = async (userPassword, dbPassword) => {
  await bcrypt.compare(userPassword, dbPassword);
};
