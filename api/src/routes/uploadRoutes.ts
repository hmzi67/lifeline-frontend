import { Router } from 'express';
import multer from 'multer';
import { mediaUpload, getMediaCategory } from '../middleware/upload.js';

const router = Router();

router.post('/', (req, res) => {
  mediaUpload.single('file')(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      const message = error.code === 'LIMIT_FILE_SIZE'
        ? 'File is too large. Maximum upload size is 200MB.'
        : error.message;

      res.status(400).json({ success: false, message });
      return;
    }

    if (error) {
      res.status(400).json({ success: false, message: error.message || 'Failed to upload file' });
      return;
    }

    if (!req.file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }

    const category = getMediaCategory(req.file.mimetype);
    const relativePath = `/uploads/${category}/${req.file.filename}`;
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    res.status(201).json({
      success: true,
      data: {
        url: `${baseUrl}${relativePath}`,
        path: relativePath,
        filename: req.file.filename,
        type: category,
        mimeType: req.file.mimetype,
        size: req.file.size,
      },
      message: 'File uploaded successfully',
    });
  });
});

export default router;
