import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const dimensions = {
  screenWidth: width,
  screenHeight: height,
  padding: 20,
  margin: 15,
  borderRadius: 10,
  iconSize: 24,
  fontSize: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 32,
  },
};
