import { StyleSheet, Text, View } from "react-native";
import React from "react";
import orders from "@assets/data/orders";
import { FlatList } from "react-native";
import OrderListItem from "@/components/OrderListItem";

export default function index() {
  return (
    <View >
      <FlatList
        data={orders}
        renderItem={({item})=><OrderListItem order={item}/>}
        contentContainerStyle={{padding:10,gap:10}}
      ></FlatList>
    </View>
  );
}


