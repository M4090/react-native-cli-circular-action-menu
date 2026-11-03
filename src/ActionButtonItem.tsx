import React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';

export interface ActionButtonItemProps {
  children: React.ReactNode;
  radius?: number;
  angle?: number;
  anim?: Animated.Value;
  size?: number;
  buttonColor?: string;
  onPress?: () => void;
  startDegree?: number;
  endDegree?: number;
  activeOpacity?: number;
  style?: ViewStyle;
}

const ActionButtonItem: React.FC<ActionButtonItemProps> = ({
  children,
  radius = 100,
  angle = 0,
  anim,
  size = 36,
  buttonColor = '#101014',
  onPress = () => {},
  activeOpacity = 0.85,
  style,
}) => {
  const animation = anim ?? new Animated.Value(1);
  const offsetX = radius * Math.cos(angle);
  const offsetY = radius * Math.sin(angle);

  return (
    <Animated.View
      style={[
        {
          opacity: animation,
          width: size,
          height: size,
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, offsetY],
              }),
            },
            {
              translateX: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, offsetX],
              }),
            },
            {
              scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
        },
        style,
      ]}
    >
      <TouchableOpacity
        style={styles.touchable}
        activeOpacity={activeOpacity}
        onPress={onPress}
      >
        <View style={[styles.shadowContainer, { width: size, height: size, borderRadius: size / 2 }]}>
          <View
            style={[
              styles.actionButton,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: buttonColor,
              },
            ]}
          >
            {children}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  shadowContainer: {
    flex: 1,
    backgroundColor: '#101014',
    elevation: 20,
    shadowColor: '#1146f5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 2,
  },
});

export default ActionButtonItem;
