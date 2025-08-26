import { useState,useEffect } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db";

function App() {

  const initialCart =()=>{
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

                        //se usa db ya que es un archivo local
  const [data] =useState(db);
  const [cart,setCart] =useState(initialCart);

  const MIN__ITEM = 1;
  const MAX_ITEMS = 5;

  //cada que cart cambie se va a sincronizar automaticamente
  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart))
  },[cart])

  //aca item equivale a guitar del componente Guitar.jsc
  function addToCart(item){

    const itemExists = cart.findIndex((guitar)=>  guitar.id === item.id);
    if(itemExists >=0){//existe en el carrito
      //si al presionar el boton de agregar al carrito solo se puede agregar maximo 5 veces
      if(cart[itemExists].quantity >= MAX_ITEMS){
        return;
      }
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    }
    else{
      //agrega la propiedad quantity al objeto item
      item.quantity =1;
      //prevCart se usa para actualizar el estado que depende del valor anterior del mismo estado
      setCart([...cart,item] );
    }
  }

  function removeFromCart(id){
    //si lo usas como callback vas a tener el valor previo del carrito
    setCart((prevCart)=> prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id){
    const updatedCart = cart.map(item =>{
      if(item.id === id && item.quantity < MAX_ITEMS){
        return{
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item;
    })
    setCart(updatedCart);
  }

  function decreaseQuantity(id){
    const updatedCart = cart.map(item =>{
      if(item.id === id && item.quantity > MIN__ITEM){
        return{
          ...item,
          quantity: item.quantity -1
        }
      }
      return item;
    })
    setCart(updatedCart)
  }

  function clearCart(){
    setCart([])
  }


  return (
    <>

    <Header
    cart={cart} 
    removeFromCart={removeFromCart}
    increaseQuantity={increaseQuantity}
    decreaseQuantity={decreaseQuantity}
    clearCart={clearCart}
    />  

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar)=>
            (
              <Guitar 
                key={guitar.id}//siempre debe ser un valor unico
                guitar={guitar}
                // cart={cart}
                setCart={setCart}
                addToCart={addToCart}
              />
            ))}
            
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
