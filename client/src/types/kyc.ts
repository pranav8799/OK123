export interface PersonalDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  aadhaarNumber: string;
  address: {
    street: string;
    blockNumber?: string;
    city: string;
    pinCode: string;
    state: string;
  };
  bankDetails: {
    accountNumber: string;
    accountHolderName: string;
    ifscCode: string;
    bankName: string;
  };
  monthlyIncome: number;
  selfieFile?: File;
}

export interface ShopInfo {
  shopName: string;
  numberOfEmployees: number;
  shopSize: number;
  businessType: 'proprietorship' | 'partnership' | 'private-limited' | 'huf';
  address: {
    street: string;
    city: string;
    pinCode: string;
    state: string;
  };
  bankDetails: {
    accountNumber: string;
    accountHolderName: string;
    ifscCode: string;
    bankName: string;
  };
  monthlyIncome: number;
  yearlyIncome: number;
  businessPan?: string;
}

export interface DocumentUpload {
  type: string;
  file: File | null;
  uploaded: boolean;
  required: boolean;
}

export interface KYCApplication {
  id: string;
  personalDetails: PersonalDetails;
  documents: DocumentUpload[];
  shopInfo: ShopInfo;
  businessDocuments: DocumentUpload[];
  currentStep: number;
  status: 'draft' | 'submitted' | 'in-process' | 'approved' | 'rejected';
  submittedAt?: Date;
  declarations: {
    accurateInfo: boolean;
    termsAndConditions: boolean;
    dataProcessing: boolean;
  };
}

export interface DashboardStats {
  totalApplications: number;
  approved: number;
  rejected: number;
  inProcess: number;
  pending: number;
  approvalRate: number;
  rejectionRate: number;
  processingRate: number;
  pendingRate: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label?: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    fill?: boolean;
  }[];
}
