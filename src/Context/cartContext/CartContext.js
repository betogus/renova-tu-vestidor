import React, {createContext, useState, useContext} from 'react';

const CartContext = createContext();

export const useCartContext = () => {
    return useContext(CartContext);
  };

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const totalPrice = () => {
        return cart.reduce((acc, product) => acc + product.quantity * product.price, 0)

    }
    
    const totalQuantity = () => {
        return cart.reduce((acc, product) => acc + product.quantity, 0)
    }
    

    const clear = () => {
        setCart([])
    }

    const isInCart = (id) => {
        const product = cart.find(product => product.id === id)
        return product !==undefined
    }

    const removeItem = (id) => {
        const newCart =[...cart].filter(item => item.id !== id);
        setCart(newCart);
    };

    const addItem = (item) => {
         if (isInCart(item.id)) {
            const newCart = [...cart]
            for (const product of newCart) {
                if (product.id === item.id) {
                    product.quantity += item.quantity;
                }
            } 
            setCart(newCart)
        } else { 
            setCart([...cart, item])
        } 
    }

    

    return (
        <CartContext.Provider value={{cart, addItem, clear, removeItem, isInCart, totalQuantity, totalPrice}}>
            {children}
        </CartContext.Provider>
    )
} 

