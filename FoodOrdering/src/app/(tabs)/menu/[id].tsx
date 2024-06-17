import { View, Text, Image, StyleSheet , Pressable } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { useState } from "react";
import Button from "@components/Button";
import { useCart } from "@/providers/CartProviders";
import { PizzaSize } from "@/types";

const productDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const {onAddItem} = useCart();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("S");

  const product = products.find((p) => p.id.toString() == id);
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

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        style={styles.image}
        source={{ uri: product?.image || defaultPizzaImage }}
      />

      <Text>Select Sizes </Text>

      <View style={styles.sizes}>
        {sizes.map((size)  => (
          <Pressable onPress={() => setSelectedSize(size)}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? "#e3e3e3" : "white",
              },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? "black" : "gray",
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>
      <Button text="Add to Cart " onPress={addtoCart} />
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
    fontWeight: "bold",
    marginTop:'auto',
    paddingLeft:10,
    paddingBottom:10
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "#e3e3e3",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
export default productDetailsScreen;
