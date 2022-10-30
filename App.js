import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import { auth } from './src/utils/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Auth from './src/components/Auth';
import Toast from 'react-native-toast-message';

export default function App() {
  const [user, setUser] = useState(undefined);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      setUser(response);
    });
  }, [])

  if (user === undefined) return null;
  

  return (
    <>
      <StatusBar  barStyle="light-content"  />
      <SafeAreaView style={styles.background}>
          {user ? <Logout /> : <Auth/>}
      </SafeAreaView>
      <Toast />
    </>
  );
}


function Logout() {
  const logout = () => {
    auth.signOut();
  }

  return (
    <View>
      <Text>Logout</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Cerrar Sesion</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({ 
     background : {
          backgroundColor: '#15212b',
          height: '100%'
     }
});