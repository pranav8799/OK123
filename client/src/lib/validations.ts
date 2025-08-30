import { z } from "zod";

export const personalDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  mobileNumber: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  aadhaarNumber: z.string().regex(/^\d{12}$/, "Aadhaar number must be 12 digits"),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    blockNumber: z.string().optional(),
    city: z.string().min(1, "City is required"),
    pinCode: z.string().regex(/^\d{6}$/, "Pin code must be 6 digits"),
    state: z.string().min(1, "State is required"),
  }),
  bankDetails: z.object({
    accountNumber: z.string().min(1, "Account number is required"),
    accountHolderName: z.string().min(1, "Account holder name is required"),
    ifscCode: z.string().min(1, "IFSC code is required"),
    bankName: z.string().min(1, "Bank name is required"),
  }),
  monthlyIncome: z.number().min(1, "Monthly income is required"),
});

export const shopInfoSchema = z.object({
  shopName: z.string().min(1, "Shop name is required"),
  numberOfEmployees: z.number().min(1, "Number of employees is required"),
  shopSize: z.number().min(1, "Shop size is required"),
  businessType: z.enum(['proprietorship', 'partnership', 'private-limited', 'huf']),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    pinCode: z.string().regex(/^\d{6}$/, "Pin code must be 6 digits"),
    state: z.string().min(1, "State is required"),
  }),
  bankDetails: z.object({
    accountNumber: z.string().min(1, "Account number is required"),
    accountHolderName: z.string().min(1, "Account holder name is required"),
    ifscCode: z.string().min(1, "IFSC code is required"),
    bankName: z.string().min(1, "Bank name is required"),
  }),
  monthlyIncome: z.number().min(1, "Monthly income is required"),
  yearlyIncome: z.number().min(1, "Yearly income is required"),
  businessPan: z.string().optional(),
});

export const declarationsSchema = z.object({
  accurateInfo: z.boolean().refine(val => val === true, "You must declare that all information is accurate"),
  termsAndConditions: z.boolean().refine(val => val === true, "You must agree to terms and conditions"),
  dataProcessing: z.boolean().refine(val => val === true, "You must consent to data processing"),
});

export type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
export type ShopInfoFormData = z.infer<typeof shopInfoSchema>;
export type DeclarationsFormData = z.infer<typeof declarationsSchema>;
