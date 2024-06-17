import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product } from "@/types";

type CartType ={
    items:CartItem[];
    onAddItem:(product:Product,size:CartItem['size'])=>void;

}
const CartContext = createContext<CartType>({
    items:[],
    onAddItem:()=>{}
});

const CartProvider = ({children}:PropsWithChildren) =>{
    
    const [items, setItems] = useState<CartItem[]>([]);
   
    const onAddItem = (product:Product,size:CartItem['size']) =>{
      
        const newCartItem:CartItem = {
            id:'1',
            product,
            product_id:product.id,
            size,
            quantity:1
        }
        setItems([newCartItem,...items ]);
      
    }

    console.log(items);
    
    
    return (
        <CartContext.Provider value={{items,onAddItem}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

export const useCart = () => useContext(CartContext);