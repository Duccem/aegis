"use client";

import { Primitives } from "@/contexts/shared/domain/primitives";
import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/contexts/shared/ui/components/shadcn/card";
import { useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Package,
  Plus,
  Share2,
  Trash,
  ZoomIn,
} from "lucide-react";
import { useRef, useState } from "react";
import { Item } from "../../../domain/item";
import { HttpItemApi } from "../../../infrastructure/http-item-api";
import { SupabaseItemImageUploader } from "../../../infrastructure/supabase-item-uploader";
import ImageView from "./image-view";

export default function ItemGallery({ item }: { item: Primitives<Item> }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const [deletingImage, setDeletingImage] = useState<boolean>(false);
  const [addingImage, setAddingImage] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const hasMultipleImages = item.images && item.images.length > 1;
  const currentImage = item.images?.[selectedImageIndex];

  const nextImage = () => {
    if (hasMultipleImages && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedImageIndex((prev) => (prev + 1) % item.images.length);
        setTimeout(() => setIsAnimating(false), 50);
      }, 150);
    }
  };

  const prevImage = () => {
    if (hasMultipleImages && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
        setTimeout(() => setIsAnimating(false), 50);
      }, 150);
    }
  };

  const selectImage = (index: number) => {
    if (index !== selectedImageIndex && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedImageIndex(index);
        setTimeout(() => setIsAnimating(false), 50);
      }, 150);
    }
  };

  const deleteImage = async (url: string) => {
    if (!url || deletingImage || isAnimating) return;
    setDeletingImage(true);
    const uploader = new SupabaseItemImageUploader();
    await uploader.deleteImage(url);
    await HttpItemApi.removeImage(item.id, url);
    setDeletingImage(false);
    setSelectedImageIndex((prev) => {
      const newImages = item.images.filter((image) => image !== url);
      if (newImages.length === 0) {
        return 0; // Reset to first image if all are deleted
      }
      return prev >= newImages.length ? newImages.length - 1 : prev;
    });
    queryClient.invalidateQueries({ queryKey: ["item", item.id] });
    queryClient.invalidateQueries({ queryKey: ["items"] });
  };

  const addImage = async (e: any) => {
    const file: File = e.target.files[0];
    if (!file) return;
    setAddingImage(true);
    const uploader = new SupabaseItemImageUploader();
    const [url] = await uploader.uploadImages([file]);
    await HttpItemApi.addImage(item.id, url);
    item.images.push(url);

    setSelectedImageIndex(item.images.length - 1); // Select the newly added image
    if (input.current) {
      input.current.value = ""; // Reset input value
    }
    setAddingImage(false);
    queryClient.invalidateQueries({ queryKey: ["item", item.id] });
    queryClient.invalidateQueries({ queryKey: ["items"] });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Product Gallery</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteImage(currentImage || "")}
                disabled={!currentImage || deletingImage || isAnimating}
              >
                {deletingImage ? (
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                ) : (
                  <Trash className="h-4 w-4 mr-2" />
                )}
                Delete
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsZoomed(!isZoomed)}>
                <ZoomIn className="h-4 w-4 mr-2" />
                {isZoomed ? "Zoom Out" : "Zoom In"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Main Image Display */}
          <div className="relative mb-6">
            <div
              className={`relative bg-muted rounded-lg overflow-hidden ${isZoomed ? "h-[600px]" : "h-[400px]"} transition-all duration-300`}
            >
              {currentImage ? (
                <div className="relative w-full h-full">
                  <ImageView image={currentImage} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-muted-foreground">
                    <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>No image available</p>
                  </div>
                </div>
              )}

              {/* Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background transition-all duration-200 hover:scale-110"
                    onClick={prevImage}
                    disabled={isAnimating}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background transition-all duration-200 hover:scale-110"
                    onClick={nextImage}
                    disabled={isAnimating}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Image Counter */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 right-4 bg-background/80 px-3 py-1 rounded-full text-sm transition-all duration-200">
                  {selectedImageIndex + 1} / {item.images.length}
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Navigation */}
          {hasMultipleImages && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">All Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    disabled={isAnimating}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                      selectedImageIndex === index
                        ? "border-primary ring-2 ring-primary/20 scale-105"
                        : "border-border hover:border-primary/50"
                    } ${isAnimating ? "pointer-events-none" : ""}`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${item.name} - Thumbnail ${index + 1}`}
                      className="object-cover transition-transform duration-200"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                    />
                    {selectedImageIndex === index && (
                      <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                    )}
                  </button>
                ))}
                <button
                  onClick={() => input.current?.click()}
                  disabled={isAnimating}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 cursor-pointer flex justify-center items-center`}
                >
                  {addingImage ? <Loader2 className="animate-spin" /> : <Plus className="" />}
                </button>
              </div>
            </div>
          )}
          {!hasMultipleImages && (
            <button
              onClick={() => input.current?.click()}
              disabled={isAnimating}
              className={`relative aspect-square h-22 w-22 rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 cursor-pointer flex justify-center items-center`}
            >
              {addingImage ? <Loader2 className="animate-spin" /> : <Plus className="" />}
            </button>
          )}
          <input ref={input} type="file" name="" id="" className="hidden" onChange={addImage} />

          {/* Image Information */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Total Images:</span>
                <span className="ml-2">{item.images?.length || 0}</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Current View:</span>
                <span className="ml-2">Image {selectedImageIndex + 1}</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Item:</span>
                <span className="ml-2">{item.name}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
