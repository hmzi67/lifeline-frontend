import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import multer from 'multer';
import { config } from '../config/index.js';

export type MediaCategory = 'image' | 'audio' | 'video';

const IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
]);

const AUDIO_MIME_TYPES = new Set([
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/x-wav',
  'audio/ogg',
  'audio/webm',
  'audio/mp4',
  'audio/aac',
  'audio/flac',
  'audio/x-flac',
]);

const VIDEO_MIME_TYPES = new Set([
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-msvideo',
  'video/mpeg',
  'video/ogg',
]);

const MIME_EXTENSION_MAP: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
  'image/avif': '.avif',
  'audio/mpeg': '.mp3',
  'audio/mp3': '.mp3',
  'audio/wav': '.wav',
  'audio/x-wav': '.wav',
  'audio/ogg': '.ogg',
  'audio/webm': '.webm',
  'audio/mp4': '.m4a',
  'audio/aac': '.aac',
  'audio/flac': '.flac',
  'audio/x-flac': '.flac',
  'video/mp4': '.mp4',
  'video/webm': '.webm',
  'video/quicktime': '.mov',
  'video/x-msvideo': '.avi',
  'video/mpeg': '.mpeg',
  'video/ogg': '.ogv',
};

const uploadRootPath = path.resolve(process.cwd(), config.upload.path);

export const getUploadRootPath = (): string => uploadRootPath;

export const getMediaCategory = (mimeType: string): MediaCategory | null => {
  if (IMAGE_MIME_TYPES.has(mimeType)) return 'image';
  if (AUDIO_MIME_TYPES.has(mimeType)) return 'audio';
  if (VIDEO_MIME_TYPES.has(mimeType)) return 'video';
  return null;
};

const ensureDirectory = (directoryPath: string) => {
  fs.mkdirSync(directoryPath, { recursive: true });
};

ensureDirectory(uploadRootPath);

const storage = multer.diskStorage({
  destination: (_req, file, callback) => {
    const category = getMediaCategory(file.mimetype);
    if (!category) {
      callback(new Error('Unsupported file type'), '');
      return;
    }

    const targetDirectory = path.join(uploadRootPath, category);
    ensureDirectory(targetDirectory);
    callback(null, targetDirectory);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname) || MIME_EXTENSION_MAP[file.mimetype] || '';
    callback(null, `${Date.now()}-${randomUUID()}${extension.toLowerCase()}`);
  },
});

const fileFilter: multer.Options['fileFilter'] = (_req, file, callback) => {
  if (!getMediaCategory(file.mimetype)) {
    callback(new Error('Only image, audio, and video files are allowed'));
    return;
  }

  callback(null, true);
};

export const mediaUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 200 * 1024 * 1024,
    files: 1,
  },
});
