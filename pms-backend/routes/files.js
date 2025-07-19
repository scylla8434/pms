const express = require('express');
const multer = require('multer');
const File = require('../models/File');
const auth = require('../middleware/auth');
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Upload file
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  const file = new File({
    name: req.file.originalname,
    path: req.file.path,
    uploadedBy: req.user.email
  });
  await file.save();
  res.json(file);
});

// List files
router.get('/', auth, async (req, res) => {
  const files = await File.find();
  res.json(files);
});

// Delete file
router.delete('/:id', auth, async (req, res) => {
  const file = await File.findByIdAndDelete(req.params.id);
  if (file) {
    const fs = require('fs');
    fs.unlink(path.join(__dirname, '..', file.path), () => {});
  }
  res.json({ message: 'File deleted' });
});

module.exports = router;
