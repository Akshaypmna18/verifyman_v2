import type { IconChipTone } from '@/components/ui/icon-chip';
import type { LucideIcon } from 'lucide-react-native';
import {
  AlertTriangle,
  Bell,
  Briefcase,
  Building2,
  Car,
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
  HelpCircle,
  IdCard,
  Info,
  Lock,
  MapPin,
  RefreshCw,
  Scale,
  Settings,
  Shield,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react-native';
import type {
  RequestStatus,
  VerificationRequest,
  VerificationType,
} from './verification-types';

export type UiRequestStatus = 'running' | 'unknown' | 'done' | 'flag';
export type AlertType = 'report' | 'discrepancy' | 'payment' | 'started' | 'system';
export type AlertGroup = 'today' | 'yesterday' | 'earlier';

export type MockVerificationRequest = {
  [T in VerificationType]: VerificationRequest<T> & {
    candidateName: string;
    displayDate: string;
    paymentRequired?: boolean;
    priority: string;
    submittedAt: string;
  };
}[VerificationType];

export const VERIFICATION_TYPE_META: Record<
  VerificationType,
  {
    label: string;
    shortLabel: string;
    description: string;
    icon: LucideIcon;
    tone: IconChipTone;
    turnaround: string;
    startingPrice: number;
    badge: string;
  }
> = {
  'address-verification': {
    label: 'Address Verification',
    shortLabel: 'Address',
    description: 'Verify candidate address and contact details.',
    icon: MapPin,
    tone: 'slate',
    turnaround: 'Instant',
    startingPrice: 299,
    badge: 'INSTANT',
  },
  'criminal-record-check': {
    label: 'Criminal Record Check',
    shortLabel: 'Criminal',
    description: 'Perform criminal record and identity checks.',
    icon: Scale,
    tone: 'red',
    turnaround: '48 hrs',
    startingPrice: 499,
    badge: '48 HRS',
  },
  'employment-verification': {
    label: 'Employment Verification',
    shortLabel: 'Employment',
    description: 'Confirm employer, tenure and position details.',
    icon: Briefcase,
    tone: 'blue',
    turnaround: '24-48 hrs',
    startingPrice: 699,
    badge: '48 HRS',
  },
  'driving-license-verification': {
    label: 'Driving License Verification',
    shortLabel: 'Driving License',
    description: 'Validate licence number and date of birth.',
    icon: IdCard,
    tone: 'brand',
    turnaround: 'Instant',
    startingPrice: 199,
    badge: 'INSTANT',
  },
  'voter-id-verification': {
    label: 'Voter ID Verification',
    shortLabel: 'Voter ID',
    description: 'Match EPIC number with voter identity records.',
    icon: ShieldCheck,
    tone: 'brand',
    turnaround: 'Instant',
    startingPrice: 149,
    badge: 'INSTANT',
  },
  'passport-verification': {
    label: 'Passport Verification',
    shortLabel: 'Passport',
    description: 'Verify passport number, name and date of birth.',
    icon: FileText,
    tone: 'blue',
    turnaround: 'Instant',
    startingPrice: 249,
    badge: 'INSTANT',
  },
  'vehicle-rc-verification': {
    label: 'Vehicle RC Verification',
    shortLabel: 'Vehicle RC',
    description: 'Validate registration certificate and vehicle details.',
    icon: Car,
    tone: 'amber',
    turnaround: 'Instant',
    startingPrice: 149,
    badge: 'INSTANT',
  },
};

export const MOCK_ACCOUNT = {
  name: 'Junaid Paramberi',
  role: 'HR Manager',
  company: 'Rentowl LLP',
  email: 'junaidparamberi@gmail.com',
  initials: 'JP',
  plan: 'Pro Plan',
  memberSince: 'Jan 2025',
} as const;

export const MOCK_VERIFICATION_REQUESTS: MockVerificationRequest[] = [
  {
    id: 'VM-20260614-148',
    type: 'driving-license-verification',
    status: 'processing',
    candidateName: 'Arjun Patel',
    submittedAt: '2026-06-14T09:14:00+04:00',
    displayDate: '14 Jun 2026',
    priority: 'Normal priority',
    data: {
      drivingLicenseInformation: {
        drivingLicenseNumber: 'MH1220110001234',
        dateOfBirth: '1994-08-21',
      },
    },
  },
  {
    id: 'VM-20260613-147',
    type: 'employment-verification',
    status: 'completed',
    candidateName: 'Priya Sharma',
    submittedAt: '2026-06-13T14:22:00+04:00',
    displayDate: '13 Jun 2026',
    priority: 'High priority',
    data: {
      employmentInformation: {
        placementCompany: 'Rentowl LLP',
        claimedStartDate: '2022-04-01',
        claimedEndDate: '2025-05-30',
        claimedPositionHeld: 'Senior HR Executive',
      },
      refereeInformation: {
        refereeName: 'Neha Kapoor',
        refereeEmail: 'neha.kapoor@example.com',
        agencyReference: 'AGY-EMP-147',
        requestingAgency: 'Verifyman',
      },
      employerResponse: {
        confirmedStartDate: '2022-04-01',
        confirmedEndDate: '2025-05-30',
        confirmedPositionHeld: 'Senior HR Executive',
        signedAt: '2026-06-13T12:30:00+04:00',
        signedByName: 'Neha Kapoor',
        refereeTitlePosition: 'HR Manager',
      },
    },
  },
  {
    id: 'VM-20260612-146',
    type: 'address-verification',
    status: 'failed',
    candidateName: 'Vikas Menon',
    submittedAt: '2026-06-12T08:02:00+04:00',
    displayDate: '12 Jun 2026',
    priority: 'Normal priority',
    paymentRequired: true,
    data: {
      addressInformation: {
        address: '12 Palm Residency, Indiranagar',
        zip: '560038',
        city: 'Bengaluru',
        state: 'Karnataka',
      },
      contactPersonInformation: {
        contactPersonName: 'Ravi Menon',
        contactPersonPhone: '+91 98765 43210',
      },
    },
  },
  {
    id: 'VM-20260611-145',
    type: 'passport-verification',
    status: 'completed',
    candidateName: 'Aarya Rao',
    submittedAt: '2026-06-11T11:40:00+04:00',
    displayDate: '11 Jun 2026',
    priority: 'Normal priority',
    data: {
      passportInformation: {
        passportNumber: 'Z1234567',
        dateOfBirth: '1997-02-14',
        nameOnPassport: 'Aarya Rao',
      },
    },
  },
  {
    id: 'VM-20260610-144',
    type: 'criminal-record-check',
    status: 'in-progress',
    candidateName: 'Rahul Verma',
    submittedAt: '2026-06-10T16:55:00+04:00',
    displayDate: '10 Jun 2026',
    priority: 'High priority',
    data: {
      criminalRecordInformation: {
        fatherName: 'Suresh Verma',
        dateOfBirth: '1991-11-03',
        address: '45 Lake View Road, Pune, Maharashtra',
        aadharFrontPhoto: null,
        aadharBackPhoto: null,
      },
    },
  },
  {
    id: 'VM-20260609-143',
    type: 'voter-id-verification',
    status: 'qa_pending',
    candidateName: 'Sneha Iyer',
    submittedAt: '2026-06-09T10:25:00+04:00',
    displayDate: '9 Jun 2026',
    priority: 'Normal priority',
    data: {
      voterIdInformation: {
        epicNumber: 'ABC1234567',
        nameOnVoterId: 'Sneha Iyer',
      },
    },
  },
  {
    id: 'VM-20260608-142',
    type: 'criminal-record-check',
    status: 'pending_consent',
    candidateName: 'Kiran Desai',
    submittedAt: '2026-06-08T07:30:00+04:00',
    displayDate: '8 Jun 2026',
    priority: 'Urgent',
    paymentRequired: true,
    data: {
      criminalRecordInformation: {
        fatherName: 'Mahesh Desai',
        dateOfBirth: '1988-06-19',
        address: '88 Marine Drive, Mumbai, Maharashtra',
        aadharFrontPhoto: null,
        aadharBackPhoto: null,
      },
    },
  },
  {
    id: 'VM-20260607-141',
    type: 'employment-verification',
    status: 'processing',
    candidateName: 'Rohan Gupta',
    submittedAt: '2026-06-07T13:05:00+04:00',
    displayDate: '7 Jun 2026',
    priority: 'Normal priority',
    data: {
      employmentInformation: {
        placementCompany: 'Northstar Technologies',
        claimedStartDate: '2020-01-15',
        claimedEndDate: '2024-12-31',
        claimedPositionHeld: 'Operations Analyst',
      },
      refereeInformation: {
        refereeName: 'Amit Khanna',
        refereeEmail: 'amit.khanna@example.com',
        agencyReference: 'AGY-EMP-141',
        requestingAgency: 'Verifyman',
      },
    },
  },
  {
    id: 'VM-20260606-140',
    type: 'vehicle-rc-verification',
    status: 'draft',
    candidateName: 'Meera Nair',
    submittedAt: '2026-06-06T15:10:00+04:00',
    displayDate: '6 Jun 2026',
    priority: 'Normal priority',
    data: {
      vehicleRegistrationNumber: 'KL07AB1234',
    },
  },
];

export const MOCK_SERVICE_CATALOG = Object.entries(VERIFICATION_TYPE_META).map(
  ([id, meta]) => ({
    id: id as VerificationType,
    name: meta.label.replace(' Verification', '\nVerification').replace(' Record ', ' Record\n'),
    description: meta.description,
    icon: meta.icon,
    tone: meta.tone,
    turnaround: meta.turnaround,
    startingPrice: meta.startingPrice,
    badge: meta.badge,
  })
);

export const MOCK_QUICK_ACTIONS = [
  'driving-license-verification',
  'employment-verification',
  'passport-verification',
  'address-verification',
].map((id) => {
  const type = id as VerificationType;
  const meta = VERIFICATION_TYPE_META[type];

  return {
    id: type,
    label: meta.shortLabel,
    icon: meta.icon,
    tone: meta.tone,
  };
});

export const MOCK_ALERT_TYPE_CONFIG: Record<
  AlertType,
  { icon: LucideIcon; tone: IconChipTone }
> = {
  report: { icon: CheckCircle, tone: 'brand' },
  discrepancy: { icon: AlertTriangle, tone: 'red' },
  payment: { icon: CreditCard, tone: 'amber' },
  started: { icon: RefreshCw, tone: 'blue' },
  system: { icon: Info, tone: 'slate' },
};

export type MockAlert = {
  id: string;
  requestId?: string;
  type: AlertType;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  group: AlertGroup;
};

export const MOCK_ALERTS: MockAlert[] = [
  {
    id: 'alert-1',
    requestId: 'VM-20260613-147',
    type: 'report',
    title: 'Priya Sharma - Report ready',
    body: 'Employment verification completed. Previous employer details are confirmed.',
    time: '9:14 AM',
    unread: true,
    group: 'today',
  },
  {
    id: 'alert-2',
    requestId: 'VM-20260612-146',
    type: 'discrepancy',
    title: 'Vikas Menon - Discrepancy found',
    body: 'Address provided does not match available records. Review is required.',
    time: '8:02 AM',
    unread: true,
    group: 'today',
  },
  {
    id: 'alert-3',
    requestId: 'VM-20260608-142',
    type: 'payment',
    title: 'Payment required - Kiran Desai',
    body: 'Criminal record check requires payment before processing can continue.',
    time: '7:30 AM',
    unread: true,
    group: 'today',
  },
  {
    id: 'alert-4',
    requestId: 'VM-20260610-144',
    type: 'started',
    title: 'Rahul Verma - Verification started',
    body: 'Criminal record check is now in progress.',
    time: 'Yesterday, 4:55 PM',
    unread: false,
    group: 'yesterday',
  },
  {
    id: 'alert-5',
    requestId: 'VM-20260609-143',
    type: 'started',
    title: 'Sneha Iyer - QA pending',
    body: 'Voter ID verification has moved to quality review.',
    time: 'Yesterday, 2:11 PM',
    unread: false,
    group: 'yesterday',
  },
  {
    id: 'alert-6',
    type: 'system',
    title: 'New service available: Vehicle RC',
    body: 'Vehicle registration certificate checks are now available in the service catalog.',
    time: 'Yesterday, 10:00 AM',
    unread: false,
    group: 'yesterday',
  },
];

export type MockSettingsSection = {
  title: string;
  items: Array<{
    icon: LucideIcon;
    label: string;
    tone: IconChipTone;
    value?: string;
  }>;
};

export const MOCK_SETTINGS_SECTIONS: MockSettingsSection[] = [
  {
    title: 'Account',
    items: [
      { icon: Settings, label: 'Edit Profile', tone: 'slate' },
      { icon: Lock, label: 'Change Password', tone: 'slate' },
      { icon: Bell, label: 'Notifications', tone: 'blue' },
    ],
  },
  {
    title: 'Company',
    items: [
      { icon: Building2, label: 'Company Settings', tone: 'brand' },
      { icon: Users, label: 'Team Members', tone: 'brand' },
      { icon: CreditCard, label: 'Billing & Plan', tone: 'amber', value: 'Pro' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: HelpCircle, label: 'Help Centre', tone: 'slate' },
      { icon: Shield, label: 'Privacy Policy', tone: 'slate' },
      { icon: FileText, label: 'Terms of Service', tone: 'slate' },
    ],
  },
];

export function mapRequestStatusToBadge(status: RequestStatus): UiRequestStatus {
  switch (status) {
    case 'completed':
      return 'done';
    case 'failed':
      return 'flag';
    case 'processing':
    case 'in-progress':
    case 'qa_pending':
      return 'running';
    case 'pending_consent':
    case 'draft':
    case 'deleted':
      return 'unknown';
  }
}

export function getMockVerificationRequest(id: string) {
  return MOCK_VERIFICATION_REQUESTS.find((request) => request.id === id);
}

export function getMockNotificationCount() {
  return MOCK_ALERTS.filter((alert) => alert.unread).length;
}

export function getMockDashboardStats() {
  const total = MOCK_VERIFICATION_REQUESTS.length;
  const completed = MOCK_VERIFICATION_REQUESTS.filter(
    (request) => request.status === 'completed'
  ).length;
  const running = MOCK_VERIFICATION_REQUESTS.filter((request) =>
    ['processing', 'in-progress', 'qa_pending'].includes(request.status)
  ).length;
  const clearRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return [
    { label: 'Total', value: total, caption: 'Mock backend', icon: Users, tone: 'brand' as const },
    {
      label: 'Cleared',
      value: completed,
      caption: `${clearRate}% clear rate`,
      icon: CheckCircle,
      tone: 'brand' as const,
    },
    {
      label: 'Running',
      value: running,
      caption: 'In progress',
      icon: TrendingUp,
      tone: 'amber' as const,
    },
    { label: 'Avg time', value: '27m', caption: 'Mock SLA', icon: Clock, tone: 'blue' as const },
  ];
}

export function getMockUsageStats() {
  const completed = MOCK_VERIFICATION_REQUESTS.filter(
    (request) => request.status === 'completed'
  ).length;
  const pending = MOCK_VERIFICATION_REQUESTS.filter(
    (request) => mapRequestStatusToBadge(request.status) === 'running'
  ).length;

  return [
    { label: 'Submitted', value: String(MOCK_VERIFICATION_REQUESTS.length) },
    { label: 'Cleared', value: String(completed) },
    { label: 'Pending', value: String(pending) },
  ];
}
