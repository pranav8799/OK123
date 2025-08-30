import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { personalDetailsSchema, PersonalDetailsFormData } from '@/lib/validations';
import { states } from '@/lib/mockData';
import CameraCapture from '@/components/UI/CameraCapture';
import { PersonalDetails } from '@/types/kyc';

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

  const onSubmit = (formData: PersonalDetailsFormData) => {
    const personalDetails: PersonalDetails = {
      ...formData,
      selfieFile: data.selfieFile,
    };
    onNext(personalDetails);
  };

  const handleSelfieCapture = (file: File) => {
    // Update the data immediately when selfie is captured
    data.selfieFile = file;
  };

  const sendOTP = (type: 'mobile' | 'email' | 'aadhaar') => {
    // Mock OTP sending functionality
    console.log(`Sending OTP for ${type}`);
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
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter first name" 
                        {...field} 
                        data-testid="input-first-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter middle name" 
                        {...field} 
                        data-testid="input-middle-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter last name" 
                        {...field} 
                        data-testid="input-last-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number *</FormLabel>
                    <div className="flex">
                      <FormControl>
                        <Input 
                          placeholder="10-digit mobile number" 
                          maxLength={10}
                          {...field} 
                          className="rounded-r-none"
                          data-testid="input-mobile-number"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        onClick={() => sendOTP('mobile')}
                        className="rounded-l-none"
                        data-testid="button-send-mobile-otp"
                      >
                        Send OTP
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <div className="flex">
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="Enter email address" 
                          {...field} 
                          className="rounded-r-none"
                          data-testid="input-email"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        onClick={() => sendOTP('email')}
                        className="rounded-l-none"
                        data-testid="button-send-email-otp"
                      >
                        Send OTP
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Aadhaar Number */}
            <FormField
              control={form.control}
              name="aadhaarNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aadhaar Number *</FormLabel>
                  <div className="flex">
                    <FormControl>
                      <Input 
                        placeholder="12-digit Aadhaar number" 
                        maxLength={12}
                        {...field} 
                        className="rounded-r-none"
                        data-testid="input-aadhaar-number"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={() => sendOTP('aadhaar')}
                      className="rounded-l-none"
                      data-testid="button-verify-aadhaar"
                    >
                      Verify
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter street address" 
                          {...field} 
                          data-testid="input-street-address"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address.blockNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Block Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter block number" 
                          {...field} 
                          data-testid="input-block-number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter city" 
                          {...field} 
                          data-testid="input-city"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address.pinCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pin Code *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="6-digit pin code" 
                          maxLength={6}
                          {...field} 
                          data-testid="input-pin-code"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger data-testid="select-state">
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, '-')}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Live Selfie Capture */}
            <CameraCapture 
              onCapture={handleSelfieCapture}
              capturedImage={data.selfieFile}
            />

            {/* Bank Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Bank Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bankDetails.accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter account number" 
                          {...field} 
                          data-testid="input-account-number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bankDetails.accountHolderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Holder Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter account holder name" 
                          {...field} 
                          data-testid="input-account-holder-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bankDetails.ifscCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IFSC Code *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter IFSC code" 
                          {...field} 
                          data-testid="input-ifsc-code"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bankDetails.bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter bank name" 
                          {...field} 
                          data-testid="input-bank-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Monthly Income */}
            <FormField
              control={form.control}
              name="monthlyIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Monthly Income *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      placeholder="Enter average monthly income" 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      data-testid="input-monthly-income"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                disabled
                className="cursor-not-allowed"
                data-testid="button-previous-step1"
              >
                Previous
              </Button>
              <Button
                type="submit"
                data-testid="button-next-step1"
              >
                Next Step
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Step1PersonalDetails;
