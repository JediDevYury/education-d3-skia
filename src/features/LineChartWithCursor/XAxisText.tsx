import {Text, useFont} from '@shopify/react-native-skia';
import React from 'react';
import {View} from "react-native";

type Props = {
  x: number;
  y: number;
  text: string;
}

const XAxisText = ({x, y, text} : Props) => {
  const font = useFont(require('../../assets/fonts/Roboto-Regular.ttf'), 18);

  if(!font) {
    return null;
  }

  const fontSize = font.measureText(text)

  return (
   <Text
    text={text}
    color={"white"}
    x={x - fontSize.width / 2}
    y={y}
   />
  );
};


export default XAxisText;
