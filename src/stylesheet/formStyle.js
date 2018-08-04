var t = require('tcomb-form-native');
var Form = t.form.Form;
var _ = require('lodash');
import {
  ScaledSheet, moderateScale, scale, verticalScale,
} from 'react-native-size-matters';

// FORM STYLING
const formStyle = _.cloneDeep(t.form.Form.stylesheet);
//Textinput styling
formStyle.textbox.normal.borderWidth = 0;
formStyle.textbox.error.borderWidth = 0;
formStyle.textbox.normal.marginBottom = 0;
formStyle.textbox.error.marginBottom = 0;
formStyle.textbox.normal.marginBottom = moderateScale(5);
formStyle.textbox.error.marginBottom = moderateScale(5);

formStyle.textbox.normal.fontSize = moderateScale(23);
formStyle.textbox.error.fontSize = moderateScale(23);
formStyle.textbox.normal.color = '#fff';
formStyle.textbox.error.color = '#fff';

//Entry label styling
formStyle.controlLabel.normal.color = '#fff';
formStyle.controlLabel.error.color = 'orange';
formStyle.controlLabel.normal.marginLeft = moderateScale(5);
formStyle.controlLabel.error.marginLeft = moderateScale(5);

//Outside textbox view styling
formStyle.textboxView.normal.borderWidth = 0;
formStyle.textboxView.error.borderWidth = 0;
formStyle.textboxView.normal.borderRadius = 0;
formStyle.textboxView.error.borderRadius = 0;
formStyle.textboxView.normal.borderBottomWidth = moderateScale(4);
formStyle.textboxView.error.borderBottomWidth = moderateScale(4);

formStyle.textboxView.normal.borderColor = '#fff';
formStyle.textboxView.error.borderColor = '#fff';

export {formStyle};
