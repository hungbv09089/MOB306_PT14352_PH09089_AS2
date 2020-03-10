import React, {useState,useEffect} from 'react';
import {View, FlatList,Text, Modal,StyleSheet,Button,Image,TextInput,Switch,TouchableOpacity} from 'react-native';

import BookItem from './book_item'

export default function BOOK(){
    const[book,setbook]=useState([]);
    const[showLoading,setshowLoading]=useState(false);
    const[namebook,setNamebook]=useState('');
    const[category,setcategory]=useState('');
    const[total_chapters,settotal]=useState('');
    const[thumbnail,setURLBook]=useState('');
    const[is_full,setis_full]=useState('');
    const[isUpdate,setUpdate]=useState(false);  
    const[showDetail,setShowDetail]=useState(false);
    const[itemDetail,setitemDetail]=useState({});
    const[showModalAdd,setshowModalAdd]=useState(false);
    
    const API='http://5e5a60fc6a71ea0014e61d8b.mockapi.io/BookPro';
    
    const fetchbook=()=>{
        return fetch(
            API,{}
        ).then((response)=>response.json())
        .then((responseJson)=>setbook(responseJson))
        .catch((error)=>console.log(error))
    };
    useEffect(
        ()=>{
            fetchbook();
        },[]
    )
    const setModalData=(data)=>{
        setURLBook(data.thumbnail);
        setNamebook(data.namebook);
        setcategory(data.category);
        settotal(data.total_chapters);
        setis_full(data.is_full);
    }
    const deleBook=(id)=>{
        const newBook=book.filter(item=>item.id!=id);
        setbook(newBook);
    }
    const DeleteBook=(id)=>{
        setshowLoading(true);
        deleBook(id);
        fetch(
            `${API}/${id}`,{
                method:'DELETE'
            }).then(()=>{
                setshowLoading(false);
            })
            .catch((error)=>console.log(error));
    }
    const handleAddBook=(responseJson)=>{
        const newBooks=[...book];
        return newBooks.push(responseJson);
    }
    const handleUpdateBooks=(responseJson)=>{
        const newBooks=[...book];
        const upDateBookIndex=newBooks.findIndex(item=>item.id=responseJson.id);
        newBooks[upDateBookIndex]=responseJson;

        return newBooks;
    }
    const handleSubmit=()=>{
        if(namebook==''||category==''||total_chapters==''||thumbnail==''){
            alert('Không dược để trống');
        }else{
        setshowLoading(true);
        setshowModalAdd(false);

        const books={
            thumbnail,
            namebook,
            category,
            total_chapters,
            is_full,
        }
        const api=isUpdate? `${API}/${isUpdate}`:API;
        fetch(
            api,
            {
                method:isUpdate? 'PUT' : 'POST',
                headers:{
                    Accept:'application/json',
                    'Content-type':'appication/json'
                },
                body: JSON.stringify(books)
            }
        ).then((response)=>response.json())
        .then((responseJson)=>{
            let newBooks=[];
            if(isUpdate){
                newBooks=handleUpdateBooks(responseJson);
            }else{
                newBooks=handleAddBook(responseJson);
            }
            setbook(newBooks);
            setshowLoading(false);
        }).catch((error)=>console.log(`ERROR:${error}`));
        setModalData({
            thumbnail:'',
            namebook:'',
            category:'',
            total_chapters:'',
            is_full:''
        });
    }
    }
    const ShowEditModal=(id)=>{
        const books=book.find((item)=>item.id==id);

        setModalData(books);
        setshowModalAdd(true);
    }
    const handleDetailss=(id)=>{
        return fetch(
            API +"/"+id
        ).then((response)=>response.json())
        .then((responseJson)=>{
            setShowDetail(true);
            setitemDetail(responseJson);
            setshowLoading(false);
        }).catch((error)=>console.error(error))
    }
    return(
    <View style={styles.mar}>
        <TouchableOpacity style={styles.btnAddd} onPress={()=>{setshowModalAdd(true)}}>
            <Text>ADD</Text>
        </TouchableOpacity>
        <Modal visible={showModalAdd}>
        <View style={styles.add}>
            <View>
                <Text style={styles.text}>Logo (Image URL)</Text>
                <TextInput style={styles.textinput} value={thumbnail} onChangeText={(value) => setURLBook(value)} />
            </View>
            <View>
                <Text style={styles.text}>Tên sách</Text>
                <TextInput style={styles.textinput} value={namebook} onChangeText={(value) => setNamebook(value)} />
            </View>
            <View>
                <Text style={styles.text}>Thể loại</Text>
                <TextInput style={styles.textinput} value={category} onChangeText={(value) => setcategory(value)} />
            </View>
            <View >
                <Text style={styles.text}>Số chương</Text>
                <TextInput style={styles.textinput}  value={total_chapters}
                            keyboardType='numeric'
                            maxLength={2} 
                            onChangeText={(value) => settotal(value)} />
            </View>
            <View>
                <Text style={styles.text}>Trạng thái</Text>
                <Switch value={is_full} onValueChange={()=>{setis_full(!is_full)}}/>
            </View>
            <View style={styles.btn}>
                <TouchableOpacity style={styles.btnSubmit} onPress={()=>handleSubmit()}>
                    <Text style={styles.txtBack}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnBack} onPress={()=>{setshowModalAdd(false)}}>
                    <Text style={styles.txtBack}>Cancel</Text>
                </TouchableOpacity >
            </View>
            </View>
        </Modal>
        <Modal visible={showDetail}>
            <View style={styles.detail}>
                <Image style={styles.img} source={{uri:itemDetail.thumbnail}}/>
                <Text style={styles.text}>{itemDetail.namebook}</Text>
                <Text style={styles.text}>{itemDetail.category}</Text>
                <Text style={styles.text}>{itemDetail.total_chapters}</Text>
                <Text>{itemDetail.is_full}</Text>
                <TouchableOpacity style={styles.btnBack} onPress={()=>{setShowDetail(false)}}>
                    <Text style={styles.txtBack}>Back</Text>
                </TouchableOpacity>
            </View>
        </Modal>
        {
            showLoading?
                <Text>Loading....</Text>:null
        }
       <View>
            <FlatList   data={book}
                        renderItem={({item})=><BookItem item={item} 
                        handledelete={DeleteBook} 
                        handleEdit={ShowEditModal}
                        handleDetail={handleDetailss}/> }
                        keyExtractor={(item, index) => index}
                        />
       </View>
    </View>
    );
}
const styles=StyleSheet.create({
    img:{
        width:150,
        height:150,
        marginBottom: 10,
        borderRadius:150
    },
    mar:{ 
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 470,
        marginTop: 20
    },
    add:{
        marginLeft: 20,
        marginTop: 150,
        marginRight: 20
    },
    text:{
        fontSize:20,
        marginBottom:9
    },
    textinput:{
        fontSize:16,
        marginBottom:5,
        borderRadius: 10,
        height: 40,
        fontSize:16,
        borderWidth: 1,
        paddingLeft: 5,
        borderColor: '#000'
    },
    detail:{
        marginTop: 100,
        alignItems: 'center',
        justifyContent:'center',
    },
    btnBack:{
        backgroundColor: '#8e908f',
        alignItems: 'center',
        justifyContent:'center',
        width:150,
        height:40,
        borderRadius: 25
    },
    btnAddd:{
        backgroundColor: '#fe00c5',
        alignItems: 'center',
        justifyContent:'center',
        width:180,
        height:40,

        marginLeft:40,
        borderRadius: 30
    },
    btnSubmit:{
        backgroundColor: '#f700c0',
        alignItems: 'center',
        justifyContent:'center',
        width:150,
        height:40,
        borderRadius: 25
    },
    txtBack:{
        color: '#ffffff',
        alignSelf: 'center',
        fontSize: 16
    },
    btn:{
        flexDirection:'row'
    }
})
