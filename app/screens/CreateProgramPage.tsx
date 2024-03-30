import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Icon} from '@rneui/themed';
import {useEffect, useState} from 'react';
import {WorkoutListDialog} from '../components/WorkoutListDialog';
import Body, {BodyPart, Slug} from 'react-native-body-highlighter';
import CreatePageHeaderStatus from '../components/CreatePageHeaderStatus';
import {TabStatusItem} from '../types/tab-status-item';
import {ButtonGroup, Text} from '@rneui/base';
import WorkoutList from '../components/WorkoutList';
import {useQuery} from '@apollo/client';
import {Items} from '../types/strapi/base/base';
import {GET_EXERCISES} from '../logic/graphql/queries/getExercises';
import colors from '../styles/colors';

function CreateProgramPage({route}: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedParts, setSelectedParts] = useState<Slug[]>([]);
  const [currentSelectedPart, setCurrentSelectedPart] = useState<Slug>();
  const [visible, setVisible] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {data, refetch, loading} = useQuery<{exercises: Items<Exercise>}>(
    GET_EXERCISES,
    {
      variables: {
        filters: {
          program: {id: {eq: route.params.id}},
        },
      },
    },
  );

  useEffect(() => {
    setSelectedParts(exercises.map(e => e.muscle as Slug));
  }, [data]);

  const exercises: Exercise[] =
    data?.exercises.data.map(
      (c): Exercise => ({
        name: c.attributes.name,
        muscle: c.attributes.muscle,
        difficulty: c.attributes.difficulty,
        instructions: c.attributes.instructions,
        reps: c.attributes.reps,
        sets: c.attributes.sets,
        equipment: c.attributes.equipment,
        days: c.attributes.days,
        type: c.attributes.type,
        program: route.params.id,
      }),
    ) ?? [];

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const items: TabStatusItem[] = [
    {
      title: 'Add Workout',
      icon: {name: 'man-outline', type: 'ionicon', size: 20},
    },
    {
      title: 'Program List',
      icon: {name: 'list-outline', type: 'ionicon', size: 20},
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: colors.firstColor}}>
      <CreatePageHeaderStatus
        items={items}
        currentIndex={currentIndex}
        onIndexChange={index => setCurrentIndex(index)}
        loading={false}
      />
      {currentIndex === 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'relative',
          }}>
          <Body
            data={selectedParts.map(
              (d): BodyPart => ({color: 'cyan', slug: d, intensity: 1}),
            )}
            gender={selectedIndex === 0 ? 'male' : 'female'}
            side={isBack ? 'back' : 'front'}
            scale={1.45}
            backOnly={false}
            frontOnly={false}
            onBodyPartPress={b => {
              if (selectedParts.includes(b.slug)) {
                setSelectedParts(old => old.filter(o => o !== b.slug));
                setCurrentSelectedPart(undefined);
              } else {
                setSelectedParts(old => [...old, b.slug]);
                setCurrentSelectedPart(b.slug);
                setVisible(true);
              }
            }}
          />
          <View style={{position: 'absolute', right: 50, top: 50}}>
            <TouchableOpacity onPress={() => setIsBack(!isBack)}>
              <Icon
                style={{padding: 0, margin: 0}}
                name="autorenew"
                type="material"
                color={colors.secondColor}
                size={30}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              marginLeft: 'auto',
            }}>
            <ButtonGroup
              buttons={[
                <Icon
                  type="ionicon"
                  name="male-outline"
                  color={
                    selectedIndex === 0 ? colors.firstColor : colors.secondColor
                  }
                />,
                <Icon
                  type="ionicon"
                  name="female-outline"
                  color={
                    selectedIndex === 0 ? colors.secondColor : colors.firstColor
                  }
                />,
              ]}
              selectedIndex={selectedIndex}
              selectedButtonStyle={{
                backgroundColor: colors.secondColor,
              }}
              onPress={value => {
                setSelectedIndex(value);
              }}
              containerStyle={{
                marginBottom: 20,
                backgroundColor: colors.firstColor,
                borderColor: colors.secondColor,
              }}
            />
          </View>
        </View>
      )}

      {currentIndex === 1 && (
        <View style={{flex: 1, backgroundColor: colors.firstColor}}>
          <ScrollView>
            {Array.from(new Set(exercises?.flatMap(sd => sd.days))).map(
              (d, i) => (
                <View
                  key={i}
                  style={{
                    backgroundColor: colors.firstColor,
                    borderColor: colors.secondColor,
                    borderWidth: 2,
                    padding: 10,
                    margin: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      paddingBottom: 5,
                      textAlign: 'center',
                      color: colors.secondColor,
                    }}>
                    {d}
                  </Text>
                  <WorkoutList
                    key={d}
                    items={exercises
                      .filter(se => se.days.includes(d))
                      .flatMap(e => e)}
                    checkboxDisabled={true}
                    onSelected={() => {}}></WorkoutList>
                </View>
              ),
            )}
          </ScrollView>
        </View>
      )}

      {currentSelectedPart && visible && (
        <WorkoutListDialog
          slug={currentSelectedPart}
          visible={visible}
          programId={route.params.id}
          toggleDialog={type => {
            toggleDialog();

            if (type === 'cancel') {
              setSelectedParts(old =>
                old.filter(slug => slug !== currentSelectedPart),
              );
            }
          }}
          onSaved={() => {
            refetch();
          }}
        />
      )}
    </View>
  );
}

export default CreateProgramPage;
