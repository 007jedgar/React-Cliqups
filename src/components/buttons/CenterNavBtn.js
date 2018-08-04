import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from 'react-native-size-matters';

const CenterNavBtn = ({ children, style, imagePath, title, onPress, bla }) => {
  const { imageStyle, titleStyle, containerStyle, imgViewStyle, imgStyle2, viewStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={viewStyle}>
      <View style={containerStyle}>
        <Image
          source={imagePath}
          style={imageStyle}
        />
        <Text style={titleStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  imageStyle: {
    width: '50@s',
    height: '50@vs',
    marginLeft: '10@s',
  },
  titleStyle: {
    fontSize: '25@ms',
    fontFamily: 'Roboto-Bold',
    color: 'grey',
    alignSelf: 'center',
    marginLeft: '20@s',
  },
  containerStyle: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginLeft: '30@s'
  },
  imgViewStyle: {
    alignSelf: 'center',
    marginRight: '10@s',
  },
  viewStyle: {
    flexDirection: 'column',
    flex: .250,
    justifyContent: 'center',
  },
});

export { CenterNavBtn };
