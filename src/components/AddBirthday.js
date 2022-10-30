import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { db } from '../utils/firebase';
import { collection, addDoc, doc,  deleteDoc, onSnapshot, updateDoc } from "firebase/firestore";
import Toast from 'react-native-toast-message';


const AddBirthday = (props) => {
    const { user, setShowList } = props
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
    const handleConfirm = (date) => {
        const dateBirthday = date;
        dateBirthday.setHours(0);
        dateBirthday.setMinutes(0);
        dateBirthday.setSeconds(0);
        setFormData({...formData, dateBirthday});
        // console.log("A date has been picked: ", date);
        hideDatePicker();
      };    

      const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text});
        }

   const onSubmit = async () => {

        let errors = {};
        if (!formData.name || !formData.lastname || !formData.dateBirthday) {
            if (!formData.name) errors.name = true;
            if (!formData.lastname) errors.lastname = true;
            if (!formData.dateBirthday) errors.dateBirthday = true;
        }
        else {
            let data = formData;
            // data = {...data, user_id: user.uid};
            data.dateBirthday.setYear(0);
                try {
                    // const docRef = await addDoc(collection(db, "birthdays"), data);
                    const docRef = await addDoc(collection(db, user.uid), data);
                    Toast.show({
                        type: 'success',
                        text1: 'Felicidades',
                        text2: 'Se ha agregado correctamente 👋'
                      });
                      setShowList(true);
                } catch (e) {
                    console.error("Error adding document: ", e);
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: e.text
                      });
                }
            
        }
        setFormError(errors);
    }     

  return (
    <>
      <View style={styles.container}>
        <TextInput placeholder="Nombre" style={[styles.input, formError.name && styles.error]}
            placeholderTextColor="#969696"
            onChange={(e) => onChange(e, 'name')}
        />
        
        <TextInput placeholder="Apellidos" style={[styles.input, formError.lastname && styles.error]} 
            placeholderTextColor="#969696"
            onChange={(e) => onChange(e, 'lastname')}
        />

        <View style={[styles.input, styles.datepicker, formError.dateBirthday && styles.error]}>
            <Text
                onPress={showDatePicker} 
                style={{
                    color: formData.dateBirthday ? '#fff' : '#969696',
                    fontSize: 18,
                }}
                >
                {formData.dateBirthday ? moment(formData.dateBirthday).format('LL') : 
                'Fecha de nacimiento'}</Text>
        </View>
        
        <TouchableOpacity onPress={onSubmit}>
            <Text style={styles.addButton}>Crear cumpleaños</Text>
        </TouchableOpacity>

        
        <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        

      </View>
    </>
  )
}

export default AddBirthday

const styles = StyleSheet.create({
    container : {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        with: '100%',
    },
    input :{
        height: 50,
        color: '#fff',
        minWidth: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040',
        textAlign: 'center'
    },
    datepicker : {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton : {
        fontSize: 18,
        color: '#fff',
    },
    error : {
        borderColor: '#940c0c',
    }
})