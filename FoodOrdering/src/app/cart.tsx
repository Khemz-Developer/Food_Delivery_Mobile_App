import { View, Text, Platform, FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

import { useCart } from '@/providers/CartProviders';
import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';


const CartScreen = () => {

    const {items,total} = useCart();
  return (
    <View style={{padding:10}}>
      <FlatList contentContainerStyle={{gap:10}} data={items} renderItem={({item}) => (
        <CartListItem cartItem={item} />
        )} />

      <Text style={{fontSize:20,fontWeight:'medium',textAlign:'start',padding:20}}>Total: ${total.toFixed(2)}</Text> 
        <Button text="Checkout" onPress={()=>{}} />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen