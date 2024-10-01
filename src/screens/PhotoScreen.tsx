
// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import storage from '@react-native-firebase/storage';
// import { launchImageLibrary } from 'react-native-image-picker';

// export default function PhotoScreen() {
//   const [uploading, setUploading] = useState(false);
//   const [uploadComplete, setUploadComplete] = useState(false);
//   const [images, setImages] = useState<Array<{ uri: string, id: string }>>([]);

//   const uploadPhoto = () => {
//     launchImageLibrary({
//       mediaType: 'photo',
//       quality: 0.8,
//     }, async (response) => {
//       if (response.assets && response.assets[0].uri) {
//         const uri = response.assets[0].uri;
//         setUploading(true);
//         setUploadComplete(false);

//         try {
//           const fileName = response.assets[0].fileName || `photo_${Date.now()}.jpg`;
//           const reference = storage().ref(`photos/${fileName}`);
//           await reference.putFile(uri);
//           setUploadComplete(true);
//           setImages(prevImages => [...prevImages, { uri, id: fileName }]);
//         } catch (error) {
//           console.error('Upload failed:', error);
//         } finally {
//           setUploading(false);
//         }
//       }
//     });
//   };

//   const replacePhoto = (id: string) => {
//     launchImageLibrary({
//       mediaType: 'photo',
//       quality: 0.8,
//     }, async (response) => {
//       if (response.assets && response.assets[0].uri) {
//         const newUri = response.assets[0].uri;
//         setUploading(true);
//         setUploadComplete(false);

//         try {
//           const reference = storage().ref(`photos/${id}`);
//           await reference.putFile(newUri);
//           setUploadComplete(true);
//           setImages(prevImages => prevImages.map(img =>
//             img.id === id ? { ...img, uri: newUri } : img
//           ));
//         } catch (error) {
//           console.error('Replace failed:', error);
//         } finally {
//           setUploading(false);
//         }
//       }
//     });
//   };

//   const renderItem = ({ item }: { item: { uri: string, id: string } }) => (
//     <View style={styles.imageContainer}>
//       <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
//       <TouchableOpacity
//         style={styles.replaceButton}
//         onPress={() => replacePhoto(item.id)}
//       >
//         <Icon name="refresh" size={20} color="#FFFFFF" />
//         <Text style={styles.replaceButtonText}>Replace</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         <FlatList
//           data={images}
//           renderItem={renderItem}
//           keyExtractor={item => item.id}
//           numColumns={2}
//           contentContainerStyle={styles.flatListContent}
//           ListEmptyComponent={
//             <View style={styles.emptyListContainer}>
//               <Icon name="image-multiple" size={64} color="#A0AEC0" />
//               <Text style={styles.emptyListText}>No images uploaded yet</Text>
//             </View>
//           }
//         />
//         <TouchableOpacity
//           style={styles.uploadButton}
//           onPress={uploadPhoto}
//           disabled={uploading}
//         >
//           {uploading ? (
//             <ActivityIndicator color="#FFFFFF" />
//           ) : (
//             <>
//               <Icon name="upload" size={24} color="#FFFFFF" style={styles.buttonIcon} />
//               <Text style={styles.buttonText}>Upload Photo</Text>
//             </>
//           )}
//         </TouchableOpacity>
//         {uploadComplete && (
//           <View style={styles.successContainer}>
//             <Icon name="check-circle" size={24} color="#48BB78" />
//             <Text style={styles.successText}>Upload Complete!</Text>
//           </View>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7FAFC',
//   },
//   content: {
//     flex: 1,
//     padding: 16,
//   },
//   flatListContent: {
//     flexGrow:1,
//     paddingBottom: 16,
//   },
//   imageContainer: {
//     flex: 1,
//     margin: 4,
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   image: {
//     width: '100%',
//     aspectRatio: 1,
//   },
//   replaceButton: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 8,
//   },
//   replaceButtonText: {
//     color: '#FFFFFF',
//     marginLeft: 4,
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   emptyListContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 32,
//   },
//   emptyListText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: '#A0AEC0',
//     textAlign: 'center',
//   },
//   uploadButton: {
//     backgroundColor: '#1E1E1E',
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//     marginTop: 16,
//   },
//   buttonIcon: {
//     marginRight: 8,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   successContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 16,
//   },
//   successText: {
//     marginLeft: 8,
//     color: '#48BB78',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });


import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function PhotoScreen() {
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [images, setImages] = useState<Array<{ uri: string, id: string }>>([]);

  // Fetch images from Firebase on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const reference = storage().ref('photos');
        const result = await reference.listAll();

        const imagePromises = result.items.map(async (item) => {
          const url = await item.getDownloadURL();
          return { uri: url, id: item.name };
        });

        const fetchedImages = await Promise.all(imagePromises);
        setImages(fetchedImages);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();
  }, []);

  const chooseImageSource = () => {
    Alert.alert(
      "Select Image Source",
      "Choose an option to upload a photo",
      [
        {
          text: "Camera",
          onPress: () => launchCameraFunction(),
        },
        {
          text: "Gallery",
          onPress: () => launchImageLibraryFunction(),
        },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const launchCameraFunction = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.8,
    }, handleImageResponse);
  };

  const launchImageLibraryFunction = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    }, handleImageResponse);
  };

  const handleImageResponse = async (response:any) => {
    if (response.assets && response.assets[0].uri) {
      const uri = response.assets[0].uri;
      setUploading(true);
      setUploadComplete(false);

      try {
        const fileName = response.assets[0].fileName || `photo_${Date.now()}.jpg`;
        const reference = storage().ref(`photos/${fileName}`);
        await reference.putFile(uri);
        setUploadComplete(true);
        setImages(prevImages => [...prevImages, { uri, id: fileName }]);
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const replacePhoto = (id: string) => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    }, async (response) => {
      if (response.assets && response.assets[0].uri) {
        const newUri = response.assets[0].uri;
        setUploading(true);
        setUploadComplete(false);

        try {
          const reference = storage().ref(`photos/${id}`);
          await reference.putFile(newUri);
          setUploadComplete(true);
          setImages(prevImages => prevImages.map(img =>
            img.id === id ? { ...img, uri: newUri } : img
          ));
        } catch (error) {
          console.error('Replace failed:', error);
        } finally {
          setUploading(false);
        }
      }
    });
  };

  const renderItem = ({ item }: { item: { uri: string, id: string } }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
      <TouchableOpacity
        style={styles.replaceButton}
        onPress={() => replacePhoto(item.id)}
      >
        <Icon name="refresh" size={20} color="#FFFFFF" />
        <Text style={styles.replaceButtonText}>Replace</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Icon name="image-multiple" size={64} color="#A0AEC0" />
              <Text style={styles.emptyListText}>No images uploaded yet</Text>
            </View>
          }
        />
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={chooseImageSource}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Icon name="upload" size={24} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Upload Photo</Text>
            </>
          )}
        </TouchableOpacity>
        {uploadComplete && (
          <View style={styles.successContainer}>
            <Icon name="check-circle" size={24} color="#48BB78" />
            <Text style={styles.successText}>Upload Complete!</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  imageContainer: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  replaceButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  replaceButtonText: {
    color: '#FFFFFF',
    marginLeft: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyListText: {
    marginTop: 16,
    fontSize: 16,
    color: '#A0AEC0',
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  successText: {
    marginLeft: 8,
    color: '#48BB78',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
