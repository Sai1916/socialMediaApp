import { FlatList, ScrollView, Text, View } from "react-native";
import tailwind from "tailwind-rn";
import Post from "./src/components/Post";
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import FeedScreen from "./src/screens/FeedScreen";
import CreatePostScreen from "./src/screens/CreatePostScreen";
import Navigation from "./src/navigation/Navigation";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from 'aws-amplify-react-native';
import { useEffect, useState } from "react";

const App = () => {

  const [authUser, setAuthUser] = useState(null);

useEffect(() => {
  Auth.currentAuthenticatedUser().then(setAuthUser);
}, []);

console.log(authUser?.attributes);

  return (
    <SafeAreaProvider>
      <View style={tailwind("flex-1")}>
        <Navigation />
      </View>
    </SafeAreaProvider> 
  );
}

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });


export default withAuthenticator(App);