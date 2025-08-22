"use client";

import { CircleUserRoundIcon, XIcon } from "lucide-react";

import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import { useFileUpload } from "@/contexts/shared/ui/hooks/use-file-upload";
import { useEffect } from "react";

function InputAvatar({
  onChange,
  value = null,
  onSelectFile,
}: {
  onChange?: (value: string) => void;
  onSelectFile?: (file: File) => void;
  value?: string | null;
}) {
  const [
    { files, isDragging },
    {
      removeFile,
      openFileDialog,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
    },
  ] = useFileUpload({
    accept: "image/*",
    initialFiles: [
      {
        url: value || "",
        name: "initial-avatar",
        id: "initial-avatar",
        size: 0,
        type: "image/jpeg",
      },
    ],
  });

  const previewUrl = files[0]?.preview || null;

  useEffect(() => {
    if (files.length > 0) {
      const file = files[0].file;

      if (file instanceof File) {
        onChange?.(URL.createObjectURL(file));
        onSelectFile?.(file);
      } else {
        onChange?.(file.url);
      }
    }
  }, [files]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex">
        {/* Drop area */}
        <button
          className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 relative flex size-16 items-center justify-center overflow-hidden rounded-full border border-dashed transition-colors outline-none focus-visible:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          aria-label={previewUrl ? "Change image" : "Upload image"}
        >
          {previewUrl ? (
            <img
              className="size-full object-cover"
              src={previewUrl}
              alt={files[0]?.file?.name || "Uploaded image"}
              width={64}
              height={64}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="size-4 opacity-60" />
            </div>
          )}
        </button>
        {previewUrl && (
          <Button
            onClick={() => removeFile(files[0]?.id)}
            size="icon"
            className="border-background focus-visible:border-background absolute -top-1 -right-1 size-6 rounded-full border-2 shadow-none"
            aria-label="Remove image"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
          tabIndex={-1}
        />
      </div>
    </div>
  );
}

export { InputAvatar };
