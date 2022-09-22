import React ,{createContext , useReducer , useContext , useEffect} from 'react'
import auth from '@react-native-firebase/auth';

const AuthContext = createContext();

const initialState = {isAuthenticated : false}

const reducer = (state , {type , payload})=>{
    switch(type){
        case "LOGIN":
            return Object.assign({} , { isAuthenticated: true} ,)
        case "LOGOUT":
            return Object.assign({}, {isAuthenticated : false})
            default: 
            return state
    }
}
export default function AuthContextProvider(props) {
    
    const [state, dispatch] = useReducer(reducer , initialState)

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user)=>{
            if(!user){
                dispatch({type:"LOGOUT"})
            }
            if(user){
                dispatch({type:"LOGIN" , payload: {user}})
            }

            console.log(user)
        });
        return subscriber;
    }, [])
    
  return (
        <AuthContext.Provider value = {{...state , dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = ()=>{
    return useContext(AuthContext)
}
