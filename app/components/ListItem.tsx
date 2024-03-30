import {Avatar, Dialog, Icon, Input, ListItem, Text} from '@rneui/base';
import {useState} from 'react';
import {View} from 'react-native';
import DaysChips from './DaysChips';
import colors from '../styles/colors';

export default function WorkoutListItem(props: {
  item: Exercise;
  checkboxDisabled?: boolean;
  onSelected: (item: Exercise) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [sets, setSets] = useState<string>('');
  const [reps, setReps] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setSelectedDays((old: string[]) => {
      if (old.includes(day)) {
        return old.filter(sd => sd !== day);
      } else {
        return [...old, day];
      }
    });
  };

  const toggleDialog1 = () => {
    setVisible1(!visible1);
  };

  return (
    <ListItem.Accordion
      key={props.item.name}
      containerStyle={{
        paddingHorizontal: 2,
        borderRadius: 5,
        backgroundColor: colors.secondColor,
      }}
      content={
        <>
          {!props.checkboxDisabled && (
            <ListItem.CheckBox
              iconType="feather"
              checkedIcon={
                <Icon
                  name="check-square"
                  type="feather"
                  color={colors.firstColor}
                />
              }
              containerStyle={{backgroundColor: colors.secondColor}}
              uncheckedIcon="square"
              uncheckedColor={colors.firstColor}
              size={25}
              checked={checked}
              onPress={() => {
                toggleDialog1();
              }}
            />
          )}

          <ListItem.Content style={{paddingLeft: 5}}>
            <ListItem.Title style={{fontWeight: 'bold', fontSize: 18}}>
              {props.item.name}
              {props.item.sets && props.item.reps && (
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>{` (${props.item.sets}x${props.item.reps})`}</Text>
              )}
            </ListItem.Title>
            <ListItem.Subtitle>
              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontWeight: 'bold'}}>Difficulty: </Text>
                  <Text>{props.item.difficulty}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontWeight: 'bold'}}>Equipment: </Text>
                  <Text>{props.item.equipment}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontWeight: 'bold'}}>Type: </Text>
                  <Text>{props.item.type}</Text>
                </View>
              </View>
            </ListItem.Subtitle>
          </ListItem.Content>
          <Dialog
            overlayStyle={{
              borderRadius: 16,
              backgroundColor: colors.firstColor,
              width: '70%',
              height: 'auto',
            }}
            isVisible={visible1}
            onBackdropPress={toggleDialog1}>
            <Dialog.Title
              titleStyle={{color: colors.secondColor}}
              title="Sets x Reps"
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View style={{flex: 0.5}}>
                <Input
                  value={sets}
                  onChangeText={value => setSets(value)}
                  autoFocus
                  placeholder="Sets"
                  placeholderTextColor={colors.secondColor}
                  style={{width: '100%'}}
                  keyboardType="number-pad"
                />
              </View>
              <Icon
                type="ionicon"
                name="close-outline"
                color={colors.secondColor}
              />
              <View style={{flex: 0.5}}>
                <Input
                  value={reps}
                  placeholder="Reps"
                  placeholderTextColor={colors.secondColor}
                  onChangeText={value => setReps(value)}
                  style={{width: '50%'}}
                  keyboardType="number-pad"
                />
              </View>
            </View>
            <DaysChips selectedDays={selectedDays} toggleDay={toggleDay} />
            <Dialog.Actions>
              <Dialog.Button
                title="Save"
                color={colors.secondColor}
                titleStyle={{color: colors.secondColor}}
                onPress={() => {
                  if (!sets && !reps) {
                    setError('Please fill all fields before saving');
                  } else {
                    const selectedItem: Exercise = {
                      ...props.item,
                      sets,
                      reps,
                      days: selectedDays,
                    };
                    props.onSelected(selectedItem);
                    toggleDialog1();
                    setChecked(!checked);
                  }
                }}
              />
            </Dialog.Actions>
          </Dialog>
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}>
      <View
        style={{
          backgroundColor: colors.secondColor,
          padding: 10,
          borderRadius: 5,
        }}>
        <Text style={{fontWeight: 'bold'}}>Instructions: </Text>
        <Text>{props.item.instructions}</Text>
      </View>
    </ListItem.Accordion>
  );
}
