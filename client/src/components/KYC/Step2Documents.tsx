import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import FileUpload from '@/components/UI/FileUpload';
import { DocumentUpload } from '@/types/kyc';
import { personalDocumentTypes } from '@/lib/mockData';
import { Trash2 } from 'lucide-react';

interface Step2DocumentsProps {
  documents: DocumentUpload[];
  onNext: (documents: DocumentUpload[]) => void;
  onPrevious: () => void;
}

const Step2Documents: React.FC<Step2DocumentsProps> = ({
  documents: initialDocuments,
  onNext,
  onPrevious
}) => {
  const [documents, setDocuments] = useState<DocumentUpload[]>(() => {
    // Initialize documents if not already done
    if (initialDocuments.length === 0) {
      return [];
    }
    return initialDocuments;
  });

  const [selectedDocType, setSelectedDocType] = useState<string>('');

  const handleDocumentSelect = (docType: string) => {
    setSelectedDocType(docType);
  };

  const handleFileUpload = (file: File | null) => {
    if (!selectedDocType || !file) return;

    const newDocument: DocumentUpload = {
      type: selectedDocType,
      file,
      uploaded: true,
      required: ['Aadhaar', 'PAN', 'Cancelled Cheque'].includes(selectedDocType)
    };

    setDocuments(prev => [...prev, newDocument]);
    setSelectedDocType(''); // Reset selection
  };

  const handleRemoveDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    // Validate required documents are uploaded
    const requiredDocTypes = ['Aadhaar', 'PAN', 'Cancelled Cheque'];
    const uploadedRequiredDocs = documents.filter(doc => 
      requiredDocTypes.includes(doc.type) && doc.uploaded
    );
    
    if (uploadedRequiredDocs.length < requiredDocTypes.length) {
      const missingDocs = requiredDocTypes.filter(type => 
        !documents.some(doc => doc.type === type && doc.uploaded)
      );
      alert(`Please upload all required documents: ${missingDocs.join(', ')}`);
      return;
    }
    
    onNext(documents);
  };

  // Get available document types (not yet uploaded)
  const availableDocTypes = personalDocumentTypes.filter(type => 
    !documents.some(doc => doc.type === type)
  );

  const uploadedCount = documents.filter(doc => doc.uploaded).length;
  const requiredDocTypes = ['Aadhaar', 'PAN', 'Cancelled Cheque'];
  const uploadedRequiredCount = documents.filter(doc => 
    requiredDocTypes.includes(doc.type) && doc.uploaded
  ).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Step 2: Personal Documents Upload
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Document Selection Dropdown */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Document Type
              </label>
              <Select value={selectedDocType} onValueChange={handleDocumentSelect}>
                <SelectTrigger data-testid="select-document-type">
                  <SelectValue placeholder="Choose a document to upload" />
                </SelectTrigger>
                <SelectContent>
                  {availableDocTypes.map((docType) => (
                    <SelectItem key={docType} value={docType}>
                      {docType}
                      {['Aadhaar', 'PAN', 'Cancelled Cheque'].includes(docType) && 
                        <Badge variant="secondary" className="ml-2">Required</Badge>
                      }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* File Upload for Selected Document */}
            {selectedDocType && (
              <FileUpload
                label={`Upload ${selectedDocType}`}
                required={['Aadhaar', 'PAN', 'Cancelled Cheque'].includes(selectedDocType)}
                file={null}
                onFileChange={handleFileUpload}
              />
            )}
          </div>

          {/* Uploaded Documents List */}
          {documents.length > 0 && (
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <h4 className="font-medium text-foreground mb-3">Uploaded Documents</h4>
                <div className="space-y-2">
                  {documents.map((document, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-foreground">{document.type}</span>
                        {document.required && (
                          <Badge variant="secondary">Required</Badge>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {document.file?.name}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDocument(index)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        data-testid={`remove-document-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upload Progress */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <h4 className="font-medium text-foreground mb-2">Upload Progress</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">
                    Required Documents ({uploadedRequiredCount}/3)
                  </span>
                  <span className="text-muted-foreground">
                    Total Uploaded: {uploadedCount}
                  </span>
                </div>
                <Progress 
                  value={(uploadedRequiredCount / 3) * 100} 
                  className="w-full" 
                  data-testid="upload-progress"
                />
                <div className="text-xs text-muted-foreground">
                  3 required documents, {personalDocumentTypes.length - 3} optional
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validation Messages */}
          {uploadedRequiredCount < 3 && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <h5 className="font-medium text-destructive mb-2">Missing Required Documents:</h5>
              <ul className="list-disc list-inside text-sm text-destructive">
                {['Aadhaar', 'PAN', 'Cancelled Cheque']
                  .filter(type => !documents.some(doc => doc.type === type && doc.uploaded))
                  .map(type => (
                    <li key={type}>{type}</li>
                  ))}
              </ul>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              data-testid="button-previous-step2"
            >
              Previous
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              data-testid="button-next-step2"
            >
              Next Step
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step2Documents;
