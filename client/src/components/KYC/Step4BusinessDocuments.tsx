import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import FileUpload from '@/components/UI/FileUpload';
import { DocumentUpload, ShopInfo } from '@/types/kyc';
import { businessDocumentTypes } from '@/lib/mockData';

interface Step4BusinessDocumentsProps {
  shopInfo: ShopInfo;
  documents: DocumentUpload[];
  onNext: (documents: DocumentUpload[]) => void;
  onPrevious: () => void;
}

const Step4BusinessDocuments: React.FC<Step4BusinessDocumentsProps> = ({
  shopInfo,
  documents: initialDocuments,
  onNext,
  onPrevious
}) => {
  const [documents, setDocuments] = useState<DocumentUpload[]>([]);

  useEffect(() => {
    // Get document types based on business type
    const requiredDocTypes = businessDocumentTypes[shopInfo.businessType] || [];
    
    // Initialize documents if not already done or if business type changed
    if (initialDocuments.length === 0 || 
        !initialDocuments.every(doc => requiredDocTypes.includes(doc.type))) {
      const newDocuments = requiredDocTypes.map(type => {
        // Keep existing document if it exists
        const existingDoc = initialDocuments.find(doc => doc.type === type);
        return existingDoc || {
          type,
          file: null,
          uploaded: false,
          required: true // All business documents are required
        };
      });
      setDocuments(newDocuments);
    } else {
      setDocuments(initialDocuments);
    }
  }, [shopInfo.businessType, initialDocuments]);

  const handleFileChange = (index: number, file: File | null) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index] = {
      ...updatedDocuments[index],
      file,
      uploaded: !!file
    };
    setDocuments(updatedDocuments);
  };

  const handleNext = () => {
    // Validate all required documents are uploaded
    const missingDocuments = documents.filter(doc => doc.required && !doc.uploaded);
    
    if (missingDocuments.length > 0) {
      alert('Please upload all required business documents before proceeding.');
      return;
    }
    
    onNext(documents);
  };

  const uploadedCount = documents.filter(doc => doc.uploaded).length;
  const totalCount = documents.length;
  const progressPercentage = totalCount > 0 ? (uploadedCount / totalCount) * 100 : 0;

  const businessTypeDisplayName = {
    'proprietorship': 'Proprietorship',
    'partnership': 'Partnership',
    'private-limited': 'Private Limited',
    'huf': 'HUF'
  }[shopInfo.businessType] || shopInfo.businessType;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Step 4: Business Documents Upload
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Business Type Info */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Selected Business Type: <span className="font-medium text-foreground">{businessTypeDisplayName}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Upload the required documents based on your business type
              </p>
            </CardContent>
          </Card>

          {/* Document Upload Grid */}
          {documents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((document, index) => (
                <FileUpload
                  key={document.type}
                  label={document.type}
                  required={document.required}
                  file={document.file}
                  onFileChange={(file) => handleFileChange(index, file)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Please select a business type in the previous step to see required documents.</p>
            </div>
          )}

          {/* Upload Progress */}
          {documents.length > 0 && (
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <h4 className="font-medium text-foreground mb-2">Upload Progress</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">
                      Required Documents ({uploadedCount}/{totalCount})
                    </span>
                    <span className="text-muted-foreground">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                  <Progress 
                    value={progressPercentage} 
                    className="w-full" 
                    data-testid="business-upload-progress"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Validation Messages */}
          {documents.filter(doc => doc.required && !doc.uploaded).length > 0 && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <h5 className="font-medium text-destructive mb-2">Missing Required Documents:</h5>
              <ul className="list-disc list-inside text-sm text-destructive">
                {documents
                  .filter(doc => doc.required && !doc.uploaded)
                  .map(doc => (
                    <li key={doc.type}>{doc.type}</li>
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
              data-testid="button-previous-step4"
            >
              Previous
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              disabled={documents.length === 0}
              data-testid="button-next-step4"
            >
              Next Step
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step4BusinessDocuments;
