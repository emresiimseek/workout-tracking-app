import React from 'react';
import DayChip from './DayChip';
import {View} from 'react-native';

export const DaysChips = ({
  selectedDays,
  toggleDay,
}: {
  selectedDays: string[];
  toggleDay: (day: string) => void;
}) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 5,
        columnGap: 5,
      }}>
      {days.map(day => (
        <DayChip
          key={day}
          day={day}
          selectedDays={selectedDays}
          toggleDay={toggleDay}
        />
      ))}
    </View>
  );
};

export default DaysChips;
