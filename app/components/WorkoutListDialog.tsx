import {Button, Dialog} from '@rneui/base';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {getRequest} from '../logic/exercises-api-base';
import {Slug} from 'react-native-body-highlighter';
import WorkoutListItem from './WorkoutList';
import {useMutation} from '@apollo/client';
import {CREATE_EXERCISE} from '../logic/graphql/mutations/createExercise';
import colors from '../styles/colors';

export const WorkoutListDialog = (props: {
  visible: boolean;
  toggleDialog: (type: 'cancel' | 'confirm') => void;
  slug: Slug;
  programId: number;
  onSaved: () => void;
}) => {
  const [createExersice, {loading, data}] =
    useMutation<Exercise>(CREATE_EXERCISE);

  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const getExercies = async () => {
    const result = await getRequest(props.slug);
    setExercises(result);
  };

  useEffect(() => {
    getExercies();
  }, [props.slug]);

  const saveExercises = async () => {
    selectedExercises.forEach(async exercise => {
      await createExersice({
        variables: {
          data: {
            ...exercise,
            days: exercise.days.join(','),
            sets: +exercise.sets,
            reps: +exercise.reps,
            publishedAt: new Date(),
            program: props.programId,
          },
        },
      });
    });
  };

  return (
    <View>
      <Dialog
        overlayStyle={{
          borderRadius: 16,
          borderWidth: 1,
          backgroundColor: colors.firstColor,
          width: '96%',
          height: '90%',
        }}
        isVisible={props.visible}
        onBackdropPress={() => props.toggleDialog('cancel')}>
        <Dialog.Title
          titleStyle={{color: colors.secondColor, textAlign: 'center'}}
          title={`${props.slug.toUpperCase()} Exercises (${
            selectedExercises.length
          })`}
        />
        <WorkoutListItem
          items={exercises}
          onSelected={item => {
            if (selectedExercises.find(se => se.name === item.name)) {
              setSelectedExercises(old =>
                old.filter(se => se.name != item.name),
              );
            } else setSelectedExercises(old => [...old, item]);
          }}
        />
        <Dialog.Actions
          children={
            <View style={{rowGap: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 5,
                  flexWrap: 'wrap',
                }}></View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  gap: 10,
                }}>
                <Button
                  title="CANCEL"
                  type="outline"
                  titleStyle={{color: colors.secondColor}}
                  color={colors.secondColor}
                  buttonStyle={{borderColor: colors.secondColor}}
                  onPress={() => {
                    setSelectedExercises([]);
                    props.toggleDialog('cancel');
                  }}
                />
                <Button
                  title="CONFIRM"
                  color={colors.firstColor}
                  type="outline"
                  titleStyle={{color: colors.secondColor}}
                  buttonStyle={{borderColor: colors.secondColor}}
                  onPress={async () => {
                    props.toggleDialog('confirm');
                    await saveExercises();
                    props.onSaved();
                  }}
                />
              </View>
            </View>
          }></Dialog.Actions>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({});
