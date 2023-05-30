
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import MediaLibrary from "expo-media-library"

export default function App() {

  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission(cameraStatus.status === 'granted')
    })();
  }, []);

  async function TakePicture() {
    if (camera) {
      const photo = await camera.takePictureAsync();
      console.log(photo.uri);
      await MediaLibrary.saveToLibraryAsync(photo.uri);
    }
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={(minhaCamera) => setCamera(minhaCamera)}
        style={styles.styleCamera}
        type={CameraType.back}
        ratio={'1:1'}>
      </Camera>
      <Button title="Tirar Foto" onPress={() => {TakePicture() }} />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  styleCamera: {
    aspectRatio: 1,
    flex: 1
  }


});