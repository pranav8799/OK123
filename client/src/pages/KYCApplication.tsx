import React, { useState } from 'react';
import StepIndicator from '@/components/KYC/StepIndicator';
import Step1PersonalDetails from '@/components/KYC/Step1PersonalDetails';
import Step2Documents from '@/components/KYC/Step2Documents';
import Step3ShopInfo from '@/components/KYC/Step3ShopInfo';
import Step4BusinessDocuments from '@/components/KYC/Step4BusinessDocuments';
import Step5FinalForm from '@/components/KYC/Step5FinalForm';
import { useToast } from '@/hooks/use-toast';
import { PersonalDetails, ShopInfo, DocumentUpload } from '@/types/kyc';
import { DeclarationsFormData } from '@/lib/validations';

const KYCApplication: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    aadhaarNumber: '',
    address: {
      street: '',
      city: '',
      pinCode: '',
      state: '',
    },
    bankDetails: {
      accountNumber: '',
      accountHolderName: '',
      ifscCode: '',
      bankName: '',
    },
    monthlyIncome: 0,
  });

  const [personalDocuments, setPersonalDocuments] = useState<DocumentUpload[]>([]);

  const [shopInfo, setShopInfo] = useState<ShopInfo>({
    shopName: '',
    numberOfEmployees: 0,
    shopSize: 0,
    businessType: 'proprietorship',
    address: {
      street: '',
      city: '',
      pinCode: '',
      state: '',
    },
    bankDetails: {
      accountNumber: '',
      accountHolderName: '',
      ifscCode: '',
      bankName: '',
    },
    monthlyIncome: 0,
    yearlyIncome: 0,
  });

  const [businessDocuments, setBusinessDocuments] = useState<DocumentUpload[]>([]);

  const [declarations, setDeclarations] = useState({
    accurateInfo: false,
    termsAndConditions: false,
    dataProcessing: false,
  });

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStep1Complete = (data: PersonalDetails) => {
    setPersonalDetails(data);
    nextStep();
    toast({
      title: "Personal details saved",
      description: "Moving to document upload step.",
    });
  };

  const handleStep2Complete = (documents: DocumentUpload[]) => {
    setPersonalDocuments(documents);
    nextStep();
    toast({
      title: "Documents uploaded",
      description: "Moving to shop information step.",
    });
  };

  const handleStep3Complete = (data: ShopInfo) => {
    setShopInfo(data);
    nextStep();
    toast({
      title: "Shop information saved",
      description: "Moving to business documents step.",
    });
  };

  const handleStep4Complete = (documents: DocumentUpload[]) => {
    setBusinessDocuments(documents);
    nextStep();
    toast({
      title: "Business documents uploaded",
      description: "Moving to final review step.",
    });
  };

  const handleFinalSubmit = (declarationsData: DeclarationsFormData) => {
    setDeclarations(declarationsData);
    
    // Mock application submission
    console.log('Submitting KYC Application:', {
      personalDetails,
      personalDocuments,
      shopInfo,
      businessDocuments,
      declarations: declarationsData,
    });

    toast({
      title: "Application submitted successfully!",
      description: "Your KYC application has been submitted to LOS for review.",
    });

    // Reset form or redirect to success page
    // For now, we'll just show success message
  };

  const handleViewApplication = () => {
    // Mock view application functionality
    console.log('Viewing application summary');
    toast({
      title: "Application summary",
      description: "Displaying application details.",
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1PersonalDetails
            data={personalDetails}
            onNext={handleStep1Complete}
          />
        );
      case 2:
        return (
          <Step2Documents
            documents={personalDocuments}
            onNext={handleStep2Complete}
            onPrevious={previousStep}
          />
        );
      case 3:
        return (
          <Step3ShopInfo
            data={shopInfo}
            onNext={handleStep3Complete}
            onPrevious={previousStep}
          />
        );
      case 4:
        return (
          <Step4BusinessDocuments
            shopInfo={shopInfo}
            documents={businessDocuments}
            onNext={handleStep4Complete}
            onPrevious={previousStep}
          />
        );
      case 5:
        return (
          <Step5FinalForm
            personalDetails={personalDetails}
            shopInfo={shopInfo}
            personalDocuments={personalDocuments}
            businessDocuments={businessDocuments}
            declarations={declarations}
            onSubmit={handleFinalSubmit}
            onPrevious={previousStep}
            onViewApplication={handleViewApplication}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2" data-testid="kyc-title">
          KYC Application
        </h1>
        <p className="text-muted-foreground" data-testid="kyc-subtitle">
          Complete your KYC verification process
        </p>
      </div>

      <StepIndicator currentStep={currentStep} totalSteps={5} />

      <div className="max-w-4xl mx-auto">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default KYCApplication;
