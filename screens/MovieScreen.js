import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { fetchMovie } from '../server';
import VideoPlayer from '../components/videoPlayer';

export default function MovieScreen() {
    const {params: item} = useRoute();
    const [movie, setMovie] = useState();
    const [videoSource, setVideoSource] = useState([])

    useEffect(() => {
        getMovie();
    }, [])

    const getMovie = async () => {
        const data = await fetchMovie(item);
        if(data) setMovie(data);
        console.log(data);
    }

  return (
    <View>
        <VideoPlayer link={movie}/>
    </View>
  )
}