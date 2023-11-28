import {
  View,
  Text,
  Dimensions,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getMainCategories} from '../server';
import {FolderIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';

export default function HomeScreen() {
  const navigator = useNavigation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getMovieCategories();
  }, []);

  const getMovieCategories = async () => {
    const data = await getMainCategories();
    if (data) setCategories(data);
    // console.log(data);
  };

  return (
    <View style={{flex: 1}} className="bg-neutral-600 p-2">
      <SafeAreaView>
        <StatusBar barStyle="light-content" />
        <Text style={{color: 'white'}}>Sam Online</Text>
      </SafeAreaView>

      <View style={{flex: 1, margin: 4}}>
        <ScrollView>
          {categories.map((item, index) => (
            <TouchableWithoutFeedback key={index} onPress={() => navigator.navigate('MovieList', item.link)}>
              <View style={{padding: 10}} className='flex-row items-center'>
                <FolderIcon size={40} strokeWidth={2.5} color='white'/>
                <Text className="text-neutral-300 font-bold ml-8">
                  {item.category}
                </Text>
                {/* <Text className="text-neutral-300 font-bold">{item.link}</Text> */}
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
