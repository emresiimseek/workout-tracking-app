import {Chip, color} from '@rneui/base';
import React from 'react';
import colors from '../styles/colors';

const DayChip = ({
  day,
  selectedDays,
  toggleDay,
}: {
  day: string;
  selectedDays: string[];
  toggleDay: (day: string) => void;
}) => {
  return (
    <Chip
      onPress={() => toggleDay(day)}
      title={day}
      type={selectedDays.includes(day) ? 'solid' : 'outline'}
      buttonStyle={{borderColor: colors.secondColor}}
      titleStyle={{
        color: selectedDays.includes(day)
          ? colors.firstColor
          : colors.secondColor,
      }}
      size="sm"
      color={colors.secondColor}
      iconRight
      icon={
        selectedDays.includes(day)
          ? {
              name: 'close-outline',
              type: 'ionicon',
              size: 14,
              color: colors.firstColor,
            }
          : undefined
      }
    />
  );
};

export default DayChip;
