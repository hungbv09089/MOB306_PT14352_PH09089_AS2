import React,{useState} from 'react';
import {View, StyleSheet,Button,Modal,Text, TextInput,TouchableOpacity,ImageBackground} from 'react-native';
import LoadBook from './filebook';

export default function Login(){
  
const [name,setname]=useState('');
const [age,setAge]  =useState('');
const [showModal,setShowModal]=useState(true);
var enablebutton=true;
const checkLogin=()=>{
    if (!name.trim() == '' && age>=18) {
        enablebutton = false;
    }
    else {
        enablebutton = true;
    }
}
    return(
    <ImageBackground source={{uri:'https://i.pinimg.com/564x/31/bf/87/31bf872e687d6e48e16a28a8a9b6d7dc.jpg'}} style={styles.imgBG}>
        <View style={styles.texxt}>
            <Modal visible={showModal}>
            <View>
                <Text style={styles.logins}>LOGIN BOOK</Text>
                <Text style={styles.text}>Họ tên:</Text>
                <TextInput style={styles.textinput} onChangeText={(value)=>{setname(value)}} onSubmitEditing={checkLogin()}/>
                <Text style={styles.text}>Tuổi:</Text>
                <TextInput style={styles.textinput} 
                           keyboardType='numeric'
                           maxLength={2}
                           onChangeText={(value)=>{setAge(value)}}/>
            </View>
            <View>
                <TouchableOpacity style={styles.btnLogin} 
                    disabled={enablebutton}
                    onPress={() => {setShowModal(false) }}>
                    <Text style={styles.btnLoginText}>Login</Text>
                </TouchableOpacity>
            </View>
            </Modal>
            <View >
                <View style={styles.btn}>
                <Text style={styles.txtname}>Tên người dùng: {name}</Text>
                    <Button title='Log out' onPress={()=>{setShowModal(true)}}/>
                </View>
                <LoadBook/>
            </View>
       </View>
    </ImageBackground>
    );
}
const styles=StyleSheet.create({
    logins:{
        marginTop: 120,
        fontSize: 30,
        marginBottom: 20,
        marginLeft: 99,
    },
    texxt:{
        marginTop:20,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    imgBG:{
        width:500
    },  
    text:{
        marginLeft: 25,
        marginBottom: 10,
        fontSize: 25,
    },
    textinput:{
        height: 40,
        fontSize:16,
        marginLeft: 25,
        marginRight:25,
        paddingLeft: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 1,
        lineHeight: 12,
    },
    btn:{
        marginTop: 100
    },
    txtname:{
        fontSize: 22,
        marginTop: 5,
        marginBottom: 5,
        color: '#fa222a',
        alignItems:'center',
        justifyContent:'center'
    },
    btnLogin: {
        height: 45,
        width: 250,
        backgroundColor: 'rgba(0,191,255, 0.9)',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 55,
        borderRadius: 25,
    },
    btnLoginText: {
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center'
    }
});