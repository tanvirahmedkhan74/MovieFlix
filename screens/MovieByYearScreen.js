import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FolderIcon, FilmIcon } from 'react-native-heroicons/solid';
import { fetchMovieData } from '../server';

export default function MovieByYearScreen() {
  const {params: item} = useRoute();
  const [movie, setMovie] = useState([]);
  const navigator = useNavigation();

  useEffect(() => {
    getMovie();
  }, [])

  const getMovie = async ()=> {
    const data = await fetchMovieData(item);
    if(data) setMovie(data);
    // console.log(data);
  }
  return (
    <View className='bg-neutral-700 flex-1 pt-5'>
      {/* <SafeAreaView> */}
        <View style={{flex: 1, margin: 4}}>
          <ScrollView>
            {movie.map((item, index) => (
              <TouchableWithoutFeedback key={index} onPress={() => navigator.navigate('Movie', item.link)}>
                <View style={{padding: 10}} className="flex-row items-center">
                  <FilmIcon size={40} strokeWidth={2.5} color="white" />
                  <Text className="text-neutral-300 font-bold ml-4">
                    {item.title}
                  </Text>
                  {/* <Text className="text-neutral-300 font-bold">{item.link}</Text> */}
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        </View>
      {/* </SafeAreaView> */}
    </View>
  );
}