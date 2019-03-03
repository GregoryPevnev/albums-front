import Bundle from "../bundle";
import { UploadObject } from "../../application/upload";

export const getURL = (uploadObject: File) => async (__: Function, _: any, { upload: { getURL } }: Bundle) =>
    getURL(uploadObject);

export const upload = (objs: UploadObject[]) => async (__: Function, _: any, { upload: { upload } }: Bundle) =>
    upload(objs);
