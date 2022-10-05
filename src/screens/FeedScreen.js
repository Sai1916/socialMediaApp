import { View, Text, FlatList, Pressable, Image } from 'react-native'
import React from 'react'
import { posts } from '../../assets/posts'
import user from '../../assets/user'
import Post from '../components/Post'
import tailwind from 'tailwind-rn'
import {Entypo} from 'react-native-vector-icons';

const FeedScreen = ({navigation}) => {

  const img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";

  const createPost = () => {
    navigation.navigate("Create Post");
  };

  return (
    <FlatList 
        data={posts}
        renderItem={({item}) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <Pressable onPress={createPost} style={tailwind('p-4 py-5 flex-row items-center w-full bg-white')}>
            <Image source={{ uri: user?.image }} style={tailwind('w-10 h-10 mr-4 rounded-full')} />
            <Text style={tailwind('text-gray-200')}>What's on your mind?</Text>
            <Entypo
              name="images"
              size={24}
              color="limegreen"
              style={{marginLeft: 'auto'}}
            />
          </Pressable>
        )}
      />
  )
}

export default FeedScreen