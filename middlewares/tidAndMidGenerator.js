const alphabet = '0123456789';

const getRandID = (length) => {
  let resultIs = '';
  for (let i = 0; i < length; i++){
    resultIs += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return resultIs;
};

module.exports = { getRandID }