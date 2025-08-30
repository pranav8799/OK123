import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { declarationsSchema, DeclarationsFormData } from '@/lib/validations';
import { PersonalDetails, ShopInfo, DocumentUpload } from '@/types/kyc';
import { Eye, Send, CheckCircle } from 'lucide-react';

interface Step5FinalFormProps {
  personalDetails: PersonalDetails;
  shopInfo: ShopInfo;
  personalDocuments: DocumentUpload[];
  businessDocuments: DocumentUpload[];
  declarations: { accurateInfo: boolean; termsAndConditions: boolean; dataProcessing: boolean; };
  onSubmit: (declarations: DeclarationsFormData) => void;
  onPrevious: () => void;
  onViewApplication: () => void;
}

const Step5FinalForm: React.FC<Step5FinalFormProps> = ({
  personalDetails,
  shopInfo,
  personalDocuments,
  businessDocuments,
  declarations,
  onSubmit,
  onPrevious,
  onViewApplication
}) => {
  const form = useForm<DeclarationsFormData>({
    resolver: zodResolver(declarationsSchema),
    defaultValues: declarations,
  });

  const uploadedPersonalDocs = personalDocuments.filter(doc => doc.uploaded);
  const uploadedBusinessDocs = businessDocuments.filter(doc => doc.uploaded);

  const handleSubmit = (formData: DeclarationsFormData) => {
    onSubmit(formData);
  };

  const handleSubmitToLOS = () => {
    // Validate form first
    form.handleSubmit(handleSubmit)();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Step 5: Final Application Review
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Sections */}
          <div className="space-y-4">
            {/* Personal Details Summary */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-3">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>{' '}
                    <span className="text-foreground">
                      {personalDetails.firstName} {personalDetails.middleName} {personalDetails.lastName}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Mobile:</span>{' '}
                    <span className="text-foreground">+91 {personalDetails.mobileNumber}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>{' '}
                    <span className="text-foreground">{personalDetails.email}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Aadhaar:</span>{' '}
                    <span className="text-foreground">
                      XXXX XXXX {personalDetails.aadhaarNumber.slice(-4)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shop Information Summary */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-3">Shop Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Shop Name:</span>{' '}
                    <span className="text-foreground">{shopInfo.shopName}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Business Type:</span>{' '}
                    <span className="text-foreground capitalize">{shopInfo.businessType.replace('-', ' ')}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Employees:</span>{' '}
                    <span className="text-foreground">{shopInfo.numberOfEmployees}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Shop Size:</span>{' '}
                    <span className="text-foreground">{shopInfo.shopSize} sq.ft</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents Summary */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-3">Uploaded Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Personal Documents:</h4>
                    {uploadedPersonalDocs.map(doc => (
                      <div key={doc.type} className="flex items-center mb-1">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-foreground">{doc.type}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Business Documents:</h4>
                    {uploadedBusinessDocs.map(doc => (
                      <div key={doc.type} className="flex items-center mb-1">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-foreground">{doc.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Declarations */}
          <Card className="border border-border">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Declarations</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="accurateInfo"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-accurate-info"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-foreground">
                            I declare that all the information provided is true and accurate to the best of my knowledge.
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="termsAndConditions"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-terms-conditions"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-foreground">
                            I agree to the terms and conditions of the KYC verification process.
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dataProcessing"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-data-processing"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-foreground">
                            I consent to the processing of my personal data for verification purposes.
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onViewApplication}
              data-testid="button-view-application"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Application Form
            </Button>
            <Button
              type="button"
              className="flex-1"
              onClick={handleSubmitToLOS}
              data-testid="button-submit-to-los"
            >
              <Send className="mr-2 h-4 w-4" />
              Submit to LOS
            </Button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              data-testid="button-previous-step5"
            >
              Previous
            </Button>
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSubmitToLOS}
              data-testid="button-complete-application"
            >
              Complete Application
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step5FinalForm;
