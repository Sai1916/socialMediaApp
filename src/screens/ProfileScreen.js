import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    Dimensions,
    FlatList,
    Pressable,
  } from "react-native";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import Post from "../components/Post";
  import {
    AntDesign,
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    Entypo,
  } from "react-native-vector-icons";
  import user from "../../assets/user"
  import { posts } from '../../assets/posts'
import tailwind from "tailwind-rn";
import { Auth } from "aws-amplify";
  
  const dummy_img =
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";
  const bg = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg";
  
  const profilePictureWidth = Dimensions.get("window").width * 0.4;
  
  const ProfileScreenHeader = ({ user, isMe = false }) => {
    const navigation = useNavigation();
  
    const signOut = async () => {
      await Auth.signOut();
  };
  
    if (!user) {
      return <ActivityIndicator />;
    }
  
    return (
      <View style={tailwind('flex-1 bg-white items-center p-3')}>
        <Image source={{ uri: bg }} style={[tailwind('w-full h-60 rounded-tl-3xl rounded-tr-3xl'),{marginBottom: -profilePictureWidth / 2}]} />
        <Image source={{ uri: user?.image || dummy_img }} 
            style={[{width: profilePictureWidth,
                borderWidth: 4,
                borderColor: 'white',
                aspectRatio: 1,},tailwind('rounded-full')
            ]} 
        />
  
        <Text style={tailwind('text-lg font-bold my-2')}>{user.name}</Text>
  
        {isMe && (
          <>
            <View style={[{borderBottomWidth: StyleSheet.hairlineWidth},tailwind('py-2 flex-row border-gray-400')]}>
              <Pressable
                style={[tailwind('self-stretch flex-row flex-1 rounded-lg items-center justify-center m-1 p-3'), {backgroundColor: "gainsboro"},{ backgroundColor: "royalblue", }]}
              >
                <AntDesign name="pluscircle" size={16} color="white" />
                <Text style={[tailwind('text-white mx-2 font-bold')]}>
                  Add to Story
                </Text>
              </Pressable>
              <Pressable style={[tailwind('self-stretch flex-row flex-1 rounded-lg items-center justify-center m-1 p-3'), {backgroundColor: "gainsboro"}]}
                onPress={() => navigation.navigate("Update Profile")}
              >
                <MaterialCommunityIcons name="pencil" size={16} color="black" />
                <Text style={[tailwind('text-white mx-2 font-bold')]}>Edit Profile</Text>
              </Pressable>
              <Pressable
                onPress={signOut}
                style={[styles.button, { flex: 0, width: 50 }]}
              >
                <MaterialIcons name="logout" size={16} color="black" />
              </Pressable>
            </View>
          </>
        )}
  
        <View style={tailwind('self-stretch items-center my-2 flex-row')}>
          <Entypo
            name="graduation-cap"
            size={18}
            color="gray"
            style={{ width: 25 }}
          />
          <Text>Graduated university</Text>
        </View>
  
        <View style={tailwind('self-stretch items-center my-2 flex-row')}>
          <Ionicons name="time" size={18} color="gray" style={{ width: 25 }} />
          <Text>Joined on October 2013</Text>
        </View>
  
        <View style={tailwind('self-stretch items-center my-2 flex-row')}>
          <Entypo
            name="location-pin"
            size={18}
            color="gray"
            style={{ width: 25 }}
          />
          <Text>From Tenerife</Text>
        </View>
      </View>
    );
  };
  
  const ProfileScreen = () => {
    const route = useRoute();
  
    //console.warn("User: ", route?.params?.id);
  
    return (
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <ProfileScreenHeader user={user} isMe={true} />
            <Text style={tailwind('ml-5 my-2 font-bold text-lg')}>Posts</Text>
          </>
        )}
      />
    );
  };
  
  const styles = StyleSheet.create({
    button: {
      alignSelf: "stretch",
      flexDirection: "row",
      backgroundColor: "gainsboro",
      margin: 5,
      padding: 7,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
    },
  });
  
  export default ProfileScreen;