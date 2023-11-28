import React, {useRef, useState} from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';

const {width, height} = Dimensions.get('window');

export default function VideoPlayer({link}) {
  const videoRef = useRef(null); // refrecne for seek 10s + -
  const [clicked, setClicked] = useState(false); // Clicked on the video
  const [paused, setPaused] = useState(false); // Paused or nah
  const [progress, setProgress] = useState(null); // Current time and progress obj
  const [fullScreen, setFullScreen] = useState(false);
  const [mute, setMute] = useState(false);
  const ref = useRef();

  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  console.log(progress);

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => setClicked(true)}
        style={{width: '100%', height: fullScreen ? '100%' : 200}}>
        <Video
          source={{uri: link}}
          ref={ref}
          style={{width: '100%', height: fullScreen ? '100%' : 200}}
          resizeMode="contain"
          paused={paused}
          onProgress={time => {
            setProgress(time);
          }}
          muted={mute}
        />
        {clicked && (
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,.3)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setClicked(false)}>
            <View className="flex-row">
              <TouchableOpacity
                onPress={() => ref.current.seek(progress.currentTime - 10)}>
                <Image
                  source={require('../assets/src/backward.png')}
                  style={{width: 24, height: 24, tintColor: 'white'}}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setPaused(!paused)}>
                <Image
                  source={
                    paused
                      ? require('../assets/src/play-button.png')
                      : require('../assets/src/pause.png')
                  }
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'white',
                    marginLeft: 40,
                    marginRight: 40,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => ref.current.seek(progress.currentTime + 10)}>
                <Image
                  source={require('../assets/src/forward.png')}
                  style={{width: 24, height: 24, tintColor: 'white'}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 0,
                paddingLeft: 20,
                paddingRight: 18,
                alignItems: 'center',
              }}>
              {/* {current time, slider, mute, endTime} */}
              <Text style={{color: 'white', fontSize: 15}}>
                {format(progress.currentTime)}
              </Text>

              <Slider
                style={{width: '75%', height: 40}}
                minimumValue={0}
                maximumValue={progress.seekableDuration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#FFF"
                onValueChange={time => {
                  ref.current.seek(parseInt(time));
                }}
              />

              <TouchableOpacity onPress={() => {
                setMute(!mute)
              }}>
                <Image
                  source={
                    mute
                      ? require('../assets/src/mute.png')
                      : require('../assets/src/medium-volume.png')
                  }
                  style={{width: 22, height: 22, tintColor: 'white', marginRight: 2}}
                />
              </TouchableOpacity>

              <Text style={{color: 'white', fontSize: 15}}>
                {format(progress.seekableDuration)}
              </Text>
            </View>

            {/* {Full Screen Mode} */}

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                top: 18,
                paddingLeft: 20,
                paddingRight: 18,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (fullScreen) {
                    Orientation.lockToPortrait();
                  } else {
                    Orientation.lockToLandscape();
                  }
                  setFullScreen(!fullScreen);
                }}>
                <Image
                  source={
                    fullScreen
                      ? require('../assets/src/minimize.png')
                      : require('../assets/src/full-size.png')
                  }
                  style={{width: 22, height: 22, tintColor: 'white'}}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
}

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: height * 0.5,
  },
});
