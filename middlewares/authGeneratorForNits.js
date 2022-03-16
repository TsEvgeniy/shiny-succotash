const btoa = require('btoa');

const getCharCode = symb => symb.charCodeAt(0);

const buffer = '306812314:CF039A276C5C4F2F889A52258FAFBF51'.split('').map(getCharCode);

const authGenerator = () => {
  let binary = '',
    bytes = new Uint8Array(buffer),
    len = bytes.byteLength;

  for (let index = 0; index < len; index++) {
    binary += String.fromCharCode(bytes[index]);
  }

  return btoa(binary);
}

module.exports = {authGenerator}