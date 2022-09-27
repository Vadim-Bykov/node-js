import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { v4 } from 'uuid';
enum Folders {
  users = 'users',
  actors = 'actors',
  posters = 'posters',
}

type Fn = (
  file?: UploadedFile,
  folderName?: keyof typeof Folders
) => string | undefined;

export const saveFile: Fn = (file, folderName) => {
  if (!file) return;
  const filename = v4() + '.jpg';
  const filePath = path.resolve(`static/${folderName}`, filename);
  file.mv(filePath);

  return filename;
};
