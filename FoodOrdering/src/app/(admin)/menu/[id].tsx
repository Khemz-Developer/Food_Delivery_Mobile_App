import { View, Text, Image, StyleSheet , Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { useState } from "react";
import Button from "@components/Button";
import { useCart } from "@/providers/CartProviders";
import { PizzaSize } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useProduct } from "@/api/products";


const productDetailsScreen = () => {
  
  const { id :idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const {data:product,error,isLoading} = useProduct(id);


  const router = useRouter();

  const {onAddItem} = useCart();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("S");

  //const product = products.find((p) => p.id.toString() == id);
  const sizes:PizzaSize[] = ["S", "M", "L", "XL"];

  if (!product) {
    return <Text>Product not found</Text>;
  }
  
  const addtoCart = () => {
    if(!product){
      return;
    } 
    onAddItem(product,selectedSize);
    router.push("/cart");
  }

  if(isLoading){
    return <ActivityIndicator/>
  }

  if(error){
    return <Text>Failed to fetch the product</Text>
  }
  return (
    <View style={styles.container}>
       <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil-square-o"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        style={styles.image}
        source={{ uri: product?.image || defaultPizzaImage }}
      />

      
      <Text style={styles.title}> {product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    
   </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: "medium",
    paddingLeft: 10,
    
  },
  title: {
    fontSize: 24,
    fontWeight: "medium",
   
  },
 
});
export default productDetailsScreen;
