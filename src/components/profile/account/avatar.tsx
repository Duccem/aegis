import { useSession } from "@/components/auth/session-provider";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { InputAvatar } from "@/components/ui/input-avatar";
import { authClient } from "@/lib/auth/client";
import { SupabaseUserStorage } from "@/lib/core/user/infrastructure/supabase-user-storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  image: z.string().min(1, "Name is required"),
});
type FormSchema = z.infer<typeof formSchema>;
const ProfileAvatar = ({ image }: FormSchema) => {
  const { user } = useSession();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image,
    },
  });
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormSchema) => {
      if (avatarFile) {
        const storage = new SupabaseUserStorage();
        const imageUrl = await storage.uploadAvatar(avatarFile, user.id);
        if (imageUrl) {
          await authClient.updateUser({
            image: imageUrl,
          });
        }
      }
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["profile-account"] });
    },
    onError: (error) => {
      console.error("Error updating name:", error);
    },
  });

  return (
    <Card className="rounded-none bg-transparent">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(
            (data) => mutate(data),
            (error) => console.error(error)
          )}
        >
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <div>
              <CardTitle>Avatar</CardTitle>
              <p className="text-muted-foreground text-xs mt-3">
                This is your avatar. Click the avatar to upload a photo from your files.
              </p>
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <InputAvatar
                      onChange={(url) => {
                        field.onChange(url);
                      }}
                      value={field.value || ""}
                      onSelectFile={(file: File) => setAvatarFile(file)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardHeader>

          <CardFooter className="border-t pt-4 flex justify-between items-start gap-2 md:items-center flex-col md:flex-row">
            <p className="text-muted-foreground text-xs">
              An avatar is optional but highly recommended.
            </p>
            <Button disabled={isPending} type="submit" className="rounded-none">
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ProfileAvatar;
