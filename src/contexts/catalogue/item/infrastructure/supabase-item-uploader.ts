import { createClient } from "@/contexts/shared/infrastructure/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { ItemImageUploader } from "../domain/item-image-uploader";

export class SupabaseItemImageUploader implements ItemImageUploader {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient();
  }
  async uploadImages(files: File[]): Promise<string[]> {
    const urls: string[] = [];
    const uploads = [];
    for (const file of files) {
      const path = `items/${file.name}`;
      const storage = this.supabase.storage.from("products");
      uploads.push(storage.upload(path, file));
    }
    const results = await Promise.all(uploads);
    for (const result of results) {
      if (result.error) {
        throw new Error(`Failed to upload file: ${result.error.message}`);
      }
      const publicUrl = this.supabase.storage.from("aegis").getPublicUrl(result.data.path);
      urls.push(publicUrl.data.publicUrl);
    }
    return urls;
  }

  async deleteImage(imageUrl: string): Promise<void> {
    const path = imageUrl.split("/").pop();
    if (!path) {
      throw new Error("Invalid image URL");
    }
    const storage = this.supabase.storage.from("aegis");
    const { error } = await storage.remove([`products/${path}`]);
    if (error) {
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  }
}
