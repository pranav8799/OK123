import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { shopInfoSchema, ShopInfoFormData } from '@/lib/validations';
import { states } from '@/lib/mockData';
import { ShopInfo } from '@/types/kyc';

interface Step3ShopInfoProps {
  data: ShopInfo;
  onNext: (data: ShopInfo) => void;
  onPrevious: () => void;
}

const Step3ShopInfo: React.FC<Step3ShopInfoProps> = ({
  data,
  onNext,
  onPrevious
}) => {
  const form = useForm<ShopInfoFormData>({
    resolver: zodResolver(shopInfoSchema),
    defaultValues: {
      shopName: data.shopName || '',
      numberOfEmployees: data.numberOfEmployees || 0,
      shopSize: data.shopSize || 0,
      businessType: data.businessType || 'proprietorship',
      address: {
        street: data.address?.street || '',
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
      yearlyIncome: data.yearlyIncome || 0,
      businessPan: data.businessPan || '',
    },
  });

  const watchBusinessType = form.watch('businessType');

  const onSubmit = (formData: ShopInfoFormData) => {
    onNext(formData);
  };

  // Show/hide business PAN field based on business type
  const showBusinessPan = watchBusinessType !== 'proprietorship';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Step 3: Shop Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Shop Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="shopName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shop Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter shop name" 
                        {...field} 
                        data-testid="input-shop-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="numberOfEmployees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Employees *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="Enter number of employees" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        data-testid="input-number-of-employees"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="shopSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shop Size (sq.ft) *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="Enter shop size" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        data-testid="input-shop-size"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-business-type">
                          <SelectValue placeholder="Select Business Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="proprietorship">Proprietorship</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="private-limited">Private Limited</SelectItem>
                        <SelectItem value="huf">HUF</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Shop Address */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Shop Address</h3>
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
                          data-testid="input-shop-street-address"
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
                          data-testid="input-shop-city"
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
                          data-testid="input-shop-pin-code"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-shop-state">
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

            {/* Business Bank Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Business Bank Details</h3>
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
                          data-testid="input-business-account-number"
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
                          data-testid="input-business-account-holder-name"
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
                          data-testid="input-business-ifsc-code"
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
                          data-testid="input-business-bank-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Income Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Income *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="Enter monthly income" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        data-testid="input-business-monthly-income"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="yearlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yearly Income *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="Enter yearly income" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        data-testid="input-business-yearly-income"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Business PAN (conditional) */}
            {showBusinessPan && (
              <FormField
                control={form.control}
                name="businessPan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business PAN Number *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter business PAN number" 
                        {...field} 
                        data-testid="input-business-pan"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onPrevious}
                data-testid="button-previous-step3"
              >
                Previous
              </Button>
              <Button
                type="submit"
                data-testid="button-next-step3"
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

export default Step3ShopInfo;
