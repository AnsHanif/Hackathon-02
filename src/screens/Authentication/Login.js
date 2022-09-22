import React ,{useState}from 'react'
import { View, Text ,ImageBackground,StyleSheet} from 'react-native'
import { Button ,TextInput,loading} from 'react-native-paper';
import image from '../../assests/Images/DarkOcean.jpg'
import { useAuthContext } from '../../contexts/AuthContext';
import auth from '@react-native-firebase/auth';


export default function Register({navigation}) {
    const {dispatch} = useAuthContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
  const [isPasswordShow, setIsPasswordShow] = useState(false)

  const handleLogin = ()=>{
    // dispatch({type:"LOGIN"})
    setIsProcessing(true)
    auth()
    // .createUserWithEmailAndPassword(email, password)
    .signInWithEmailAndPassword(email,password)
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
  }).finally(()=>{
    setIsProcessing(false)
  });
  }
  return (
    <ImageBackground  source={image} style={{height:"100%"}}>
        <Text style={styles.h2} >Real Estate Agency</Text>
          <View style={styles.flexCenter}>
      <Text style={styles.h1} >Sign In</Text>
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
        onChangeText={val => setPassword(val)}
        right={<TextInput.Icon icon={isPasswordShow ? "eye" : "eye-off"} onPress={()=>{setIsPasswordShow(!isPasswordShow)}} />}
        />
      <View style={{width:"100%"}}>
        <Button mode='contianed' buttonColor='#4286f4' loading={isProcessing? true : false} textColor='white' style={{borderRadius:4}} onPress={handleLogin}>Sign In</Button>
      </View>
    </View>
    <View style={styles.flexEnd}>
    <View style={{width:"75%",marginBottom:16, }}>
        <Button mode='contianed' buttonColor='#4286f4' textColor='white' onPress={()=>{navigation.navigate("Register")}} >Don't Have An Account ?  </Button>
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
        paddingHorizontal:16
    },
    flexEnd:{
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:"#1d3557",
        paddingHorizontal:16
    },
    formControl:{
    //   borderWidth: 1,
    //   borderColor:"#ddd",
      borderRadius: 4,
      marginBottom: 10,
      width: "100%",
      color:'white'
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
        textAlign:"center"
    }
})