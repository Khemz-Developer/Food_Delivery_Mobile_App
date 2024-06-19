import { StyleSheet, Text, View, Image, Pressable} from "react-native";
import {Product} from '../types';
import { Link, useSegments } from "expo-router";

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png'

type ProductListItemProps = {
    product: Product;
    };


const ProductListItem = ({ product }: ProductListItemProps) => {
  
  const segments = useSegments();
  console.log(segments)
  return (
  <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
    <Pressable   style={styles.container}>
      <Image resizeMode="contain" source={{ uri: product.image || defaultPizzaImage  }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}> ${product.price}</Text>
     
    </Pressable>
   </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex:1,
    maxWidth: "50%",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 30,
  },
  price: {
    color: "red",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
