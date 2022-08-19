const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const { basedir } = global;

const { User } = require('../../models/user');

const avatarsDir = path.join(basedir, 'public', 'avatars');

const setAvatar = async (req, res) => {
  const { user, file } = req;

  try {
    const { _id } = user;
    const { path: tempPath, originalname } = file;
    const img = await Jimp.read(tempPath);
    const [extension] = originalname.split('.').reverse();
    const newName = `${_id}.${extension}`;
    const uploadPath = path.join(avatarsDir, newName);
    img.resize(250, 250).write(tempPath);
    await fs.rename(tempPath, uploadPath);
    const avatarURL = path.join('avatars', newName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(file.path);
  }
};

module.exports = setAvatar;
