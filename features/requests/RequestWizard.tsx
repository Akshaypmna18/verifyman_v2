import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addRequest, updateRequest } from './request-mock-store';
import { VerificationRequest } from './request-mock-store';
import { 
  CreateRequestSchema, 
  CreateRequestData, 
  STEPS, 
  VerificationServiceType
} from './request-types';
import { INITIAL_REQUEST_STATE } from './request-seed';
import { CandidateInfoStep } from './CandidateInfoStep';
import { ReviewStep } from './ReviewStep';
import { RequestProgress } from './RequestProgress';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { ChevronRight, ChevronLeft, Send } from 'lucide-react-native';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { cn } from '@/lib/utils';
import { useLocalSearchParams } from 'expo-router';

// Service Forms
import { AddressForm } from './forms/AddressForm';
import { CriminalForm } from './forms/CriminalForm';
import { EmploymentForm } from './forms/EmploymentForm';
import { DrivingLicenseForm } from './forms/DrivingLicenseForm';
import { VoterIdForm } from './forms/VoterIdForm';
import { PassportForm } from './forms/PassportForm';
import { VehicleRCForm } from './forms/VehicleRCForm';

export const RequestWizard = ({ existingRequest }: { existingRequest?: VerificationRequest }) => {
  const { type } = useLocalSearchParams<{ type: VerificationServiceType }>();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const currentStep = STEPS[currentStepIndex];
  const { isMobile } = useBreakpoint();

  const methods = useForm<CreateRequestData>({
    resolver: zodResolver(CreateRequestSchema),
    mode: 'onBlur',
    defaultValues: existingRequest ? existingRequest.data : {
      ...INITIAL_REQUEST_STATE,
      serviceType: type || 'address-verification',
    },
  });

  const { trigger, handleSubmit, formState: { isSubmitting }, setValue } = methods;

  // Sync serviceType if it changes in params
  useEffect(() => {
    if (type) {
      setValue('serviceType', type);
    }
  }, [type, setValue]);

  const handleNext = async () => {
    let isValid = false;
    
    if (currentStep.id === 'candidate') {
      isValid = await trigger('candidate');
    } else if (currentStep.id === 'service-form') {
      const serviceType = methods.getValues('serviceType');
      switch (serviceType) {
        case 'address-verification':
          isValid = await trigger('address');
          break;
        case 'criminal-record-check':
          isValid = await trigger('criminal');
          break;
        case 'employment-verification':
          isValid = await trigger('employment');
          break;
        case 'driving-license-verification':
          isValid = await trigger('drivingLicense');
          break;
        case 'voter-id-verification':
          isValid = await trigger('voterId');
          break;
        case 'passport-verification':
          isValid = await trigger('passport');
          break;
        case 'vehicle-rc-verification':
          isValid = await trigger('vehicleRC');
          break;
        default:
          isValid = true;
      }
    } else {
      isValid = true;
    }

    if (isValid) {
      setCurrentStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

// ... existing imports

// ... existing code

  const onSubmit = async (data: CreateRequestData) => {
    try {
      if (existingRequest) {
        await updateRequest(existingRequest.id, data);
        alert('Request updated successfully!');
      } else {
        await addRequest(data);
        alert('Request submitted successfully!');
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit request. Please check your connection and try again.');
    }
  };

  const onError = (errors: any) => {
    console.log('[STEP] Review submit clicked - FAILED');
    console.log('[FORM ERRORS]', JSON.stringify(errors, null, 2));
  };

  const renderServiceForm = () => {
    const serviceType = methods.watch('serviceType');
    switch (serviceType) {
      case 'address-verification':
        return <AddressForm />;
      case 'criminal-record-check':
        return <CriminalForm />;
      case 'employment-verification':
        return <EmploymentForm />;
      case 'driving-license-verification':
        return <DrivingLicenseForm />;
      case 'voter-id-verification':
        return <VoterIdForm />;
      case 'passport-verification':
        return <PassportForm />;
      case 'vehicle-rc-verification':
        return <VehicleRCForm />;
      default:
        return <Text className="text-destructive">Unknown service type</Text>;
    }
  };

  const renderStepContent = () => {
    if (isSubmitted) {
      return (
        <View className="items-center py-10 gap-4">
          <View className="w-16 h-16 rounded-full bg-primary/20 items-center justify-center">
            <Send size={32} className="text-primary" />
          </View>
          <Text className="text-[20px] font-bold text-foreground text-center">
            Request Submitted!
          </Text>
          <Text className="text-muted-foreground text-center px-4">
            Your verification request has been successfully created and is being processed.
          </Text>
        </View>
      );
    }

    switch (currentStep.id) {
      case 'candidate':
        return <CandidateInfoStep />;
      case 'service-form':
        return renderServiceForm();
      case 'review':
        return <ReviewStep />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <View className="flex-1 gap-6">
        <RequestProgress 
          currentStepId={currentStep.id} 
          isAllCompleted={isSubmitted}
        />
        
        <View className="flex-1 bg-card border border-border rounded-3xl p-6">
          <Text className="text-[22px] font-extrabold text-foreground mb-6">
            {isSubmitted ? 'Success' : currentStep.title}
          </Text>
          
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {renderStepContent()}
          </ScrollView>
        </View>

        {!isSubmitted && (
          <View className={cn('flex-row gap-4 mt-2', isMobile ? 'flex-col-reverse' : 'justify-between')}>
            {currentStepIndex > 0 ? (
              <Button
                variant="outline"
                size="lg"
                className={cn('rounded-full', isMobile ? 'w-full' : 'px-8')}
                onPress={handleBack}
                disabled={isSubmitting}
              >
                <ChevronLeft size={20} className="text-foreground" />
                <Text className="font-bold">Back</Text>
              </Button>
            ) : (
              <View className={isMobile ? 'hidden' : 'w-24'} />
            )}

            <Button
              size="lg"
              className={cn('rounded-full bg-primary', isMobile ? 'w-full' : 'px-8')}
              onPress={() => {
                console.log('[STEP] Review submit clicked');
                if (currentStepIndex === STEPS.length - 1) {
                  handleSubmit(onSubmit, onError)();
                } else {
                  handleNext();
                }
              }}
              disabled={isSubmitting}
            >
              <Text className="font-bold text-white">
                {currentStepIndex === STEPS.length - 1 ? 'Submit Request' : 'Next Step'}
              </Text>
              {currentStepIndex === STEPS.length - 1 ? (
                <Send size={18} color="white" />
              ) : (
                <ChevronRight size={20} color="white" />
              )}
            </Button>
          </View>
        )}
      </View>
    </FormProvider>
  );
};
