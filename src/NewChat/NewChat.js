import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Button,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

function NewChat(props) {
  const {email, id} = props.route.params;
  const [messageData, setData] = useState([]);
  const [data, setUsers] = useState({});
  const [receiver, receiverUsers] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setUsers(users);
      });

    return () => subscriber();
  }, []);

  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('souravs853@gmail.com')
  //     .onSnapshot(querySnapshot => {
  //       const use = [];

  //       querySnapshot.forEach(documentSnapshot => {
  //         use.push({
  //           ...documentSnapshot.data(),
  //           key: documentSnapshot.id,
  //         });
  //       });
  //       receiverUsers(use);
  //     });

  //   return () => subscriber();
  // }, []);
  function onChangeText(value) {
    console.log(value);
    setData(value);
  }

  function sendMessage() {
    console.log('Done');
    firestore()
      .collection('Users')
      .doc(new Date() + '')
      .set({
        message: messageData,
        email: email,
      })
      .then(() => {
        console.log('User added!');
      });
  }
  console.log(messageData);
  console.log(data);

  return (
    <View style={Styles.container}>
      <View style={Styles.chatContainer}>
        <FlatList
          data={data}
          keyExtractor={item => item.key}
          renderItem={({item, index}) => {
            return (
              <>
                {item.email === email && (
                  <View style={Styles.userMessageContainer}>
                    {/* <View style={Styles.timeContainer}>
                      <Text style={Styles.time}>{item.time}</Text>
                    </View> */}
                    <View style={Styles.message}>
                      <View style={Styles.userProfileContainer}>
                        <Image
                          style={Styles.userProfile}
                          source={{
                            uri: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
                          }}
                        />
                      </View>
                      <View style={Styles.textContainer}>
                        <Text style={Styles.text}>{item.message}</Text>
                      </View>
                    </View>
                  </View>
                )}
                {item.email !== email && (
                  <View style={Styles.userReceiverMessageContainer}>
                    <View style={Styles.timeContainer}>
                      <Text style={Styles.time}>{item.time}</Text>
                    </View>
                    <View style={Styles.receiverMessage}>
                      <View style={Styles.receiverUserProfileContainer}>
                        <Image
                          style={Styles.userProfile}
                          source={{
                            uri: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
                          }}
                        />
                      </View>
                      <View style={Styles.receivertextContainer}>
                        <Text style={Styles.text}>{item.message}</Text>
                      </View>
                    </View>
                  </View>
                )}
              </>
            );
          }}
        />
      </View>
      <View style={Styles.inputContainer}>
        <TextInput
          style={Styles.inputStyle}
          placeholder={'Type message...'}
          placeholderTextColor="grey"
          onChangeText={onChangeText}
        />
        <Button title={'Send'} onPress={sendMessage} />
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  inputStyle: {
    backgroundColor: '#fff',
    width: '80%',
    marginBottom: 8,
    padding: 10,
    elevation: 5,
  },
  chatContainer: {
    flex: 90,
    marginRight: 8,
  },
  userMessageContainer: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
  },
  timeContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  time: {color: 'grey'},
  message: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 10,
  },
  userProfileContainer: {
    position: 'absolute',
    marginLeft: -12,
    marginTop: -16,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 4,
  },
  userProfile: {
    width: 30,
    height: 30,
    borderRadius: 8,
  },
  textContainer: {
    alignItems: 'flex-start',
    marginLeft: 12,
  },
  text: {color: '#fff'},
  inputContainer: {
    flex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userReceiverMessageContainer: {
    margin: 16,
    borderRadius: 5,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
  },
  receiverMessage: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    flex: 1,
    alignSelf: 'flex-end',
    elevation: 10,
  },
  receivertextContainer: {
    marginRight: 30,
  },
  receiverUserProfileContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: -16,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 4,
  },
});
export default NewChat;
