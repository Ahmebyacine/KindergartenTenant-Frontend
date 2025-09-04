import { useId, useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { DocumentUpload } from "iconsax-react";
import { t } from "i18next";

export default function ImageUpload({ value, onChange }) {
  const [preview, setPreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const inputId = useId();

  useEffect(() => {
    if (value instanceof File) {
      setPreview(URL.createObjectURL(value));
    } else if (typeof value === "string" && value) {
      setPreview(`${import.meta.env.VITE_API_URL_PICTURE}${value}`);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      onChange?.(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDelete = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onChange?.(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-h-[40vh] md:w-md mx-auto p-4 space-y-4 overflow-hidden">
      {!preview ? (
        <Card
          className={`border-2 border-dashed transition-colors cursor-pointer ${
            isDragOver
              ? "border-primary bg-primary-foreground/40"
              : "border-border hover:border-primary"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <CardContent className="flex flex-col items-center justify-center py-8 px-4">
            <div className="mb-4">
              <DocumentUpload size={50} color="var(--primary)" />
            </div>
            <p className="text-center text-muted-foreground mb-2">
              {t("imageUpload.drag")}
              <span className="text-primary underline font-medium">
                {t("imageUpload.choose")}
              </span>
            </p>
            <p className="text-sm text-muted-foreground/70">
              PNG, JPG, GIF up to 10MB
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden p-0 m-0">
          <CardContent className="px-0 pt-2">
            <div className="relative px-auto">
              <div className="w-full flex justify-center items-center h-45">
                <img
                  src={preview}
                  alt="Uploaded image"
                  className="h-45 w-45 object-cover"
                />
              </div>
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={triggerFileInput}
                  type="button"
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  type="button"
                  onClick={handleDelete}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <input
        id={inputId}
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}
