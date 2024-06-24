import { AppConfig } from 'config';
import { promises as fs } from 'fs';
import { diskStorage } from 'multer';
import { basename, extname } from 'path';

const prepareFilename = (file: Express.Multer.File) => {
  const fileExt = extname(file.originalname);
  let fileName =
    basename(file.originalname, fileExt) + '-' + Date.now() + fileExt;
  fileName = fileName
    .toLowerCase()
    .replace(/ {2,}/g, ' ')
    .trim()
    .split(' ')
    .join('-')
    .replace(/-{2,}/g, '-');

  return fileName;
};

const isExternal = (fileUrl: string) => {
  return Boolean(
    fileUrl.startsWith('http://') || fileUrl.startsWith('https://'),
  );
};

export const multerLocalStorage = (subDir: string) => {
  return diskStorage({
    destination: async (req, file, cb) => {
      const dir = `./public/uploads/${subDir}`;
      try {
        await fs.mkdir(dir, { recursive: true, mode: 0o755 });
        cb(null, dir);
      } catch (err) {
        cb(err, dir);
      }
    },
    filename: (req, file, cb) => {
      const fileName = prepareFilename(file);
      cb(null, fileName);
    },
  });
};

export const copyUploadedFile = async (
  file: Express.Multer.File,
  desDir: string,
) => {
  const uploadDir = `uploads/${desDir}`;
  const absUploadDir = `./public/${uploadDir}`;
  await fs.mkdir(absUploadDir, { recursive: true, mode: 0o755 });
  const fileName = prepareFilename(file);
  const uploadPath = `${uploadDir}/${fileName}`;
  const absUploadPath = `${absUploadDir}/${fileName}`;

  await fs.writeFile(absUploadPath, file.buffer);

  return uploadPath;
};

export const unlinkUploadedFile = async (filePath: string) => {
  if (filePath.startsWith('uploads/')) {
    filePath = `public/${filePath}`;
  }

  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.log({ error });
  }
};

export const getFileUrl = (filePath: string) => {
  if (filePath.startsWith('uploads/')) {
    const baseUrl = AppConfig.baseUrl;
    const fileUrl = baseUrl.length ? `${baseUrl}/${filePath}` : filePath;

    return fileUrl;
  }

  return filePath;
};
