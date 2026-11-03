import React, {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import ActionButtonItem, {
  type ActionButtonItemProps,
} from './ActionButtonItem';

export type ActionButtonPosition = 'left' | 'center' | 'right';

export interface ActionButtonProps {
  children?: ReactNode;
  position?: ActionButtonPosition;
  startDegree?: number;
  endDegree?: number;
  radius?: number;
  icon?: ReactNode;
  size?: number;
  itemSize?: number;
  buttonColor?: string;
  btnOutRange?: string;
  buttonTextColor?: string;
  btnOutRangeTxt?: string;
  bgColor?: string;
  autoInactive?: boolean;
  active?: boolean;
  onPress?: () => void;
  onOverlayPress?: () => void;
  onLongPress?: () => void;
  backdrop?: ReactNode;
  degrees?: number;
  outRangeScale?: number;
  style?: StyleProp<ViewStyle>;
}

const positionDefaults: Record<
  ActionButtonPosition,
  { alignItems: 'center' | 'flex-start' | 'flex-end'; startDegree: number; endDegree: number }
> = {
  center: { alignItems: 'center', startDegree: 180, endDegree: 360 },
  left: { alignItems: 'flex-start', startDegree: 270, endDegree: 360 },
  right: { alignItems: 'flex-end', startDegree: 180, endDegree: 270 },
};

const ActionButtonRoot: React.FC<ActionButtonProps> = ({
  children,
  position = 'center',
  startDegree,
  endDegree,
  radius = 100,
  icon,
  size = 63,
  itemSize = 36,
  buttonColor = 'rgba(0,0,0,1)',
  btnOutRange = 'rgba(0,0,0,1)',
  buttonTextColor = 'rgba(255,255,255,1)',
  btnOutRangeTxt = 'rgba(255,255,255,1)',
  bgColor = 'transparent',
  autoInactive = true,
  active: initiallyActive = false,
  onPress = () => {},
  onOverlayPress = () => {},
  onLongPress,
  backdrop = false,
  degrees = 135,
  outRangeScale = 1,
  style,
}) => {
  const [active, setActive] = useState(initiallyActive);
  const anim = useRef(new Animated.Value(initiallyActive ? 1 : 0)).current;
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  const animateTo = useCallback(
    (toValue: 0 | 1) => {
      Animated.spring(anim, {
        toValue,
        useNativeDriver: false,
        speed: 20,
        bounciness: 4,
      }).start();
      setActive(toValue === 1);
    },
    [anim],
  );

  const toggle = useCallback(() => {
    if (active) {
      animateTo(0);
    } else {
      animateTo(1);
    }
  }, [active, animateTo]);

  const handleMainPress = () => {
    onPress();
    if (children) toggle();
  };

  const alignment = positionDefaults[position];
  const actualStart = startDegree ?? alignment.startDegree;
  const actualEnd = endDegree ?? alignment.endDegree;

  const renderedItems = useMemo(() => {
    const childArray = Children.toArray(children);
    const count = childArray.length;
    const start = (actualStart * Math.PI) / 180;
    const end = (actualEnd * Math.PI) / 180;
    const step = count > 1 ? (end - start) / (count - 1) : 0;

    return childArray.map((child, index) => {
      if (!isValidElement(child)) return null;

      const childElement = child as ReactElement<ActionButtonItemProps>;
      const originalOnPress = childElement.props.onPress;

      return (
        <View key={childElement.key ?? index} pointerEvents="box-none" style={styles.actionContainer}>
          {cloneElement(childElement, {
            radius,
            size: itemSize,
            anim,
            angle: start + index * step,
            onPress: () => {
              originalOnPress?.();
              if (autoInactive) {
                timeout.current = setTimeout(() => animateTo(0), 200);
              }
            },
          })}
        </View>
      );
    });
  }, [children, actualStart, actualEnd, radius, itemSize, anim, autoInactive, animateTo]);

  const buttonBackground = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [buttonColor, btnOutRange],
  });
  const buttonScale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, outRangeScale],
  });
  const buttonRotation = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', `${degrees}deg`],
  });

  return (
    <View pointerEvents="box-none" style={[styles.overlay, style]}>
      {active && (
        <TouchableWithoutFeedback
          onPress={() => {
            animateTo(0);
            onOverlayPress();
          }}
        >
          <Animated.View
            style={[
              styles.backdrop,
              {
                backgroundColor: bgColor,
                opacity: anim,
              },
            ]}
          >
            {backdrop}
          </Animated.View>
        </TouchableWithoutFeedback>
      )}

      {active && renderedItems}

      <View pointerEvents="box-none" style={[styles.actionContainer, { alignItems: alignment.alignItems }]}>
        <TouchableOpacity
          activeOpacity={0.85}
          onLongPress={onLongPress}
          onPress={handleMainPress}
        >
          <Animated.View
            style={[
              styles.mainButton,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: buttonBackground,
                transform: [{ scale: buttonScale }, { rotate: buttonRotation }],
              },
            ]}
          >
            {icon ?? (
              <Animated.Text
                style={[
                  styles.buttonText,
                  {
                    color: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [buttonTextColor, btnOutRangeTxt],
                    }),
                  },
                ]}
              >
                +
              </Animated.Text>
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ActionButton = Object.assign(ActionButtonRoot, {
  Item: ActionButtonItem,
});

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'transparent',
  },
  backdrop: {
	...StyleSheet.absoluteFill,
  },
  actionContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 10,
  },
  mainButton: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#1146f5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    zIndex: 10,
  },
  buttonText: {
    marginTop: -4,
    fontSize: 24,
    backgroundColor: 'transparent',
  },
});

export default ActionButton;
