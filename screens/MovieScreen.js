import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { fetchMovie, validatedUrl } from '../server';
import VideoPlayer from '../components/videoPlayer';

export default function MovieScreen() {
    const {params: item} = useRoute();
    const [movie, setMovie] = useState();
    const [videoSource, setVideoSource] = useState("")

    useEffect(() => {
        getMovie();
    }, [movie])

    const getMovie = async () => {
        const data = await fetchMovie(item);
        if(data){
            setMovie(data);
            setVideoSource(data.link);
            // console.log(data.link);
        }
    }

  return (
    <View className='flex-1 bg-neutral-500'>
        <VideoPlayer link={videoSource}/>
    </View>
  )
}