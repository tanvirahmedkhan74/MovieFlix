import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';

export default function VideoPlayer({link}) {
  const videoRef = useRef(null);

  return (
    <Video
      source={{uri: link}}
      ref={videoRef}
      style={styles.backgroundVideo}
    />
  );
}

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});