import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import orders from '../../../../assets/data/orders';
import OrderListItem from '@/components/OrderListItem';
import OrderItemListItem from '@/components/OrderItemListItem';
import { FlatList } from 'react-native';
export default function OrderId() {
    const {id} = useLocalSearchParams();

    const order = orders.find((order)=>order.id.toString() === id);

  

    if(!order) {
        return <Text>Order not found</Text>
    }


  return (
    <View style={{padding:10, gap:10,flex:1}}>
      <Stack.Screen options={{title:  `Order #${id}`}} />
      {/* <OrderListItem order={order} /> */}
      <FlatList data={order.order_items} renderItem={({item})=> <OrderItemListItem item={item}  />} contentContainerStyle={{gap:10}
    } ListHeaderComponent={()=> <OrderListItem order={order}/>} />
    </View>
  )  
}

const styles = StyleSheet.create({})