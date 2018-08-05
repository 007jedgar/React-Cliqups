import {
  scale, moderateScale, verticalScale, ScaledSheet,
} from 'react-native-size-matters'


export const generalStyles = ScaledSheet.create({
  container: {
    flex: 1,
    // marginTop: '20@ms',
  },
  lightText: {
    color: '#fff',
    fontSize: '22@ms',
  },
  darkContainer: {
    flex: 1,
    marginTop: '20@ms',
    backgroundColor: '#000',
  }
})
