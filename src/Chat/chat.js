import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import style from './style';

function Chat(props) {
  const [readmessage, getMessage] = useState({});
  useEffect(() => {
    const dataRef = database()
      .ref('/users')
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());
        let data = snapshot.val();
        console.log(Object.values(data));
        getMessage({...readmessage, data});
      });
    return () => database().ref('/users').off('value', dataRef);
  }, []);
  const [usermessage, setMessage] = useState([]);
  const {email, id} = props.route.params;
  function sendMessage(message) {
    database()
      .ref('/users/' + message[0]._id)
      .set(message[0])
      .then(() => console.log('Data set.'));
    setMessage(message);
    console.log(message);
  }
  let done = [];
  for (let key in readmessage) {
    done.push('_id:' + readmessage[key]);
    console.log('Rodjdkfjhfkjfh', readmessage[key]._id);
  }
  console.log('Warn', done);
  return (
    <View style={style.container}>
      <GiftedChat
        onSend={sendMessage}
        messages={usermessage}
        user={{_id: id}}
      />
    </View>
  );
}
export default Chat;
