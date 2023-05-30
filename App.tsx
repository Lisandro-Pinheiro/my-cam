
import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useState } from "react";
import {View, StyleSheet, TouchableHighlight, Text } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Image } from 'expo-image';

export default function App() {

  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission(cameraStatus.status === 'granted')
      await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

  async function TakePicture() {
    if (camera) {
      const photo = await camera.takePictureAsync();
      console.log(photo.uri);
      setImage(photo.uri)
      await MediaLibrary.saveToLibraryAsync(photo.uri);
    }
  }
  return (
    <View style={styles.container}>
      <Camera
        ref={(minhaCamera) => setCamera(minhaCamera)}
        style={styles.styleCamera}
        type={CameraType.back}
        ratio={'1:1'} />
      <Image
        style={styles.container}
        source={image}
        contentFit="cover"
        transition={1000} />
      <TouchableHighlight
        style={styles.button}
        onPress={() => { TakePicture() }}>
        <Text
          style={{ color: '#fff', fontSize: 25 }}>
          Tirar Foto
        </Text>
      </TouchableHighlight>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  styleCamera: {
    aspectRatio: 1,
    flex: 1
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    backgroundColor: "#6676f1",
    width: 100,
    height: 100,
    borderRadius: 100,
    position: "absolute",
    bottom: 50

  }


});