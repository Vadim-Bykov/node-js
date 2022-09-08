import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { v4 } from 'uuid';

type Fn = (file?: UploadedFile) => string | undefined;

export const saveFile: Fn = (file) => {
  if (!file) return;
  const filename = v4() + '.jpg';
  const filePath = path.resolve('static', filename);
  file.mv(filePath);

  return filename;
};
