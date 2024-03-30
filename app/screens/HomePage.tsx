import {Button, Dialog, Icon, Input, ListItem, color} from '@rneui/base';
import * as React from 'react';
import {View, ScrollView} from 'react-native';
import {GET_PROGRAMS} from '../logic/graphql/queries/getPrograms';
import {Items} from '../types/strapi/base/base';
import {useMutation, useQuery} from '@apollo/client';
import {CREATE_PROGRAM} from '../logic/graphql/mutations/createProgram';
import colors from '../styles/colors';
import {DELETE_PROGRAM} from '../logic/graphql/deletions/deleteProgram';

export interface HomeProps {
  props?: HomeProps;
  navigation: any;
}

export function HomePage({props: HomeProps, navigation}: HomeProps) {
  const {data, refetch} = useQuery<{programs: Items<any>}>(GET_PROGRAMS);

  const programs = data?.programs.data;
  const [visible, setVisible] = React.useState(false);
  const [createProgram, {loading}] = useMutation(CREATE_PROGRAM);
  const [deleteProgram, {loading: loadingDelete}] = useMutation(DELETE_PROGRAM);
  const [program, setProgram] = React.useState<Program | null>();

  const saveProgram = async () => {
    createProgram({
      variables: {
        data: {...program, publishedAt: new Date()},
      },
    });
  };

  const removeProgram = async (id: number) => {
    deleteProgram({
      variables: {
        id,
      },
    });
  };

  return (
    <>
      <ScrollView
        style={{
          padding: 10,
          paddingTop: 20,
          backgroundColor: colors.firstColor,
        }}>
        {programs?.map((p, i) => (
          <ListItem.Swipeable
            containerStyle={{
              borderRadius: 5,
              padding: 10,
              height: 80,
              marginBottom: 10,
              backgroundColor: colors.secondColor,
            }}
            key={i}
            rightContent={reset => (
              <View style={{alignItems: 'center'}}>
                <Button
                  onPress={() => {
                    reset();
                    removeProgram(+p.id);
                    refetch();
                  }}
                  icon={{name: 'delete', color: colors.secondColor, size: 26}}
                  buttonStyle={{
                    backgroundColor: colors.firstColor,
                    height: 80,
                  }}
                />
              </View>
            )}>
            <ListItem.Content>
              <ListItem.Title
                style={{
                  color: colors.firstColor,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                {p.attributes.name}
              </ListItem.Title>
            </ListItem.Content>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Button
                type="clear"
                size="sm"
                onPress={() => {
                  navigation.navigate('Create Program', {id: p.id});
                }}
                icon={
                  <Icon
                    name="edit"
                    type="material"
                    size={30}
                    color={colors.firstColor}
                  />
                }></Button>
              <Button
                type="clear"
                size="sm"
                onPress={() => {}}
                icon={
                  <Icon
                    name="play-circle-filled"
                    type="material"
                    size={34}
                    color={colors.firstColor}
                  />
                }></Button>
            </View>
          </ListItem.Swipeable>
        ))}
      </ScrollView>

      <Dialog
        overlayStyle={{
          borderRadius: 16,
          backgroundColor: colors.firstColor,
          width: '96%',
          height: 210,
        }}
        isVisible={visible}
        onBackdropPress={() => {
          setVisible(false);
          setProgram(null);
        }}>
        <Dialog.Title
          title={'New Program'}
          titleStyle={{color: colors.secondColor, textAlign: 'center'}}
        />

        <Input
          value={program?.name}
          onChangeText={value => setProgram({name: value, active: true})}
          autoFocus
          placeholder="Title"
          style={{width: '100%'}}
          placeholderTextColor={colors.secondColor}
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
                  gap: 12,
                }}>
                <Button
                  title="CANCEL"
                  titleStyle={{color: colors.secondColor}}
                  buttonStyle={{borderColor: colors.secondColor}}
                  type="outline"
                  onPress={() => {
                    setVisible(false);
                    setProgram(null);
                  }}
                />
                <Button
                  title="CONFIRM"
                  type="outline"
                  titleStyle={{color: colors.secondColor}}
                  buttonStyle={{borderColor: colors.secondColor}}
                  onPress={async () => {
                    await saveProgram();
                    setVisible(false);
                    refetch();
                    setProgram(null);
                  }}
                />
              </View>
            </View>
          }></Dialog.Actions>
      </Dialog>
      <View
        style={{position: 'absolute', bottom: 5, width: '100%', padding: 10}}>
        <Button
          color={colors.secondColor}
          onPress={() => {
            setVisible(true);
          }}
          icon={
            <Icon
              name="add"
              type="material"
              size={34}
              color={colors.firstColor}
            />
          }></Button>
      </View>
    </>
  );
}
