import React ,{useEffect , useState}from 'react'
import { View, ScrollView,FlatList, Text,StyleSheet, Image} from 'react-native'
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

export default function Product() {
  const [documents, setdocuments] = useState([])
  const fetchDocuments = ()=>{
    let array =[]
    firestore()
  .collection('Homes')
  .get()
  .then(querySnapshot => {
    console.log('Total Homes: ', querySnapshot.size);
    
    querySnapshot.forEach(documentSnapshot => {
      array.push({ id: documentSnapshot.id, ...documentSnapshot.data() })
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      setdocuments(array)
    });
  })
}

useEffect(() => {
  fetchDocuments()
  // console.log("Array",documents)
  //  console.log('documents',documents.title)
  
  }, [])
  // const items = [
    //   {id:'0' , text:"image"}
  // ]
  return (
    <>
    <ScrollView>
    
    {/* <FlatList
    style={styles.container}
    data={documents}
    renderItem={({item})=> <Text style={styles.row} >{item.title}</Text>}
    keyExtractor = {(item)=> item.id}
    /> */}
      {/* {documents.map((doc,i)=>{
        return (
          <View key={i}>
         <Text>{doc.title}</Text>
         <Image source={{uri:doc.image}} style={{height:200,width:200}} />
         <Text>{doc.location}</Text>
          </View>
         )
      })} */}
    



        {documents.map((doc,i)=>{
        return (
    <View style={{paddingHorizontal:25, padding:10 ,}} key={i}>
      <Card style={{marginBottom:20}}>
    <Card.Cover source={{uri:doc.image}} style={{height:200,width:310}} />
    <Card.Content>
      <Title>{doc.title}</Title>
      <Paragraph>Price : {doc.price}</Paragraph>
      <Paragraph>Location : {doc.location}</Paragraph>
      <Paragraph>Area Or Size : {doc.Size}</Paragraph>
      <Paragraph>No of Bedrooms : {doc.rooms}</Paragraph>
      <Paragraph>Phone Number : {doc.type}</Paragraph>
      <Button  buttonColor='#4286f4' textColor='white' style={{borderRadius:4,margin:10}}>Want to Buy</Button>
    </Card.Content>

  </Card>
    </View>
        )})}
    
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    flex :1,
  },
  row:{
    padding:15,
    marginBottom:1,
    backgroundColor:'skyblue'
  }
})