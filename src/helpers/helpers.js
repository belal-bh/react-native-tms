import {CommonActions} from '@react-navigation/native';

export const wait = seconds => {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

export const dateToString = date => {
  try {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = String(date.getFullYear());

    const dateStr = dd + '/' + mm + '/' + yyyy.slice(2, 4);
    return dateStr;
  } catch (err) {
    console.log('💥💥💥 ERROR: ', err);
    return '';
  }
};

export const resetToScreen = (navigation, screenName) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: screenName}],
    }),
  );
};
