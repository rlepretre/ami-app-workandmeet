import { ref } from 'vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import firebase from 'firebase';

export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
}

function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }


export function usePhotoGallery(docRefId: string) {

    const photos = ref<UserPhoto[]>([]);

    const takePhoto = async () => {
        console.log("hello" + docRefId);
        
        const cameraPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Base64,
            source: CameraSource.Camera,
            quality: 100,
            allowEditing: false,
        
        });

        const fileName = new Date().getTime() + '.jpeg';


        if (cameraPhoto?.base64String) {            
            const guid = uuidv4();
    
            const filePath = `${docRefId}/images/${guid}.${cameraPhoto.format}`;
    
            const storageRef = firebase.storage().ref();
    
            await storageRef
              .child(filePath)
              .putString(cameraPhoto.base64String, "base64");
            const url = await storageRef.child(filePath).getDownloadURL();

            const savedFileImage = {
                filepath: fileName,
                webviewPath: url,
            };
    
            await firebase
              .firestore()
              .collection("workspaces")
              .doc(docRefId)
              .collection("images")
              .add({
                image: url
              });

              photos.value = [savedFileImage, ...photos.value];
          }

        


    };

    return {
        photos,
        takePhoto
    };
}