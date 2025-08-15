export interface ProductImageUploader {
  uploadImages: (files: File[]) => Promise<string[]>;
}
