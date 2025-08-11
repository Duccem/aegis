import { createClient } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

export class SupabaseUserStorage {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient();
  }

  async uploadAvatar(file: File, userId: string): Promise<string> {
    const storage = this.supabase.storage.from("aegis");
    const path = `avatars/${userId}/${file.name}`;
    await storage.upload(path, file);
    return storage.getPublicUrl(path).data.publicUrl;
  }
}
