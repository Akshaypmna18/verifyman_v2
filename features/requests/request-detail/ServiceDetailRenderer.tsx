import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { VerificationRequest } from '../../features/requests/request-mock-store';

export function ServiceDetailRenderer({ request }: { request: VerificationRequest }) {
  const { data } = request;

  const renderFields = () => {
    switch (data.serviceType) {
      case 'address-verification':
        return (
          <>
            <Field label="Address Line 1" value={data.address.addressLine1} />
            <Field label="Address Line 2" value={data.address.addressLine2} />
            <Field label="City" value={data.address.city} />
            <Field label="State" value={data.address.state} />
            <Field label="Pincode" value={data.address.pincode} />
            <Field label="Country" value={data.address.country} />
          </>
        );
      case 'criminal-record-check':
        return (
          <>
            <Field label="Father Name" value={data.criminal.fatherName} />
            <Field label="DOB" value={data.criminal.dob} />
            <Field label="Address" value={data.criminal.address} />
          </>
        );
      case 'employment-verification':
        return (
          <>
            <Field label="Employer" value={data.employment.employerName} />
            <Field label="Position" value={data.employment.position} />
            <Field label="Start Date" value={data.employment.startDate} />
            <Field label="End Date" value={data.employment.endDate} />
            <Field label="Referee Name" value={data.employment.refereeName} />
            <Field label="Referee Email" value={data.employment.refereeEmail} />
          </>
        );
      case 'driving-license-verification':
        return (
          <>
            <Field label="License Number" value={data.drivingLicense.licenseNumber} />
            <Field label="DOB" value={data.drivingLicense.dob} />
          </>
        );
      case 'voter-id-verification':
        return (
          <>
            <Field label="EPIC Number" value={data.voterId.epicNumber} />
            <Field label="DOB" value={data.voterId.dob} />
          </>
        );
      case 'passport-verification':
        return (
          <>
            <Field label="Passport Number" value={data.passport.passportNumber} />
            <Field label="DOB" value={data.passport.dob} />
          </>
        );
      case 'vehicle-rc-verification':
        return (
          <>
            <Field label="Registration Number" value={data.vehicleRC.registrationNumber} />
          </>
        );
      default:
        return <Text>No details available.</Text>;
    }
  };

  return <View className="gap-4">{renderFields()}</View>;
}

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <View>
      <Text className="text-muted-foreground text-sm">{label}</Text>
      <Text className="text-base font-semibold">{value}</Text>
    </View>
  );
}
