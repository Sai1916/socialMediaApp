import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import tailwind from "tailwind-rn";
import {MaterialCommunityIcons,AntDesign,Octicons,Feather} from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native';

const Post = ({post}) => {
  //console.log(post)
    const [like,setLike] = useState(false);

    const navigation = useNavigation();

    const goToProfile = () => {
      navigation.navigate("Profile", { id: post.User.id });
    }

  return (
    <View style={tailwind('bg-white mb-3')}>
      <Pressable style={tailwind('p-2 flex-row items-center justify-between pb-2')} onPress={() => navigation.navigate("Profile", { id: post.User.id})}>
        <View style={tailwind('flex-row items-center')} >
            <Image source={{uri: post.User.image}} style={tailwind('w-10 h-10 rounded-full')} />
            <View style={tailwind('mx-3')}>
                <Text style={tailwind('font-bold text-base')}>{post.User.name}</Text>
                <Text style={tailwind('text-xs')}>{post.createdAt}</Text>
            </View>
        </View>
        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
      </Pressable>
      <View style={tailwind('pt-2')}>
        <Text style={tailwind('px-2')}>{post.description}</Text>
        {post.image && <Image source={{ uri : post.image}} style={[tailwind('w-full mt-2'),{aspectRatio : 1}]} />
        }
      </View>
      <View style={tailwind('flex-row items-center justify-between p-2 border-b border-gray-200')}>
        <View style={tailwind('flex-row items-center')}>
            <TouchableOpacity onPress={() => setLike(!like)}>
                <MaterialCommunityIcons name={`${like ? 'heart-outline' : 'heart'}`} size={24} color={`${like ? 'black' : 'red'}`} />
            </TouchableOpacity>
            <Text style={tailwind('mx-2')}>{post.numberOfLikes} Likes</Text>
        </View>
        <Text>{post.numberOfShares} Shares</Text>
      </View>
      {/* Footer */}
      <View style={tailwind('flex-row items-center justify-around py-3')}>
        <TouchableOpacity style={tailwind('flex-row items-center')}>
            <AntDesign name='like2' size={22} color='black' />
            <Text style={tailwind('px-2 text-sm')}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tailwind('flex-row items-center')}>
            <Octicons name='comment' size={22} color='black' />
            <Text style={tailwind('px-2 text-sm')}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tailwind('flex-row items-center')}>
            <Feather name='share' size={22} color='black' />
            <Text style={tailwind('px-2 text-sm')}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Post