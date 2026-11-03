# React Native Circular Action Menu (TypeScript)

A customizable circular action menu component for React Native CLI, written in TypeScript and TSX.

This library allows you to create expandable circular menus with animated action buttons.

## Fork & Credits

This project is forked from the original JavaScript implementation:

**Original repository:**  
https://github.com/geremih/react-native-circular-action-menu

The original implementation was converted to TypeScript (TSX), with TypeScript interfaces and component typings to improve compatibility with React Native TypeScript projects.

All credit for the original implementation and concept goes to the original author.

## Features

- Circular expandable action menu.
- Animated menu buttons.
- Customizable menu position.
- Customizable button size and colors.
- Configurable animation radius and angles.
- Custom icons and React components.
- TypeScript support.
- Supports `ActionButton.Item` syntax.

## Installation

```bash
npm install react-native-cli-circular-action-menu
```

Or:

```bash
yarn add react-native-cli-circular-action-menu
```

## Usage

Import the component:

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import ActionButton from 'react-native-cli-circular-action-menu';
```

Basic example:

```tsx
export default function App() {
  return (
    <View style={{ flex: 1 }}>

      <ActionButton
        position="center"
        radius={100}
        size={60}
        itemSize={50}
        buttonColor="#000000"
        btnOutRange="#000000"
      >

        <ActionButton.Item
          buttonColor="#101014"
          title="Food"
          onPress={() => console.log('Food pressed')}
        >
          <Text style={{ color: '#fff', fontSize: 25 }}>
            🍴
          </Text>
        </ActionButton.Item>

        <ActionButton.Item
          buttonColor="#101014"
          title="Exercise"
          onPress={() => console.log('Exercise pressed')}
        >
          <Text style={{ color: '#fff', fontSize: 25 }}>
            🏃
          </Text>
        </ActionButton.Item>

        <ActionButton.Item
          buttonColor="#101014"
          title="Profile"
          onPress={() => console.log('Profile pressed')}
        >
          <Text style={{ color: '#fff', fontSize: 25 }}>
            👤
          </Text>
        </ActionButton.Item>

      </ActionButton>

    </View>
  );
}
```

## Props

### ActionButton

| Property | Type | Default | Description |
|---|---|---|---|
| `position` | `'left' \| 'center' \| 'right'` | `'center'` | Menu alignment |
| `radius` | `number` | `100` | Distance of action buttons from the main button |
| `size` | `number` | `63` | Main button size |
| `itemSize` | `number` | `36` | Action button size |
| `buttonColor` | `string` | `'rgba(0,0,0,1)'` | Main button color |
| `btnOutRange` | `string` | `'rgba(0,0,0,1)'` | Main button animated color |
| `bgColor` | `string` | `'transparent'` | Background color |
| `startDegree` | `number` | Position dependent | Starting angle |
| `endDegree` | `number` | Position dependent | Ending angle |
| `autoInactive` | `boolean` | `true` | Automatically close after selecting an item |
| `active` | `boolean` | `false` | Initial active state |
| `icon` | `ReactNode` | `undefined` | Main button icon |
| `onPress` | `() => void` | Empty function | Main button press callback |
| `onOverlayPress` | `() => void` | Empty function | Overlay press callback |
| `degrees` | `number` | `135` | Main button rotation |
| `outRangeScale` | `number` | `1` | Main button scale when active |
| `backdrop` | `ReactNode` | `false` | Optional backdrop content |

### ActionButton.Item

| Property | Type | Default | Description |
|---|---|---|---|
| `buttonColor` | `string` | `'#101014'` | Action button background color |
| `radius` | `number` | `100` | Distance from the main button |
| `onPress` | `() => void` | Empty function | Action button press callback |
| `children` | `ReactNode` | Required | Button content |
| `activeOpacity` | `number` | `0.85` | Touchable opacity |

## Custom Icons

You can use any React Native component as the button icon.

For example, with FontAwesome:

```tsx
import Icon from 'react-native-vector-icons/FontAwesome';

<ActionButton.Item
  buttonColor="#101014"
  onPress={() => console.log('Settings')}
>
  <Icon name="cog" size={25} color="#fff" />
</ActionButton.Item>
```

## Development

Clone the repository:

```bash
git clone https://github.com/M4090/react-native-cli-circular-action-menu.git

cd react-native-cli-circular-action-menu
```

Install dependencies:

```bash
npm install
```

Build the TypeScript source:

```bash
npm run build
```

Compiled files and TypeScript declarations are generated in the `dist/` directory.

## TypeScript

The library is written in:

- TypeScript (`.ts`)
- TypeScript JSX (`.tsx`)

Type definitions are generated automatically during the build process.

## License

Please refer to the original repository's license:

https://github.com/geremih/react-native-circular-action-menu

This fork retains attribution to the original project. Check the original license terms before redistributing.

## Credits

Original project:  
https://github.com/geremih/react-native-circular-action-menu

TypeScript conversion and maintenance:  
Your contributions are welcome!

