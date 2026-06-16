import {
  Briefcase,
  Car,
  FileText,
  IdCard,
  MapPin,
  Scale,
  ShieldCheck,
} from 'lucide-react-native';
import type { VerificationService } from './service-types';
import type { IconChipTone } from '@/components/ui/icon-chip';
import type { LucideIcon } from 'lucide-react-native';

export interface ServiceDisplayMeta {
  icon: LucideIcon;
  tone: IconChipTone;
}

export const SERVICES_DATA: VerificationService[] = [
  {
    id: '1',
    type: 'address-verification',
    name: 'Address Verification',
    description: 'Verify candidate address and contact details.',
    price: 299,
    tatLabel: 'INSTANT',
  },
  {
    id: '2',
    type: 'criminal-record-check',
    name: 'Criminal Record Check',
    description: 'Perform criminal record and identity checks.',
    price: 499,
    tatLabel: '48 HRS',
  },
  {
    id: '3',
    type: 'employment-verification',
    name: 'Employment Verification',
    description: 'Confirm employer, tenure and position details.',
    price: 699,
    tatLabel: '48 HRS',
  },
  {
    id: '4',
    type: 'driving-license-verification',
    name: 'Driving License Verification',
    description: 'Validate licence number and date of birth.',
    price: 199,
    tatLabel: 'INSTANT',
  },
  {
    id: '5',
    type: 'voter-id-verification',
    name: 'Voter ID Verification',
    description: 'Match EPIC number with voter identity records.',
    price: 149,
    tatLabel: 'INSTANT',
  },
  {
    id: '6',
    type: 'passport-verification',
    name: 'Passport Verification',
    description: 'Verify passport number, name and date of birth.',
    price: 249,
    tatLabel: 'INSTANT',
  },
  {
    id: '7',
    type: 'vehicle-rc-verification',
    name: 'Vehicle RC Verification',
    description: 'Validate registration certificate and vehicle details.',
    price: 149,
    tatLabel: 'INSTANT',
  },
];

export const SERVICE_UI_META: Record<string, ServiceDisplayMeta> = {
  'address-verification': { icon: MapPin, tone: 'slate' },
  'criminal-record-check': { icon: Scale, tone: 'red' },
  'employment-verification': { icon: Briefcase, tone: 'blue' },
  'driving-license-verification': { icon: IdCard, tone: 'brand' },
  'voter-id-verification': { icon: ShieldCheck, tone: 'brand' },
  'passport-verification': { icon: FileText, tone: 'blue' },
  'vehicle-rc-verification': { icon: Car, tone: 'amber' },
};
