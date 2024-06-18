import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product } from "@/types";
import {randomUUID} from 'expo-crypto';
type CartType ={
    items:CartItem[];
    onAddItem:(product:Product,size:CartItem['size'])=>void;
    updateQuantity:(itemId:string,amount:-1 | 1)=>void;
}
const CartContext = createContext<CartType>({
    items:[],
    onAddItem:()=>{},
    updateQuantity:()=>{}
});

const CartProvider = ({children}:PropsWithChildren) =>{
    
    const [items, setItems] = useState<CartItem[]>([]);
   
    const onAddItem = (product:Product,size:CartItem['size']) =>{
      // if already in cart, increase quantity
        const existingItems = items.find((item)=> item.product === product && item.size === size);

        if(existingItems){
            updateQuantity(existingItems.id,1);
            return;
        }
        const newCartItem:CartItem = {
            id:randomUUID(),
            product,
            product_id:product.id,
            size,
            quantity:1
        }
        setItems([newCartItem,...items ]);
      
    };

    // update quantity
    const updateQuantity = (itemId:string,amount:-1 | 1) =>{
       setItems(
        items.map((item) => 
            item.id === itemId
                ? {...item, quantity: item.quantity + amount}
                : item
       )
       .filter((item) => item.quantity > 0)
    );
      
    }
    //console.log(items);
    
    
    return (
        <CartContext.Provider value={{items,onAddItem,updateQuantity}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

export const useCart = () => useContext(CartContext);