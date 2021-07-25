import React, {useState} from 'react';
import {ActivityIndicator, Button, View} from 'react-native';
import CustomInput from '../../Components/CustomInput';
import Strings from '../../Constants/string';
import style from './style';
import auth from '@react-native-firebase/auth';
function Progress({showHide}) {
  if (showHide) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  } else {
    return null;
  }
}
function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [progress, setProgress] = useState(false);
  function onChangeUsername(message) {
    return setUsername(message);
  }
  function onChangePassword(message) {
    return setPassword(message);
  }
  function authUser() {
    setProgress(true);
    auth()
      .signInWithEmailAndPassword(username, password)
      .then(res => {
        console.log('User account created & signed in!', res);
        setProgress(false);
        props.navigation.navigate('NewChat', {
          email: res.user.email,
          id: res.user.uid,
        });
      })
      .catch(error => {
        setProgress(false);
        console.log(error);
      });
  }

  return (
    <View style={style.container}>
      <CustomInput
        placeholder={Strings.Login.login}
        onChangeText={onChangeUsername}
      />
      <CustomInput
        placeholder={Strings.Login.password}
        onChangeText={onChangePassword}
      />
      <Button title={Strings.Login.title} onPress={authUser} />
      <Progress showHide={progress} />
    </View>
  );
}
export default Login;
