import { DashboardStats, ChartData } from "@/types/kyc";

export const dashboardStats: DashboardStats = {
  totalApplications: 1247,
  approved: 892,
  rejected: 156,
  inProcess: 143,
  pending: 56,
  approvalRate: 71.5,
  rejectionRate: 12.5,
  processingRate: 11.5,
  pendingRate: 4.5,
};

export const statusDistributionData: ChartData = {
  labels: ['Approved', 'Rejected', 'In Process', 'Pending'],
  datasets: [{
    data: [892, 156, 143, 56],
    backgroundColor: [
      'hsl(163, 91%, 27%)',
      'hsl(0, 84%, 60%)',
      'hsl(45, 93%, 47%)',
      'hsl(210, 100%, 60%)'
    ]
  }]
};

export const monthlyTrendsData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Applications',
    data: [65, 78, 90, 81, 56, 89],
    backgroundColor: 'hsl(163, 91%, 27%)',
    borderColor: 'hsl(163, 91%, 27%)',
  }]
};

export const reportsStatusData: ChartData = {
  labels: ['Submitted to LOS', 'In Process', 'Rejected', 'Not Submitted'],
  datasets: [{
    data: [625, 267, 189, 166],
    backgroundColor: [
      'hsl(210, 100%, 60%)',
      'hsl(45, 93%, 47%)',
      'hsl(0, 84%, 60%)',
      'hsl(215, 16%, 47%)'
    ]
  }]
};

export const reportsTrendData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Submitted',
    data: [120, 135, 145, 160, 155, 170],
    borderColor: 'hsl(210, 100%, 60%)',
    backgroundColor: 'hsla(210, 100%, 60%, 0.1)',
    fill: true
  }, {
    label: 'Approved',
    data: [85, 95, 110, 120, 115, 125],
    borderColor: 'hsl(163, 91%, 27%)',
    backgroundColor: 'hsla(163, 91%, 27%, 0.1)',
    fill: true
  }]
};

export const businessDocumentTypes = {
  proprietorship: ['PAN', 'Udyam', 'ITR', 'GST', 'Utility Bills', 'Property Tax', 'Shop License', 'Shop Ownership', 'Passport Photo'],
  partnership: ['Partnership Deed', 'Passport Photo', 'PAN (Firm)', 'GST', 'ITR', 'Utility Bills', 'Shop License', 'Shop Ownership'],
  'private-limited': ['MOA', 'AOA', 'GST', 'Passport Photo', 'PAN', 'ITR', 'Utility Bills', 'Shop License', 'Shop Ownership', 'Incorporation Certificate'],
  huf: ['PAN-HUF', 'HUF Declaration', 'Karta ID Proof', 'Karta Address Proof', 'HUF Address Proof', 'Bank Proof', 'Karta Photo']
};

export const personalDocumentTypes = ['Aadhaar', 'PAN', 'Cancelled Cheque', 'ITR', 'House Documents', 'Reference Documents'];

export const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const sampleApplications = [
  {
    id: 'APP-001',
    applicantName: 'John Doe',
    shopName: 'ABC Electronics',
    status: 'submitted',
    submittedDate: '2024-01-15'
  },
  {
    id: 'APP-002',
    applicantName: 'Jane Smith',
    shopName: 'XYZ Traders',
    status: 'in-process',
    submittedDate: '2024-01-14'
  },
  {
    id: 'APP-003',
    applicantName: 'Robert Johnson',
    shopName: 'Tech Solutions',
    status: 'rejected',
    submittedDate: '2024-01-13'
  }
];
