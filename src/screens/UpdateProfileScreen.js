import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Button,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import tailwind from "tailwind-rn";

const dummy_img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";

const UpdateProfileScreen = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const insets = useSafeAreaInsets();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onSave = async () => {
    console.warn("Saving the user profile");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[tailwind('flex-1 bg-white items-center p-3'), { marginBottom: insets.bottom }]}
      contentContainerStyle={{ flex: 1 }}
      keyboardVerticalOffset={150}
    >
      <Pressable onPress={pickImage} style={tailwind('items-center')}>
        <Image source={{ uri: image || dummy_img }} style={[tailwind('w-20 mb-4 rounded-full'),{aspectRatio:1}]} />
        <Text>Change photo</Text>
      </Pressable>

      <TextInput
        placeholder="Full name"
        style={[tailwind('w-full my-4 p-3 border-gray-300'),{borderBottomWidth: StyleSheet.hairlineWidth,}]}
        value={name}
        onChangeText={setName}
      />

      <View style={[tailwind('mb-4 self-stretch'),{marginTop: 'auto'}]}>
        <Button onPress={onSave} title="Save" disabled={!name} />
      </View>
    </KeyboardAvoidingView>
  );
};


export default UpdateProfileScreen;