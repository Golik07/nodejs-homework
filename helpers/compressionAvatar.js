const Jimp = require("jimp");

const compressionAvatar = async (path) => {
  (await Jimp.read(path)).resize(250, 250).write(path);
};

module.exports = compressionAvatar;
