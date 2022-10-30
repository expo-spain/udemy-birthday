import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, {useState} from 'react'
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { validateEmail } from '../utils/validations'
import Toast from 'react-native-toast-message';

export default function LoginForm(props) {
    const {changeForm} = props;
    const [formData, setFormData] = useState(defaulValue());
    const [formError, setFormError] = useState({});

    const loginFirebase = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Login
            const user = userCredential.user;
            console.log(user);
            Toast.show({
                type: 'success',
                text1: 'Hola',
                text2: 'Te has logiado correctamente 👋'
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      }

      const login = () => {
        let errors = {};
        if (!formData.email || !formData.password) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
            if (!formData.repeatPassword) errors.repeatPassword = true;
        } 
        
        else if (!validateEmail(formData.email)) {
                errors.email = true;
                console.log("Email incorrecto");
        }
        
        else if (formData.password.length < 6) { 
            errors.password = true;
            errors.repeatPassword = true;
            console.log("Su contraseña es menor a 6 caracteres");
        } else {
            loginFirebase(formData.email, formData.password);
            console.log("Registrado");
        }
        setFormError(errors);
        console.log(errors);
      } 

    return (
        <>
      <TextInput style={[styles.input, formError.email && styles.error]}
            placeholder="Correo Electronico"
            placeholderTextColor="#969696"
            autoCapitalize='none'
            onChange={(e) => setFormData({...formData, email: e.nativeEvent.text})}
      />

    <TextInput style={[styles.input, formError.password && styles.error]}
            secureTextEntry={true}
            placeholder="Contraseña"
            placeholderTextColor="#969696"
            autoCapitalize='none'
            onChange={(e) => setFormData({...formData, password: e.nativeEvent.text})}
      />

   

     <TouchableOpacity onPress={login}>
                <Text style={styles.btnText}>Iniciar sección</Text>
      </TouchableOpacity>
      
      <View style={styles.login}>
        <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText}>Registrate</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

function defaulValue() {
    return {
      email: '', 
      password: '',
    }
  }


const styles = StyleSheet.create({
    btnText : {
        color: '#fff',
        fontSize: 18,
    },
    input : {
        height: 50,
        color: '#fff',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040'
    }
    ,
    login : {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30,
    },
    error : {
        borderColor: '#940c0c',
    }
})