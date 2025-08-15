import { createClient } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { ProductImageUploader } from "../domain/product-images-uploader";

export class SupabaseProductUploader implements ProductImageUploader {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient();
  }
  async uploadImages(files: File[]): Promise<string[]> {
    const urls: string[] = [];
    const uploads = [];
    for (const file of files) {
      const path = `products/${file.name}`;
      const storage = this.supabase.storage.from("aegis");
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
}
