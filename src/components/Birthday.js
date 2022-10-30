import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Birthday = ({key, birthday,user, deleteBirthday}) => {
  // Saber si el cumpleaños es de este año o del año pasado  
  const pasat = birthday.days > 0 ? true : false;
  const infoDay = () => {
    if (birthday.days === 0) {
      return (
        <Text style={styles.info}>Es su cumpleaños</Text>
      )
    } else {
      return (
        <Text style={styles.info}>Faltan {birthday.days*-1} días</Text>
      )
    }
  }

  return (
    <TouchableOpacity
        onPress={() => deleteBirthday(birthday)}
        key={key} style={[styles.card, 
        pasat 
            ? styles.pasat 
            : birthday.days === 0
            ? styles.actual
            : styles.current
    ]}>
      <Text style={styles.userName}>
            {birthday.name}  {birthday.lastname} 
      </Text>
      {pasat 
            ? <Text style={{ color: "#fff"}}>Pasado</Text> 
            : <Text style={{ color: "#fff"}}>{infoDay(pasat)}</Text> 
      }
    </TouchableOpacity>
  )
}

export default Birthday

const styles = StyleSheet.create({
    card : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 10,
    },
    pasat : {
        backgroundColor: '#820000',
    },
    current : { 
        backgroundColor: '#1ea1f2',
    },
    actual : { 
        backgroundColor: '#559204',
    },
    userName : {
        color: '#fff',
        fontSize: 16,
    }
})