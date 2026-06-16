import React from 'react';
import { View } from 'react-native';
import { ServiceCard } from './ServiceCard';
import { SERVICES_DATA } from './services-data';
import { VerificationService } from './service-types';
import { useBreakpoint } from '@/hooks/use-breakpoint';

interface ServicesListProps {
  onServicePress?: (service: VerificationService) => void;
}

export const ServicesList: React.FC<ServicesListProps> = () => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  
  // Determine number of columns
  const numColumns = isDesktop ? 3 : isTablet ? 2 : 1;
  
  // Chunk data for rows
  const rows = [];
  for (let i = 0; i < SERVICES_DATA.length; i += numColumns) {
    rows.push(SERVICES_DATA.slice(i, i + numColumns));
  }

  return (
    <View className="gap-4">
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row gap-4">
          {row.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
          {/* Add empty spacers for partial rows in tablet/desktop */}
          {row.length < numColumns && Array.from({ length: numColumns - row.length }).map((_, i) => (
            <View key={`spacer-${i}`} className="flex-1" />
          ))}
        </View>
      ))}
    </View>
  );
};
