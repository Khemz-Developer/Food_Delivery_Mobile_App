import { StyleSheet , Text, View ,Image ,FlatList, ActivityIndicator} from 'react-native';
import ProductListItem from '@components/ProductListItem';
import { useProductList } from '@/api/products';

export default function MenuScreen() {

  const {data:products, error ,isLoading} = useProductList();

  if(isLoading){
    return <ActivityIndicator/>
  }
  
  if(error){
    return <Text>{error.message}</Text>
  }
  
  return (
     <View>
      {/* <ProductListItem product={products[0]}/>
      <ProductListItem product={products[1]}/> */}

      <FlatList data={products} renderItem={({item}) => <ProductListItem product={item}/>} numColumns={2} contentContainerStyle={{gap:10 , padding:10 }} columnWrapperStyle={{gap:10}} />
     </View>
  );
}


