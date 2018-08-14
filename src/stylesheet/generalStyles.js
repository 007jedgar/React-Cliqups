import {
  scale, moderateScale, verticalScale, ScaledSheet,
} from 'react-native-size-matters'


export const generalStyles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  lightText: {
    color: '#fff',
    fontSize: '22@ms',
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    color: '#fff',
    fontSize: '30@ms',
    fontWeight: '800',
    marginLeft: '10@ms',
  },
})
