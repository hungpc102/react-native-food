
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


export async function pickImage(setImageDataBase64:any ) {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 5],
        quality: 1,
      });
  
      if (!result.canceled) {
        const imageUrl = result.assets[0].uri

        const imageInfo = await FileSystem.readAsStringAsync(imageUrl, {
          encoding: FileSystem.EncodingType.Base64,
        })
        setImageDataBase64(imageInfo);
      }

       // Cập nhật trạng thái imageDataBase64 ngay lập tức
    } catch (error) {
      console.error(error);
    }
  }