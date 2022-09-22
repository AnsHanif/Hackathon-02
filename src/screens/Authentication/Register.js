import React ,{useState}from 'react'
import { View, Text ,ImageBackground,StyleSheet} from 'react-native'
import { Button ,TextInput} from 'react-native-paper';
import image from '../../assests/Images/DarkOcean.jpg'
import { useAuthContext } from '../../contexts/AuthContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'


export default function Register({navigation}) {
    const {dispatch} = useAuthContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
  const [isPasswordShow, setIsPasswordShow] = useState(false)
 const [name, setname] = useState("")
 const [cityname, setcityname] = useState("")



  const handleRegister = ()=>{
    // dispatch({type:"LOGIN"})
    setIsProcessing(true)
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user
        dispatch({type:"LOGIN" , payload: {user}})
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });


  let formData = {name , cityname}
        formData.id = Math.random().toString(36).slice(2)
        createDocument(formData)
    }
    const createDocument = (formData)=>{
        console.log(formData)
        firestore()
  .collection('Persons')
  .doc(formData.id)
  .set(formData)
  .then(() => {
    console.log('User added!');
    alert("Account Created Successfully")
  }).catch(err =>{
    console.error(err)
  }).finally(()=>{
    // setIsLoading(false)
  })
  }
  return (
    <ImageBackground  source={image} style={{height:"100%"}}>
         <Text style={styles.h2} >Real Estate Agency</Text>
          <View style={styles.flexCenter}>
      <Text style={styles.h1} >Sign Up</Text>
      <TextInput 
       mode={'outlined'}
    //    label="Email"
        style={styles.formControl}
        placeholder="Enter Your Name"
        // placeholderTextColor="white"
        keyboardType='email-address'
        // onChangeText={val => handleChange("email" , val)}
        onChangeText={val => setname(val)}
      
      />
      <TextInput 
       mode={'outlined'}
    //    label="Email"
        style={styles.formControl}
        placeholder="City Name"
        // placeholderTextColor="white"
        keyboardType='email-address'
        // onChangeText={val => handleChange("email" , val)}
        onChangeText={val => setcityname(val)}
      
      />
      <TextInput 
       mode={'outlined'}
    //    label="Email"
        style={styles.formControl}
        placeholder="Enter Your email"
        // placeholderTextColor="white"
        keyboardType='email-address'
        // onChangeText={val => handleChange("email" , val)}
        onChangeText={val => setEmail(val)}
      
      />
      <TextInput 
        style={styles.formControl}
        mode={'outlined'}
        //  label="Password"
        placeholder="Enter Your Password"
        // placeholderTextColor="white"
        // keyboardType='email-address'
        secureTextEntry={!isPasswordShow? true : false}
        // onChangeText={val => handleChange("password" , val)}
        // onChangeText={val => setPassword(val)}
        onChangeText={val => setPassword(val)}
        right={<TextInput.Icon icon={isPasswordShow ? "eye" : "eye-off"} onPress={()=>{setIsPasswordShow(!isPasswordShow)}} />}
        />
      <View style={{width:"100%"}}>
        <Button mode='contianed' buttonColor='#4286f4' loading={isProcessing? true : false} textColor='white' style={{borderRadius:4}} onPress={handleRegister}>Sign Up</Button>
      </View>
    </View>
    <View style={styles.flexEnd}>
    <View style={{width:"60%",}}>
        <Button mode='contianed' buttonColor='#4286f4' onPress={()=>{navigation.navigate("Login")}} textColor='white'  >Already Signed Up  </Button>
      </View>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    flexCenter:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:"#1d3557",
        paddingHorizontal:16,
        marginBottom:40
    },
    flexEnd:{
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:"#1d3557",
        paddingHorizontal:16,
        flex:1
    },
    formControl:{
    //   borderWidth: 1,
    //   borderColor:"#ddd",
      borderRadius: 4,
      marginBottom: 10,
      width: "100%",
      color:'white',
    },
    h1:{
        fontSize: 48,
        color:"white",
        marginBottom:24
    },
    h2:{
        fontSize: 40,
        color:"white",
        marginTop:50,
        textAlign:"center",
        flex:1
    }
})