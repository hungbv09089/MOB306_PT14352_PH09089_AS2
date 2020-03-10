import React from 'react';
import {View,Alert, Button,StyleSheet,Image,Text,TouchableOpacity} from 'react-native';

export default function bookitem({item,handledelete,handleEdit,handleDetail}){

const alertDele=(id)=>{
    Alert.alert(
        'Xoá Truyện',
        `Bạn có muốn xoá cuốn truyện này không?`,
        [
            {text: 'Có',onPress:()=>{handledelete(id)}},
            {text:'Không',onPress:()=>{}}
        ],{cancelable:true}
    )
}
    return(
        <View style={styles.bor}>
            <View>
                <Image style={styles.img} source={{uri:item.thumbnail}}/>
                <View>
                    <Text style={styles.text}>{`Tên truyện: ${item.namebook}`}</Text>
                    <Text style={styles.text}>{`Thể loại: ${item.category}`}</Text>
                    <Text style={styles.text}>{`Chương: ${item.total_chapters}`}</Text>
                    <Text style={styles.text}>{`Tình trạng: ${item.is_full ? 'Full':'Chưa full'}`}</Text>
                </View>
            </View>
            <View style={styles.button}>
                <TouchableOpacity style={styles.btnTouchab} onPress={()=>{handleDetail(item.id)}}>
                    <Text style={styles.btnLoginText}>DETAIL</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnTouchabEdit} onPress={()=>{handleEdit(item.id)}}>
                    <Text style={styles.btnLoginText}>EDIT</Text>
                </TouchableOpacity >
            </View>
            <View>
                <Button color='#fc0009' title="Delete" onPress={()=>{alertDele(item.id,handledelete)}}/>
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    bor:{
        width:250,
        marginTop:20,
        marginLeft:20,
        fontSize: 16,
        marginBottom:10
    },
    img:{
        width: 150,
        height: 150,
        borderRadius: 150
    },
    button:{
        flexDirection: 'row'
    },
    btnTouchab:{
        width: 125,
        backgroundColor:'#40d173',
        height: 40,
    },
    btnTouchabEdit:{
        width: 125,
        backgroundColor:'#fc9003',
        height: 40,
    },
    btnLoginText: {
        fontSize: 16,
        color: '#fff',
        padding:7,
        alignSelf: 'center'
    },
    text:{
        fontSize:20,
        marginBottom:2
    },
});