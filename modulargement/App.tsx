import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, Button } from 'react-native';
import { GoogleSignin, User, isSuccessResponse} from "@react-native-google-signin/google-signin"
import { useState } from "react"

GoogleSignin.configure({
  iosClientId: "882023965462-b4lf6jk4absupalgpoie18nnevk77foq.apps.googleusercontent.com"
})

export default function App() {
  const [auth, setAuth] = useState<User | null>(null)

  async function handleGoogleSignIn(){
    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()

      if(isSuccessResponse(response)){
        setAuth(response.data)
      }
    } catch(error){
      console.log(error)
    }
  }
  return (
    <View style={styles.container}>
      <Button title= "Entrar" onPress={handleGoogleSignIn}/> 
      {auth && (
        <View style={styles.content}>
          
        <Text>{auth.user.name}</Text>
        <Text>{auth.user.email}</Text>
        </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: "center"
  },
  photo: {
    width: 100,
    height: 100,
  }
});
