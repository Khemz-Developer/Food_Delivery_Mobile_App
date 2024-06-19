import Button from '@/components/Button'
import { View, Text ,StyleSheet, TextInput , Image, Alert } from 'react-native'
import React, { useState } from 'react';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';

const CreateProductScreen = () => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const {id} = useLocalSearchParams();

  const isUpdating = !!id;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

  

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const resetFeilds =()=>{
    setName('');
    setPrice('');
  }

  const validateErrors =()=>{

    setError('');

    

    if(!name){
        setError('Name is required');
        return false;
    }
    if(!price){
        setError('Price is required');
        return false;
    }
    if(isNaN(parseFloat(price))){
        setError('Price must be a number');
        return false;
    }
    return true;
    }

  const onSubmit =()=>{
    if(isUpdating){
        onUpdateProduct();
    }else{
        onCreateProduct();
    }
  }

  const onUpdateProduct =()=>{

    if(!validateErrors()){
        return;
    }
    console.log('Updating Product' , name, price);
    // save data to the database
    resetFeilds();
    
  }

  const onCreateProduct =()=>{

    if(!validateErrors()){
        return;
    }
    console.log('Creating Product' , name, price);
    
    // save data to the database
    resetFeilds();
  }

  const onDeleteProduct =()=>{
    
    console.warn('Deleting Product');
    
  }
  const ConfirmDelete =()=>{
    Alert.alert('Confirm', 'Are you sure you want to delete this product?', [
        {
            text: 'No',
            style: 'cancel'
        },
        {
            text: 'Yes',
            onPress: onDeleteProduct,
            
        }
    ])
  }


  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: isUpdating?'Update Product':'Create Product'}}/>
      <Image source={{ uri :image || defaultPizzaImage }} style={styles.image}/>
      <Text onPress={pickImage} style={styles.textImage}>Select Image</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Name of the Product" />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput value={price} onChangeText={setPrice} style={styles.input} placeholder="99.9" keyboardType='numeric'/>
    
      {error ? <Text style={{color:'red'}}>{error}</Text> : null}
      <Button text={isUpdating? 'Update Product' : 'Create Product'} onPress={onSubmit}/>
      {isUpdating && <Text onPress={ConfirmDelete} style={styles.textImage}>Delete Product</Text>}
    
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    label: {
        fontSize: 16,
        color: 'gray'
    },
    input: {
        marginTop: 5,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    image: {
        width: '50%',
       aspectRatio: 1,
        alignSelf: 'center',
        marginBottom: 20
    },
    textImage: {
        textAlign: 'center',
        marginBottom: 10,
        color: Colors.light.tint,
        fontSize: 16,
        fontWeight:'bold'
    }
})

export default CreateProductScreen