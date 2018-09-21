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

// FORM STYLING
const formStyle1 = _.cloneDeep(t.form.Form.stylesheet);
//Textinput styling
formStyle1.textbox.normal.borderWidth = 0;
formStyle1.textbox.error.borderWidth = 0;
formStyle1.textbox.normal.marginBottom = 0;
formStyle1.textbox.error.marginBottom = 0;
formStyle1.textbox.normal.marginBottom = moderateScale(5);
formStyle1.textbox.error.marginBottom = moderateScale(5);

formStyle1.textbox.normal.fontSize = moderateScale(23);
formStyle1.textbox.error.fontSize = moderateScale(23);
formStyle1.textbox.normal.color = '#fff';
formStyle1.textbox.error.color = 'orange';

//Entry label styling
formStyle1.controlLabel.normal.color = 'dimgrey';
formStyle1.controlLabel.error.color = 'orange';
formStyle1.controlLabel.normal.marginLeft = moderateScale(5);
formStyle1.controlLabel.error.marginLeft = moderateScale(5);

//Outside textbox view styling
formStyle1.textboxView.normal.borderWidth = 0;
formStyle1.textboxView.error.borderWidth = 0;
formStyle1.textboxView.normal.borderRadius = 0;
formStyle1.textboxView.error.borderRadius = 0;
formStyle1.textboxView.normal.borderBottomWidth = moderateScale(4);
formStyle1.textboxView.error.borderBottomWidth = moderateScale(4);

formStyle1.textboxView.normal.borderColor = 'dimgrey';
formStyle1.textboxView.error.borderColor = 'orange';

export {formStyle, formStyle1};
