import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  label: string;
  required?: boolean;
  accept?: string;
  onFileChange: (file: File | null) => void;
  file?: File | null;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  required = false,
  accept = ".pdf,.jpg,.jpeg,.png",
  onFileChange,
  file,
  disabled = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (selectedFile: File | null) => {
    onFileChange(selectedFile);
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    handleFileSelect(selectedFile);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    
    if (!disabled && event.dataTransfer.files.length > 0) {
      const droppedFile = event.dataTransfer.files[0];
      handleFileSelect(droppedFile);
    }
  };

  const removeFile = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      
      <div
        className={cn(
          "file-upload-area p-4 rounded-lg text-center cursor-pointer transition-all duration-300",
          dragOver && "border-primary bg-muted",
          disabled && "opacity-50 cursor-not-allowed",
          file && "bg-muted border-primary"
        )}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        data-testid={`file-upload-${label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled}
        />
        
        {file ? (
          <div className="flex items-center justify-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-sm text-foreground font-medium truncate max-w-32">
              {file.name}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
              data-testid="remove-file"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <Upload className="h-8 w-8 text-muted-foreground mb-2 mx-auto" />
            <p className="text-sm text-muted-foreground">
              Click to upload {label.toLowerCase()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Drag and drop files here
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
