import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useState} from 'react';
import {Icon} from '@rneui/themed';
import {useEffect} from 'react';
import {Pressable} from 'react-native';
import {TabStatusItem} from '../types/tab-status-item';
import colors from '../styles/colors';

interface TabStatusProps {
  items: TabStatusItem[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  loading: boolean;
}

const CreatePageHeaderStatus = (props: TabStatusProps) => {
  const [items, setItems] = useState<TabStatusItem[]>([]);

  const processWithEffect = () => {
    const value = 100 / items.length;
    const index = (props.currentIndex + 1) * value;
    const widthString = `${index}%`;
  };

  useEffect(() => {
    processWithEffect();
  }, [items, props.currentIndex]);

  useEffect(() => {
    setItems(props.items);
    processWithEffect();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          props.loading ? null : props.onIndexChange(props.currentIndex - 1)
        }
        style={{
          position: 'absolute',
          left: 5,
          padding: 10,
          zIndex: 1,
        }}></Pressable>
      {items.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => {
            props.onIndexChange(index);
          }}
          style={[
            styles.pressableItem,
            index === props.currentIndex ? styles.active : null,
            {
              borderBottomLeftRadius: index === 0 ? 5 : 0,
              borderBottomRightRadius: index === items.length - 1 ? 5 : 0,
            },
          ]}>
          <View style={{flex: 1, alignItems: 'center', padding: 10}}>
            <Text
              style={{
                color:
                  props.currentIndex === index
                    ? colors.secondColor
                    : colors.secondColorOpacity,
                fontWeight: props.currentIndex === index ? 'bold' : 'normal',
              }}>
              {item.title}
            </Text>
            <Icon
              name={item.icon.name}
              type={item.icon.type}
              color={
                props.currentIndex === index
                  ? colors.secondColor
                  : colors.secondColorOpacity
              }
              size={item.icon.size}
            />
          </View>
        </Pressable>
      ))}
      <View style={{position: 'absolute', alignSelf: 'center', right: '48%'}}>
        <Icon
          name="arrow-right"
          type="feather"
          color={colors.secondColor}
          size={25}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.firstColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    borderWidth: 1,
    borderColor: colors.secondColor,
  },
  active: {
    borderBottomWidth: 5,
    borderBottomColor: colors.secondColor,
  },
  pressableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
});

export default CreatePageHeaderStatus;
