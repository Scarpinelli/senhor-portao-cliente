#fix expo 46

node_modules/react-native/index.js

replace line 436

get ColorPropType(): $FlowFixMe {
console.warn('');
return require('deprecated-react-native-prop-types').ColorPropType;
},

get EdgeInsetsPropType(): $FlowFixMe {
console.warn('');
return require('deprecated-react-native-prop-types').EdgeInsetsPropType;
},

get PointPropType(): $FlowFixMe {
console.warn('');
return require('deprecated-react-native-prop-types').PointPropType;
},

get ViewPropTypes(): $FlowFixMe {
console.warn('');
return require('deprecated-react-native-prop-types').ViewPropTypes;
},
