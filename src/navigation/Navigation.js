import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import FeedScreen from '../screens/FeedScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreatePostScreen from '../screens/CreatePostScreen'
import ProfileScreen from '../screens/ProfileScreen'
import {FontAwesome} from 'react-native-vector-icons'
import UpdateProfileScreen from '../screens/UpdateProfileScreen'

const Navigation = () => {

    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Feed" component={FeedScreen}
                options={({ navigation }) => ({
                    headerRight: () => (
                      <FontAwesome
                        onPress={() => navigation.navigate("Profile")}
                        name="user"
                        size={24}
                        color="gray"
                      />
                    ),
                })}
            />
            <Stack.Screen name="Create Post" component={CreatePostScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen}  /> 
            <Stack.Screen name="Update Profile" component={UpdateProfileScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation