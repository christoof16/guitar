import { useState, useEffect,useMemo } from "react"
import { db } from "../data/db";

const useCart = () => {

    /*initualCart su valor es un array vacio al principio,
    despues cuando vas agregando guitarras el valor va 
    cambiando*/
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');
        //convierte el JSON a objeto, si no hay nada devuelve un array vacio
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    //se usa db ya que es un archivo local
    const [data] = useState(db);
    //el valor inicial de cart es initialCart
    const [cart, setCart] = useState(initialCart);

    const MIN__ITEM = 1;
    const MAX_ITEMS = 5;

    useEffect(() => {
        //convierte el cart en JSON
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])   //Cada vez que cart cambie, guarda el carrito en el localStorage

    //aca item equivale a guitar del componente Guitar.jsc
    function addToCart(item) {

        /*item.id representa el objeto id de guitar cuando presionas en el 
        boton de agregar al carrito, y guitar.id representa el objeto almacenado
        del carrito, la primera vez que agregas un tipo de guitarra el
        item.id sera -1 o no existe*/
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
        if (itemExists >= 0) {//existe en el carrito
            //si al presionar el boton de agregar al carrito solo se puede agregar maximo 5 veces
            if (cart[itemExists].quantity >= MAX_ITEMS) {
                return;
            }
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++;
            setCart(updatedCart);
        }
        else {
            //agrega la propiedad quantity al objeto item
            item.quantity = 1;
            //prevCart se usa para actualizar el estado que depende del valor anterior del mismo estado
            setCart([...cart, item]);
        }
    }

    function removeFromCart(id) {
        //si lo usas como callback vas a tener el valor previo del carrito
        setCart((prevCart) => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item;
        })
        setCart(updatedCart);
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN__ITEM) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item;
        })
        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }

    //se usa para el Header.jsx ----------------
        //state derivado
    const isEmpty =useMemo(()=> cart.length === 0,[cart]) 
                        //cart del otro state (por eso es state derivado)
    //este codigo solo se ejecuta cuando carrito haya sido modificado

     //se usa para el Header.jsx ----------------
    //evita que este codigo se ejecute si alguna de las dependencias que se definen en el usermemo no hayan cambiado, este codigo solo se ejecuta cuando carrito haya sido modificado
    const cartTotal = useMemo(()=> cart.reduce((total,item)=>total+(item.quantity *item.price),0),[cart]);

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}

export default useCart;