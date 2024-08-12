export const API_KEY: string = process.env.API_KEY as string;
export const USER_NAME: string = process.env.USER_NAME as string;
export const PASSWORD: string = process.env.PASSWORD as string;
export const SELF_ID: number = 183;

export const EXPECT = {
  IN_PROGRESS: "in progress",
  RGB_ERROR_BORDER: "rgb(211, 61, 68)",
  RGB_ERROR_TEXT: "rgb(177, 58, 65)"
}

export const SETUP = {
  SPACE: "SETUP_SPACE",
  LIST: "SETUP_LIST",
  FOLDER: "GUI TEST folder",
  RENAMED_FOLDER: "Renamed GUI TEST folder",
  SPACE_FOR_FOLDERS: "Space for Folder tests",
  NEW_SPACE: "GUI TEST new space",
  RENAMED_SPACE: "RENAMED GUI TEST new space",
  DUPLICATED_SPACE: "GUI TEST duplicated space"
}

export const OPTION = {
  DELETE: "Delete",
  RENAME: "Rename",
  ENTER: "Enter",
  DUPLICATE: "Duplicate",
  CREATE_NEW: "Create new",
  DOC: "Doc",
  FOLDER: "Folder"
}
