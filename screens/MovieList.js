import {View, Text, ScrollView, TouchableWithoutFeedback} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fetchMovieYear} from '../server';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FolderIcon} from 'react-native-heroicons/solid';

export default function MovieList() {
  const {params: item} = useRoute();
  const [years, setYears] = useState([]);
  const navigatior = useNavigation();

  useEffect(() => {
    getMovieYears();
  }, []);

  const getMovieYears = async () => {
    const data = await fetchMovieYear(item);
    if (data) setYears(data);
    // console.log(data);
  };

  return (
    <View className='bg-neutral-700 flex-1 pt-5'>
      {/* <SafeAreaView> */}
        <View style={{flex: 1, margin: 4}}>
          <ScrollView>
            {years.map((item, index) => (
              <TouchableWithoutFeedback key={index} onPress={() => navigatior.navigate('MovieByYear', item.link)}>
                <View style={{padding: 10}} className="flex-row items-center">
                  <FolderIcon size={40} strokeWidth={2.5} color="white" />
                  <Text className="text-neutral-300 font-bold ml-8">
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
