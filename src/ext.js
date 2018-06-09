const zlib = require('zlib');

export function compress(buffer) {
  zlib.deflate(buffer, (err, compressed) => {
    if (!err) {
      console.log(compressed.length);
    } else {
      // handle error
    }

    return compressed;
  });
}
