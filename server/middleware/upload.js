import multer from 'multer';

function fileFilter(_req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
    return;
  }
  cb(new Error('Only image files are allowed'));
}

export const uploadImage = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('image');

function videoFilter(_req, file, cb) {
  if (file.mimetype.startsWith('video/')) {
    cb(null, true);
    return;
  }
  cb(new Error('Only video files are allowed'));
}

export const uploadVideo = multer({
  storage: multer.memoryStorage(),
  fileFilter: videoFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
}).single('video');