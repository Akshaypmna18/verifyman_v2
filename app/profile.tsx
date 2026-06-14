import { Screen } from '@/components/screen';
import { IconChip } from '@/components/ui/icon-chip';
import { Text } from '@/components/ui/text';
import {
  Bell,
  Building2,
  ChevronRight,
  CreditCard,
  FileText,
  HelpCircle,
  Lock,
  LogOut,
  Settings,
  Shield,
  Users,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { IconChipTone } from '@/components/ui/icon-chip';

// ─── Data ─────────────────────────────────────────────────────────────────────

const USER = {
  name: 'Junaid Paramberi',
  role: 'HR Manager',
  company: 'Rentowl LLP',
  email: 'junaidparamberi@gmail.com',
  initials: 'JP',
  plan: 'Pro Plan',
  memberSince: 'Jan 2025',
};

const USAGE = [
  { label: 'Submitted', value: '148' },
  { label: 'Cleared', value: '127' },
  { label: 'Pending', value: '14' },
];

type SettingsItem = {
  icon: LucideIcon;
  label: string;
  tone: IconChipTone;
  value?: string;
  destructive?: boolean;
};

type SettingsSection = {
  title: string;
  items: SettingsItem[];
};

const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    title: 'Account',
    items: [
      { icon: Settings,  label: 'Edit Profile',      tone: 'slate' },
      { icon: Lock,      label: 'Change Password',   tone: 'slate' },
      { icon: Bell,      label: 'Notifications',     tone: 'blue'  },
    ],
  },
  {
    title: 'Company',
    items: [
      { icon: Building2, label: 'Company Settings',  tone: 'brand' },
      { icon: Users,     label: 'Team Members',      tone: 'brand' },
      { icon: CreditCard,label: 'Billing & Plan',    tone: 'amber', value: 'Pro' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: HelpCircle,label: 'Help Centre',       tone: 'slate' },
      { icon: Shield,    label: 'Privacy Policy',    tone: 'slate' },
      { icon: FileText,  label: 'Terms of Service',  tone: 'slate' },
    ],
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SettingsRow({ item }: { item: SettingsItem }) {
  return (
    <Pressable className="flex-row items-center px-4 py-3.5 active:bg-secondary">
      <IconChip tone={item.tone} size="sm" className="mr-3 flex-none">
        <item.icon size={15} strokeWidth={2.2} />
      </IconChip>
      <Text className="flex-1 text-[15px] font-semibold text-foreground">
        {item.label}
      </Text>
      {item.value && (
        <Text className="text-[13px] font-bold text-primary mr-2">{item.value}</Text>
      )}
      <ChevronRight size={16} strokeWidth={2} className="text-muted-foreground" />
    </Pressable>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  return (
    <Screen scrollable contentClassName="px-0 py-0">
      {/* Hero — full-bleed top band */}
      <SafeAreaView edges={['top']} className="bg-primary/10">
        <View className="items-center pt-6 pb-8 px-6 gap-3">
          {/* Avatar */}
          <View className="w-20 h-20 rounded-full bg-primary items-center justify-center shadow-lg shadow-primary/30">
            <Text
              className="text-[28px] font-black text-primary-foreground"
              style={{ letterSpacing: 0.5 }}
            >
              {USER.initials}
            </Text>
          </View>

          {/* Identity */}
          <View className="items-center gap-0.5">
            <Text
              className="text-[22px] font-extrabold text-foreground"
              style={{ letterSpacing: -0.5 }}
            >
              {USER.name}
            </Text>
            <Text className="text-[14px] font-semibold text-muted-foreground">
              {USER.role}
            </Text>
            <Text className="text-[13px] font-medium text-muted-foreground">
              {USER.company}
            </Text>
          </View>

          {/* Plan chip */}
          <View className="bg-primary/15 border border-primary/25 rounded-full px-3 py-1">
            <Text className="text-[11px] font-extrabold tracking-widest uppercase text-primary">
              {USER.plan}
            </Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Usage stats card */}
      <View className="px-4 -mt-4">
        <View className="bg-card border border-border rounded-2xl shadow-sm shadow-black/5 overflow-hidden">
          {/* Header */}
          <View className="px-4 pt-4 pb-3 border-b border-border">
            <Text className="text-[11px] font-extrabold tracking-widest uppercase text-muted-foreground">
              This Month
            </Text>
          </View>
          {/* Stats row */}
          <View className="flex-row">
            {USAGE.map((u, idx) => (
              <View
                key={u.label}
                className="flex-1 items-center py-4"
                style={{
                  borderRightWidth: idx < USAGE.length - 1 ? 1 : 0,
                  borderRightColor: 'hsl(var(--border))',
                }}
              >
                <Text
                  className="text-[26px] font-extrabold text-foreground"
                  style={{ letterSpacing: -1 }}
                >
                  {u.value}
                </Text>
                <Text className="text-[11px] font-bold text-muted-foreground mt-0.5">
                  {u.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Settings sections */}
      <View className="px-4 pt-5 gap-4">
        {SETTINGS_SECTIONS.map((section) => (
          <View key={section.title}>
            <Text className="text-[11px] font-extrabold tracking-widest uppercase text-muted-foreground mb-2 px-1">
              {section.title}
            </Text>
            <View className="bg-card border border-border rounded-2xl overflow-hidden">
              {section.items.map((item, idx) => (
                <View key={item.label}>
                  <SettingsRow item={item} />
                  {idx < section.items.length - 1 && (
                    <View className="h-px bg-border mx-4" />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* App version */}
        <View className="px-1">
          <Text className="text-[12px] font-medium text-muted-foreground text-center">
            Verifyman v1.0.0 · Member since {USER.memberSince}
          </Text>
        </View>

        {/* Logout */}
        <Pressable className="flex-row items-center justify-center gap-2 py-3.5 rounded-2xl border border-destructive/30 bg-destructive/5 active:bg-destructive/10">
          <LogOut size={16} strokeWidth={2.2} className="text-destructive" />
          <Text className="text-[15px] font-bold text-destructive">Sign out</Text>
        </Pressable>

        <View className="h-6" />
      </View>
    </Screen>
  );
}
