export interface ProductImageUploader {
  uploadImages: (files: File[]) => Promise<string[]>;
  deleteImage: (imageUrl: string) => Promise<void>;
}
