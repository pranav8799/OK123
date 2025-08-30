import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import FileUpload from '@/components/UI/FileUpload';
import { DocumentUpload, ShopInfo } from '@/types/kyc';
import { businessDocumentTypes } from '@/lib/mockData';
import { Trash2 } from 'lucide-react';

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
  const [selectedDocType, setSelectedDocType] = useState<string>('');

  useEffect(() => {
    // Filter existing documents to only include ones relevant to current business type
    const requiredDocTypes = businessDocumentTypes[shopInfo.businessType] || [];
    const relevantDocuments = initialDocuments.filter(doc => 
      requiredDocTypes.includes(doc.type)
    );
    setDocuments(relevantDocuments);
  }, [shopInfo.businessType, initialDocuments]);

  const handleDocumentSelect = (docType: string) => {
    setSelectedDocType(docType);
  };

  const handleFileUpload = (file: File | null) => {
    if (!selectedDocType || !file) return;

    const newDocument: DocumentUpload = {
      type: selectedDocType,
      file,
      uploaded: true,
      required: true // All business documents are required
    };

    setDocuments(prev => [...prev, newDocument]);
    setSelectedDocType(''); // Reset selection
  };

  const handleRemoveDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    const requiredDocTypes = businessDocumentTypes[shopInfo.businessType] || [];
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

  // Get available document types for current business type (not yet uploaded)
  const requiredDocTypes = businessDocumentTypes[shopInfo.businessType] || [];
  const availableDocTypes = requiredDocTypes.filter(type => 
    !documents.some(doc => doc.type === type)
  );

  const uploadedCount = documents.filter(doc => doc.uploaded).length;
  const totalCount = requiredDocTypes.length;
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

          {/* Document Selection Dropdown */}
          {requiredDocTypes.length > 0 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Document Type
                </label>
                <Select value={selectedDocType} onValueChange={handleDocumentSelect}>
                  <SelectTrigger data-testid="select-business-document-type">
                    <SelectValue placeholder="Choose a document to upload" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDocTypes.map((docType) => (
                      <SelectItem key={docType} value={docType}>
                        {docType}
                        <Badge variant="secondary" className="ml-2">Required</Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* File Upload for Selected Document */}
              {selectedDocType && (
                <FileUpload
                  label={`Upload ${selectedDocType}`}
                  required={true}
                  file={null}
                  onFileChange={handleFileUpload}
                />
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Please select a business type in the previous step to see required documents.</p>
            </div>
          )}

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
                        <Badge variant="secondary">Required</Badge>
                        <span className="text-sm text-muted-foreground">
                          {document.file?.name}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDocument(index)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        data-testid={`remove-business-document-${index}`}
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
          {requiredDocTypes.length > 0 && (
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
                  <div className="text-xs text-muted-foreground">
                    All documents are required for {businessTypeDisplayName}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Validation Messages */}
          {uploadedCount < totalCount && totalCount > 0 && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <h5 className="font-medium text-destructive mb-2">Missing Required Documents:</h5>
              <ul className="list-disc list-inside text-sm text-destructive">
                {requiredDocTypes
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
              data-testid="button-previous-step4"
            >
              Previous
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              disabled={totalCount === 0}
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
