import { PageHeader } from '@/components/PageHeader';
import { Screen } from '@/components/screen';
import type { IconChipTone } from '@/components/ui/icon-chip';
import { ServiceCard } from '@/components/ui/service-card';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import type { LucideIcon } from 'lucide-react-native';
import {
  Briefcase,
  ClipboardList,
  GraduationCap,
  MapPin,
  Scale,
  ShieldCheck,
} from 'lucide-react-native';
import { View } from 'react-native';

// ─── Data ─────────────────────────────────────────────────────────────────────

type Service = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  tone: IconChipTone;
  turnaround: string;
};

const SERVICES: Service[] = [
  {
    id: 'identity',
    name: 'Identity\nVerification',
    description: 'Aadhaar, PAN, Passport, Driving Licence — real-time checks.',
    icon: ShieldCheck,
    tone: 'brand',
    turnaround: '< 1 min',
  },
  {
    id: 'employment',
    name: 'Employment\nVerification',
    description: 'Past employers, job titles, tenure and references.',
    icon: Briefcase,
    tone: 'blue',
    turnaround: '24–48 hrs',
  },
  {
    id: 'education',
    name: 'Education\nVerification',
    description: 'Degrees, diplomas and certificates from recognised bodies.',
    icon: GraduationCap,
    tone: 'amber',
    turnaround: '24–48 hrs',
  },
  {
    id: 'address',
    name: 'Address\nVerification',
    description: 'Permanent residential address via govt databases or field visit.',
    icon: MapPin,
    tone: 'slate',
    turnaround: '2–5 days',
  },
  {
    id: 'background',
    name: 'Background\nCheck',
    description: 'Full bundle — identity, employment, education and criminal.',
    icon: ClipboardList,
    tone: 'blue',
    turnaround: '48–72 hrs',
  },
  {
    id: 'police',
    name: 'Police Clearance\nCertificate',
    description: 'Official certificate confirming criminal record status.',
    icon: Scale,
    tone: 'red',
    turnaround: '3–7 days',
  },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const router = useRouter();

  // Split into rows of 2
  const rows: Service[][] = [];
  for (let i = 0; i < SERVICES.length; i += 2) {
    rows.push(SERVICES.slice(i, i + 2));
  }

  return (
    <>
      <PageHeader userInitials="JP" onProfilePress={() => router.push('/profile')} />
      <Screen scrollable contentClassName="px-4 py-5 gap-5">
        {/* Hero */}
        <View className="gap-1">
          <Text
            className="text-[24px] font-extrabold text-foreground"
            style={{ letterSpacing: -0.7, lineHeight: 28 }}
          >
            Verification{'\n'}Services
          </Text>
          <Text className="text-[14px] font-medium text-muted-foreground leading-[20px] mt-1">
            Choose a check to submit a new candidate. All services are consent-logged and DPDP compliant.
          </Text>
        </View>

        {/* Service grid */}
        <View className="gap-3">
          {rows.map((row, ri) => (
            <View key={ri} className="flex-row gap-3">
              {row.map((s) => (
                <ServiceCard
                  key={s.id}
                  name={s.name}
                  description={s.description}
                  icon={s.icon}
                  tone={s.tone}
                  turnaround={s.turnaround}
                  onPress={() => router.push(`/new-request?service=${s.id}`)}
                />
              ))}
              {/* Odd row: fill empty column */}
              {row.length === 1 && <View className="flex-1" style={{ minWidth: 148 }} />}
            </View>
          ))}
        </View>

        {/* Compliance footer */}
        <View className="bg-accent/60 border border-accent rounded-2xl p-4 flex-row items-center gap-3">
          <ShieldCheck size={20} strokeWidth={2} className="text-primary flex-none" />
          <Text className="flex-1 text-[12.5px] font-semibold text-foreground leading-[18px]">
            All checks are encrypted end-to-end and stored in Indian data centres per DPDP guidelines.
          </Text>
        </View>

        <View className="h-4" />
      </Screen>
    </>
  );
}
