import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatFileSize } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface UploadSectionProps {
  onFileUploaded: (file: File) => void;
  onContinue: () => void;
}

export default function UploadSection({ onFileUploaded, onContinue }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (uploadedFile: File) => {
    // Check file type
    const validTypes = ['.pdf', '.docx', '.doc', '.txt'];
    const fileExtension = `.${uploadedFile.name.split('.').pop()?.toLowerCase()}`;
    
    if (!validTypes.includes(fileExtension)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOCX, or TXT file.",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (5MB max)
    if (uploadedFile.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB.",
        variant: "destructive"
      });
      return;
    }
    
    setFile(uploadedFile);
    onFileUploaded(uploadedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Your Resume</CardTitle>
        <CardDescription>We'll analyze your resume against ATS systems used by employers</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`file-upload-area rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-all ${
            isDragging ? "active" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleSelectFile}
        >
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="font-medium text-lg">Drag & drop your resume here</h3>
            <p className="text-gray-500 text-sm mt-1 mb-4">Supports PDF, DOCX, or TXT</p>
            <Button onClick={(e) => { e.stopPropagation(); handleSelectFile(); }}>
              Select File
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.docx,.doc,.txt"
              onChange={handleFileInputChange}
            />
          </div>
        </div>

        {file && (
          <div className="mt-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 mr-4">
                <File className="w-8 h-8 text-gray-500" />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">{file.name}</h4>
                <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={handleRemoveFile}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button onClick={onContinue}>
                Continue
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
