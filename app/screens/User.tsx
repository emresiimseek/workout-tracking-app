import * as React from 'react';
import {Text, ScrollView} from 'react-native';

export interface UserProps {}

export function UserPage(props: UserProps) {
  return (
    <ScrollView style={{padding: 7}}>
      <Text>User</Text>
    </ScrollView>
  );
}
