import { useState, useRef, useId } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { DocumentUpload } from "iconsax-react";

export default function ImageUpload() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const inputId = useId();

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
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
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDelete = () => {
    setUploadedImage(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = () => {
    fileInputRef.current?.click();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-h-[40vh] max-w-md mx-auto p-4 space-y-4">
      {!uploadedImage ? (
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
              اسحب الملف إلى هنا أو{" "}
              <span className="text-primary underline font-medium">
                اختر ملفاً
              </span>
            </p>
            <p className="text-sm text-muted-foreground/70">
              PNG, JPG, GIF up to 10MB
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={uploadedImage || "/placeholder.svg"}
                alt="Uploaded image"
                width={300}
                height={200}
                className="w-full h-38 object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleChange}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleDelete}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4 bg-muted">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Name:</span> {fileName}
              </p>
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
