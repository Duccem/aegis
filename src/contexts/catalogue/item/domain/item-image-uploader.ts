export interface ItemImageUploader {
  uploadImages: (files: File[]) => Promise<string[]>;
  deleteImage: (imageUrl: string) => Promise<void>;
}
