import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import React,  { useState, useEffect } from 'react'
import ActionBar from './ActionBar'
import AddBirthday from './AddBirthday'
import { db } from '../utils/firebase';
import moment from 'moment';
import { collection, addDoc, doc, orderBy,  deleteDoc, onSnapshot, updateDoc } from "firebase/firestore";
import Birthday from './Birthday';


const ListBirthday = (props) => {
  const { user } = props;
  const [showList, setShowList] = useState(true);
  const [birthdays, setBirthdays] = useState([]);
  const [ pasatBirthday, setPasatBirthday] = useState([]);

  // console.log(birthdays);

  useEffect(() => {
    setBirthdays([]);
    // Cumpleaños pasados
    setPasatBirthday([]);

    onSnapshot(collection(db, user.uid), 
               orderBy('dateBirthday', 'asc'),
               (querySnapshot) => {
                  const result = [];
                  querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    result.push(data);
                  });
                  formatData(result);
                }
    );
  }, [])

  const deleteBirthday = (birthday) => {
    Alert.alert(
      'Eliminar cumpleaños',
      `¿Estás seguro de eliminar el cumpleaños de ${birthday.name} ${birthday.lastname}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, user.uid, birthday.id));
            } catch (e) {
              console.error("Error removing document: ", e);
            }
          }
        }
      ],
      { cancelable: false }
    );
  }


  const formatData = (items) => { 
     // 1- Obtenemos la fecha actual, formateando las horas en 0
      const currentDate = moment().set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });

      // 2- Recorremos el array de cumpleaños
      const birthdayTempArray = [];
      

      // 3- Arreglo Temporal con fechas pasadas
      const birthdayTempArrayPast = [];

      items.forEach((item) => {
          const dateBirthday = new Date(item.dateBirthday.seconds * 1000);
          const dateBirthdayFormated = moment(dateBirthday);
          const currentYear = moment().get('year');
          dateBirthdayFormated.set({year: currentYear});

          const diffDate = currentDate.diff(dateBirthdayFormated, 'days');
          const itemTemp = item;
          itemTemp.dateBirthday = dateBirthdayFormated;
          itemTemp.days = diffDate;

          if (diffDate <= 0) {
            // Es un cumpleaños futuro
            birthdayTempArray.push(itemTemp);
          } else {
            // Es un cumpleaños anterior
            birthdayTempArrayPast.push(itemTemp);
          }
      });
      setBirthdays(birthdayTempArray);
      setPasatBirthday(birthdayTempArrayPast);
  }

  return (
    <View style={styles.container}>
      {showList ? (
        <ScrollView style={styles.scrollView}>
          {birthdays.map((item, index) => (
              <Birthday key={index} birthday={item} user={user} deleteBirthday={deleteBirthday}/>
          ))}
          {pasatBirthday.map((item, index) => (
              <Birthday key={index} birthday={item} user={user} deleteBirthday={deleteBirthday}/>
          ))}
        </ScrollView>  
      
      ) : <AddBirthday user={user}  setShowList={setShowList}/>}
    
     <ActionBar showList={showList}
                setShowList={setShowList}/>
     </View>
  )
}

export default ListBirthday

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%'
    },
    scrollView : {
        marginBottom: 120,
        width: '100%'
    }
})