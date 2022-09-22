import * as React from 'react';
import { Appbar } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useAuthContext } from '../contexts/AuthContext';
const Header = () => {
  const {dispatch} = useAuthContext()

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => {
    alert("Are You Sure You Want to Logout")
    return(
    auth()
    .signOut()
    .then(() => {
      dispatch({type:"LOGOUT"})
      alert("Logout Successfull")
    }).catch((err)=>{
      console.error(err)
      console.log("Error in Logout")
    })
    )
  };

 
  return (
    <Appbar.Header style={{backgroundColor:"#4286f4"}}  theme={{colors:{text:"white"}}}>
      <Appbar.Content title="Real Estate" />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};

export default Header;