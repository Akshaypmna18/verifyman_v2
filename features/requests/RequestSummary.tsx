import React from 'react';
import { View } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { Text } from '@/components/ui/text';
import { CreateRequestData } from './request-types';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const SummaryItem = ({ label, value }: { label: string; value?: string }) => (
  <View className="gap-0.5">
    <Text className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">
      {label}
    </Text>
    <Text className="text-[15px] font-semibold text-foreground">
      {value || 'Not provided'}
    </Text>
  </View>
);

export const RequestSummary = () => {
  const { getValues } = useFormContext<CreateRequestData>();
  const data = getValues();
  const { isMobile } = useBreakpoint();

  const renderServiceSummary = () => {
    switch (data.serviceType) {
      case 'address-verification':
        return (
          <View className="gap-4">
            <SummaryItem
              label="Address"
              value={`${data.address?.addressLine1}${data.address?.addressLine2 ? `, ${data.address?.addressLine2}` : ''}`}
            />
            <View className={cn('gap-4', !isMobile && 'flex-row')}>
              <View className="flex-1">
                <SummaryItem label="City" value={data.address?.city} />
              </View>
              <View className="flex-1">
                <SummaryItem label="State" value={data.address?.state} />
              </View>
              <View className="flex-1">
                <SummaryItem label="Pincode" value={data.address?.pincode} />
              </View>
            </View>
          </View>
        );
      case 'criminal-record-check':
        return (
          <View className="gap-4">
            <View className={cn('gap-4', !isMobile && 'flex-row')}>
              <View className="flex-1">
                <SummaryItem label="Father's Name" value={data.criminal?.fatherName} />
              </View>
              <View className="flex-1">
                <SummaryItem label="Date of Birth" value={data.criminal?.dateOfBirth} />
              </View>
            </View>
            <SummaryItem label="Current Address" value={data.criminal?.address} />
          </View>
        );
      case 'employment-verification':
        return (
          <View className="gap-4">
            <View className={cn('gap-4', !isMobile && 'flex-row')}>
              <View className="flex-1">
                <SummaryItem label="Employer" value={data.employment?.employerName} />
              </View>
              <View className="flex-1">
                <SummaryItem label="Position" value={data.employment?.positionHeld} />
              </View>
            </View>
            <View className={cn('gap-4', !isMobile && 'flex-row')}>
              <View className="flex-1">
                <SummaryItem label="Tenure" value={`${data.employment?.startDate} - ${data.employment?.endDate || 'Present'}`} />
              </View>
              <View className="flex-1">
                <SummaryItem label="Referee" value={`${data.employment?.refereeName} (${data.employment?.refereeEmail})`} />
              </View>
            </View>
          </View>
        );
      case 'driving-license-verification':
        return (
          <View className={cn('gap-4', !isMobile && 'flex-row')}>
            <View className="flex-1">
              <SummaryItem label="License Number" value={data.drivingLicense?.licenseNumber} />
            </View>
            <View className="flex-1">
              <SummaryItem label="Date of Birth" value={data.drivingLicense?.dateOfBirth} />
            </View>
          </View>
        );
      case 'voter-id-verification':
        return (
          <View className={cn('gap-4', !isMobile && 'flex-row')}>
            <View className="flex-1">
              <SummaryItem label="EPIC Number" value={data.voterId?.epicNumber} />
            </View>
            <View className="flex-1">
              <SummaryItem label="Date of Birth" value={data.voterId?.dateOfBirth} />
            </View>
          </View>
        );
      case 'passport-verification':
        return (
          <View className={cn('gap-4', !isMobile && 'flex-row')}>
            <View className="flex-1">
              <SummaryItem label="Passport Number" value={data.passport?.passportNumber} />
            </View>
            <View className="flex-1">
              <SummaryItem label="Date of Birth" value={data.passport?.dateOfBirth} />
            </View>
          </View>
        );
      case 'vehicle-rc-verification':
        return (
          <SummaryItem label="Registration Number" value={data.vehicleRC?.registrationNumber} />
        );
      default:
        return null;
    }
  };

  return (
    <View className="gap-6">
      <View className="gap-4">
        <Text className="text-[18px] font-bold text-foreground px-1">
          Candidate Details
        </Text>
        <Card className="rounded-2xl border-border bg-accent/20">
          <CardContent className="p-4 gap-4">
            <View className={cn('gap-4', !isMobile && 'flex-row')}>
              <View className="flex-1">
                <SummaryItem
                  label="Name"
                  value={`${data.candidate.firstName} ${data.candidate.lastName}`}
                />
              </View>
              <View className="flex-1">
                <SummaryItem label="Email" value={data.candidate.email} />
              </View>
              <View className="flex-1">
                <SummaryItem label="Mobile" value={data.candidate.mobile} />
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      <View className="gap-4">
        <Text className="text-[18px] font-bold text-foreground px-1">
          Service Information
        </Text>
        <Card className="rounded-2xl border-border bg-accent/20">
          <CardContent className="p-4 gap-4">
            {renderServiceSummary()}
          </CardContent>
        </Card>
      </View>
    </View>
  );
};
