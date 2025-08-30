import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { personalDetailsSchema, PersonalDetailsFormData } from '@/lib/validations';
import { states } from '@/lib/mockData';
import CameraCapture from '@/components/UI/CameraCapture';
import { PersonalDetails } from '@/types/kyc';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Step1PersonalDetailsProps {
  data: PersonalDetails;
  onNext: (data: PersonalDetails) => void;
  onPrevious?: () => void;
}

const Step1PersonalDetails: React.FC<Step1PersonalDetailsProps> = ({
  data,
  onNext,
  onPrevious
}) => {
  const form = useForm<PersonalDetailsFormData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      firstName: data.firstName || '',
      middleName: data.middleName || '',
      lastName: data.lastName || '',
      mobileNumber: data.mobileNumber || '',
      email: data.email || '',
      aadhaarNumber: data.aadhaarNumber || '',
      address: {
        street: data.address?.street || '',
        blockNumber: data.address?.blockNumber || '',
        city: data.address?.city || '',
        pinCode: data.address?.pinCode || '',
        state: data.address?.state || '',
      },
      bankDetails: {
        accountNumber: data.bankDetails?.accountNumber || '',
        accountHolderName: data.bankDetails?.accountHolderName || '',
        ifscCode: data.bankDetails?.ifscCode || '',
        bankName: data.bankDetails?.bankName || '',
      },
      monthlyIncome: data.monthlyIncome || 0,
    },
  });

  // OTP states
  const [showOtp, setShowOtp] = useState<{ mobile: boolean; email: boolean; aadhaar: boolean }>({
    mobile: false,
    email: false,
    aadhaar: false,
  });
  const [otp, setOtp] = useState<{ mobile: string; email: string; aadhaar: string }>({
    mobile: '',
    email: '',
    aadhaar: '',
  });
  const [verified, setVerified] = useState<{ mobile: boolean; email: boolean; aadhaar: boolean }>({
    mobile: false,
    email: false,
    aadhaar: false,
  });

  const allVerified = verified.mobile && verified.email && verified.aadhaar;

  const onSubmit = (formData: PersonalDetailsFormData) => {
    if (!allVerified) {
      alert('Please verify Mobile, Email, and Aadhaar before continuing.');
      return;
    }
    const personalDetails: PersonalDetails = {
      ...formData,
      selfieFile: data.selfieFile,
    };
    onNext(personalDetails);
  };

  const handleSelfieCapture = (file: File) => {
    data.selfieFile = file;
  };

  const sendOTP = (type: 'mobile' | 'email' | 'aadhaar') => {
    setShowOtp({ ...showOtp, [type]: true });
    console.log(`Mock OTP sent for ${type}. Use 123456 to verify.`);
  };

  const verifyOTP = (type: 'mobile' | 'email' | 'aadhaar') => {
    if (otp[type] === '123456') {
      setVerified({ ...verified, [type]: true });
      alert(`${type} verified successfully!`);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Step 1: Personal Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField name="firstName" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
                  <FormControl><Input {...field} placeholder="Enter first name" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="middleName" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl><Input {...field} placeholder="Enter middle name" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="lastName" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name *</FormLabel>
                  <FormControl><Input {...field} placeholder="Enter last name" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Mobile with OTP */}
            <FormField name="mobileNumber" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number *</FormLabel>
                <div className="flex">
                  <FormControl>
                    <Input {...field} placeholder="10-digit mobile" maxLength={10} className="rounded-r-none" />
                  </FormControl>
                  <Button type="button" onClick={() => sendOTP('mobile')} disabled={verified.mobile} className="rounded-l-none">
                    {verified.mobile ? 'Verified' : 'Send OTP'}
                  </Button>
                </div>
                {showOtp.mobile && !verified.mobile && (
                  <div className="flex mt-2">
                    <Input placeholder="Enter OTP" value={otp.mobile} onChange={(e) => setOtp({ ...otp, mobile: e.target.value })} className="rounded-r-none" />
                    <Button type="button" onClick={() => verifyOTP('mobile')} className="rounded-l-none">Verify OTP</Button>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )} />

            {/* Email with OTP */}
            <FormField name="email" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <div className="flex">
                  <FormControl>
                    <Input type="email" {...field} placeholder="Enter email" className="rounded-r-none" />
                  </FormControl>
                  <Button type="button" onClick={() => sendOTP('email')} disabled={verified.email} className="rounded-l-none">
                    {verified.email ? 'Verified' : 'Send OTP'}
                  </Button>
                </div>
                {showOtp.email && !verified.email && (
                  <div className="flex mt-2">
                    <Input placeholder="Enter OTP" value={otp.email} onChange={(e) => setOtp({ ...otp, email: e.target.value })} className="rounded-r-none" />
                    <Button type="button" onClick={() => verifyOTP('email')} className="rounded-l-none">Verify OTP</Button>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )} />

            {/* Aadhaar with OTP */}
            <FormField name="aadhaarNumber" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Aadhaar Number *</FormLabel>
                <div className="flex">
                  <FormControl>
                    <Input {...field} placeholder="12-digit Aadhaar" maxLength={12} className="rounded-r-none" />
                  </FormControl>
                  <Button type="button" onClick={() => sendOTP('aadhaar')} disabled={verified.aadhaar} className="rounded-l-none">
                    {verified.aadhaar ? 'Verified' : 'Send OTP'}
                  </Button>
                </div>
                {showOtp.aadhaar && !verified.aadhaar && (
                  <div className="flex mt-2">
                    <Input placeholder="Enter OTP" value={otp.aadhaar} onChange={(e) => setOtp({ ...otp, aadhaar: e.target.value })} className="rounded-r-none" />
                    <Button type="button" onClick={() => verifyOTP('aadhaar')} className="rounded-l-none">Verify OTP</Button>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )} />

            {/* Address */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="address.street" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address *</FormLabel>
                    <FormControl><Input {...field} placeholder="Street" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="address.blockNumber" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Block Number</FormLabel>
                    <FormControl><Input {...field} placeholder="Block" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="address.city" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>City *</FormLabel>
                    <FormControl><Input {...field} placeholder="City" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="address.pinCode" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pin Code *</FormLabel>
                    <FormControl><Input {...field} placeholder="Pin Code" maxLength={6} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="md:col-span-2">
                  <FormField name="address.state" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>State *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {states.map((s) => (
                            <SelectItem key={s} value={s.toLowerCase().replace(/\s+/g, '-')}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>
            </div>

            {/* Selfie */}
            <CameraCapture onCapture={handleSelfieCapture} capturedImage={data.selfieFile} />

            {/* Bank Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Bank Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="bankDetails.accountNumber" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number *</FormLabel>
                    <FormControl><Input {...field} placeholder="Account Number" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="bankDetails.accountHolderName" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Holder Name *</FormLabel>
                    <FormControl><Input {...field} placeholder="Holder Name" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="bankDetails.ifscCode" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>IFSC Code *</FormLabel>
                    <FormControl><Input {...field} placeholder="IFSC" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="bankDetails.bankName" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name *</FormLabel>
                    <FormControl><Input {...field} placeholder="Bank Name" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            {/* Monthly Income */}
            <FormField name="monthlyIncome" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Average Monthly Income *</FormLabel>
                <FormControl>
                  <Input type="number" {...field} placeholder="Monthly Income" onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" disabled className="cursor-not-allowed">Previous</Button>
              <Button type="submit" disabled={!allVerified}>Next Step</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Step1PersonalDetails;
