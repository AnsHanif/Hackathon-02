import React,{ useState,useEffect }  from 'react'
import { View, Text,StyleSheet ,Image} from 'react-native'
import Swiper from 'react-native-swiper'
import { useAuthContext } from '../../contexts/AuthContext';
import image1 from '../../assests/Images/house1.jpg'
import image2 from '../../assests/Images/house2.jpg'
import image3 from '../../assests/Images/house3.jpg'
import image4 from '../../assests/Images/house4.jpg'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icons from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore'
export default function Home({navigation}) {
  const [documents, setdocuments] = useState([])
  const fetchDocuments = ()=>{
    let array =[]
    firestore()
  .collection('Persons')
  .get()
  .then(querySnapshot => {
    console.log('Total Persons: ', querySnapshot.size);
    
    querySnapshot.forEach(documentSnapshot => {
      array.push({ id: documentSnapshot.id, ...documentSnapshot.data() })
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      setdocuments(array)
    });
  }).catch(err => console.log(err))
}

useEffect(() => {
  fetchDocuments()  
  }, [])
  return (
    <>
    <View style={{flex:1}}>
    <Swiper style={styles.wrapper} showsButtons={true} prevButton={<Text style={styles.buttonText}><Icon name='chevron-left' size={30} style={{color:'white'}} /></Text>}  nextButton={<Text style={styles.buttonText}><Icon name='chevron-right' size={30} style={{color:'white'}} /></Text>}  autoplay={true}>
        <View style={styles.slide1}>
           <Image style={{height:300 , width:400}} source={image1} />
        </View>
        <View style={styles.slide2}>
        <Image style={{height:300 , width:400}} source={image2} />
        </View>
        <View style={styles.slide3}>
        <Image style={{height:300 , width:400}} source={image3} />
        </View>
        <View style={styles.slide4}>
        <Image style={{height:300 , width:400}} source={image4} />
        </View>
      </Swiper>
    </View>
      <View style={{flex:1, padding:10}}>
        <Text style={{fontSize:25}}>WellCome To Our Mobile App </Text>
        <View>
          <Icons name='person-circle' size={50}/>
          {documents.map((doc,i)=>{
        return (
          <View key={i}>
         <Text>{doc.name}</Text>
         <Text>{doc.cityname}</Text>
          </View>
         )
      })}
        </View>
        <Text style={{textAlign:"right", marginTop:15}}><Icon name='plus-circle' style={{color:'#4286f4'}} onPress={()=>{navigation.navigate("AddProduct")}} size={50} /></Text>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    
    slide4: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    buttonText:{
      
    }
  })
  