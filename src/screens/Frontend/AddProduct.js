import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function AddProduct() {
  const [selectImages, setselectImages] = useState('');
  const [url, setUrl] = useState('');

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [Size, setSize] = useState('');
  const [rooms, setRooms] = useState('');
  const [type, setType] = useState('');

  let options = {
    title: 'Select Image',
    customButtons: [
      {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const selectImage = async () => {
    const result = await launchImageLibrary(options, res => {
      console.log(res);
      setselectImages(res.assets[0]);
    });
  };

  const AddProperty = async () => {
    // alert("working")

    await storage()
      .ref(`images/${selectImages.fileName}`)
      .putFile(selectImages.uri)
      .then(async () => {
        const urls = await storage()
          .ref(`images/${selectImages.fileName}`)
          .getDownloadURL();
        console.log(urls);
        setUrl(urls);
      })
    const obj = {
      title,
      location,
      price,
      Size,
      rooms,
      type,
      image: url,
    };
    obj.id = Math.random().toString(36).slice(2)

    console.log(obj);
    firestore()
      .collection('Homes')
      .doc(obj.id)
  .set(obj)
      .then(() => {
        console.log('Property added!');
        alert('Product Added Successfully IF You Want to See Your Property Restart Your App');
      });
  };
  return (
    <ScrollView>
      <View style={styles.flexCenter}>
        <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold'}}>
          Add Property
        </Text>
        <TextInput
          mode={'outlined'}
          //    label="Email"
          style={styles.formControl}
          placeholder="Title"
          // placeholderTextColor="white"
          keyboardType="email-address"
          // onChangeText={val => handleChange("email" , val)}
          onChangeText={val => setTitle(val)}
        />
        <TextInput
          mode={'outlined'}
          //    label="Email"
          style={styles.formControl}
          placeholder="Location"
          // placeholderTextColor="white"
          keyboardType="email-address"
          // onChangeText={val => handleChange("email" , val)}
          onChangeText={val => setLocation(val)}
        />
        <TextInput
          mode={'outlined'}
          //    label="Email"
          style={styles.formControl}
          placeholder="Price"
          // placeholderTextColor="white"
          keyboardType="email-address"
          // onChangeText={val => handleChange("email" , val)}
          onChangeText={val => setPrice(val)}
        />
        <TextInput
          mode={'outlined'}
          //    label="Email"
          style={styles.formControl}
          placeholder="Area or Size (per sqaure meter)"
          // placeholderTextColor="white"
          keyboardType="email-address"
          // onChangeText={val => handleChange("email" , val)}
          onChangeText={val => setSize(val)}
        />
        <TextInput
          mode={'outlined'}
          //    label="Email"
          style={styles.formControl}
          placeholder="No. of Bedrooms"
          // placeholderTextColor="white"
          keyboardType="email-address"
          // onChangeText={val => handleChange("email" , val)}
          onChangeText={val => setRooms(val)}
        />
        <TextInput
          mode={'outlined'}
          //    label="Email"
          style={styles.formControl}
          placeholder="Phone Number"
          // placeholderTextColor="white"
          keyboardType="email-address"
          // onChangeText={val => handleChange("email" , val)}
          onChangeText={val => setType(val)}
        />
        <Image
          source={{
            uri: selectImages.uri
              ? selectImages.uri
              : 'https://alxgroup.com.au/wp-content/uploads/2016/04/dummy-post-square-1.jpg',
          }}
          style={{width: 200, height: 200, marginBottom: 10}}
          alt="Alternate Text"
          size="xl"
        />
        <View style={{width: '75%', marginBottom: 16}}>
          <Button
            mode="contained"
            style={{backgroundColor: '#4286f4'}}
            onPress={selectImage}>
            Select Image
          </Button>
        </View>
        <View style={{width: '100%'}}>
          <Button
            mode="contianed"
            buttonColor="#4286f4"
            textColor="white"
            style={{borderRadius: 4}}
            onPress={AddProperty}>
            Add{' '}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  formControl: {
    //   borderWidth: 1,
    //   borderColor:"#ddd",
    borderRadius: 4,
    marginBottom: 10,
    width: '100%',
    color: 'white',
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"#1d3557",
    paddingHorizontal: 16,
  },
});
