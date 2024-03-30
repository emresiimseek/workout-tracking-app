import {ScrollView, TextInput, View} from 'react-native';
import WorkoutListItem from './ListItem';
import {Text} from '@rneui/base';
import colors from '../styles/colors';

export default function WorkoutList(props: {
  items: Exercise[];
  checkboxDisabled?: boolean;
  onSelected: (item: Exercise) => void;
}) {
  return (
    <ScrollView
      style={{gap: 50, flexDirection: 'column'}}
      contentContainerStyle={{gap: 10}}>
      {props.items.length ? (
        props.items.map((e, i) => (
          <WorkoutListItem
            key={e.name + i}
            item={e}
            onSelected={props.onSelected}
            checkboxDisabled={props.checkboxDisabled}
          />
        ))
      ) : (
        <Text
          style={{
            textAlign: 'center',
            marginTop: 'auto',
            color: colors.secondColor,
          }}>
          Exercise was not found.
        </Text>
      )}
    </ScrollView>
  );
}
