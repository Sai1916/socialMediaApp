import { View, Text, Image, TextInput, Button, Platform } from 'react-native'
import React, { useState } from 'react'
import tailwind from "tailwind-rn";
import user  from '../../assets/user';
import { KeyboardAvoidingView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {Entypo} from 'react-native-vector-icons';
import * as ImagePicker from "expo-image-picker";

const CreatePostScreen = ({navigation}) => {

    const [input,setInput] = useState('');

    const [image, setImage] = useState(null);

    const onSubmit = () => {
        console.warn('submit', input);
        setInput('');
        navigation.goBack();
    }



    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };


    const insets = useSafeAreaInsets();
  return (

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[tailwind('flex-1 p-2 bg-white'),{ marginBottom: insets.bottom }]}
        contentContainerStyle={{ flex: 1 }} 
        keyboardVerticalOffset={150}
      >
        <View style={tailwind('flex-row items-center')}>
            <Image source={{uri : user?.image}} style={tailwind('h-12 w-12 rounded-full')} />
            <Text style={tailwind('mx-2 font-bold text-base')}>{user?.name}</Text>
        </View>

        <Entypo
          onPress={pickImage}
          name="images"
          size={24}
          color="limegreen"
          style={{marginLeft: 'auto'}} 
        />

        <TextInput placeholder="Write your description" multiline style={[tailwind('mt-4'),{ marginBottom: 'auto'}]} value={input} onChangeText={setInput}/>

        <Image source={{ uri: image }} style={{width: '100%',aspectRatio: 4/3}} />

        <View style={[tailwind('my-2'),{marginTop: 'auto'}]} >
          <Button title="Submit" onPress={onSubmit} />
        </View>

    </KeyboardAvoidingView>
  )
}

export default CreatePostScreen