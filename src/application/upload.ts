export interface URLResult {
    url: string;
    object: string;
}

export interface UploadObject {
    url: string;
    object: File | null;
}

export const getUploadObject = (): UploadObject => ({ url: "", object: null });

export interface GetURL {
    (file: File): Promise<URLResult>;
}

// Upload in Parallel / Asynchronously
export interface Upload {
    (item: UploadObject[]): Promise<any>;
}
