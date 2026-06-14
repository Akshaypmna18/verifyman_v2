import { PageHeader } from '@/components/PageHeader';
import { Screen } from '@/components/screen';
import { IconChip } from '@/components/ui/icon-chip';
import type { IconChipTone } from '@/components/ui/icon-chip';
import { Text } from '@/components/ui/text';
import type { LucideIcon } from 'lucide-react-native';
import {
  ArrowRight,
  Briefcase,
  ClipboardList,
  GraduationCap,
  MapPin,
  Scale,
  ShieldCheck,
} from 'lucide-react-native';
import { Pressable, View } from 'react-native';

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

// ─── Sub-components ──────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: Service }) {
  return (
    <Pressable
      className="flex-1 bg-card border border-border rounded-[20px] p-4 gap-3 active:bg-secondary shadow-sm shadow-black/5"
      style={{ minWidth: 148 }}
    >
      <IconChip tone={service.tone} size="lg">
        <service.icon size={22} strokeWidth={2} />
      </IconChip>

      <View className="gap-1 flex-1">
        <Text
          className="text-[15px] font-extrabold text-foreground"
          style={{ letterSpacing: -0.2, lineHeight: 20 }}
        >
          {service.name}
        </Text>
        <Text className="text-[12px] font-medium text-muted-foreground leading-[16px]">
          {service.description}
        </Text>
      </View>

      <View className="gap-1.5">
        <View className="flex-row items-center gap-1">
          <Text className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/70">
            Turnaround
          </Text>
          <Text className="text-[10px] font-bold text-primary">
            {service.turnaround}
          </Text>
        </View>

        <View className="flex-row items-center gap-1">
          <Text className="text-[13px] font-bold text-primary">Request</Text>
          <ArrowRight size={13} strokeWidth={2.5} className="text-primary" />
        </View>
      </View>
    </Pressable>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  // Split into rows of 2
  const rows: Service[][] = [];
  for (let i = 0; i < SERVICES.length; i += 2) {
    rows.push(SERVICES.slice(i, i + 2));
  }

  return (
    <>
      <PageHeader userInitials="JP" onProfilePress={() => {}} />
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
                <ServiceCard key={s.id} service={s} />
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
