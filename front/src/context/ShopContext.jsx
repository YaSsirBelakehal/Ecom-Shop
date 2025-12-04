import { createContext, useState, useEffect, Children } from "react";
import {all_products} from '../assets/data'
import axios from "axios"


export const ShopContext = createContext()

const ShopContextProvider = ({children})=>{
    const [cartItems, setCartItems]  = useState({})
    const url = "http://localhost:4000"
    const [allProducts] = useState(all_products)
    const [token,setToken] = useState("")
    const [products, setProducts] = useState([])


useEffect(()=>{
    const savedCart = localStorage.getItem("cartItems")
    if(savedCart){
        setCartItems(JSON.parse(savedCart))
    }

},[])


useEffect(()=>{
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
},[cartItems])

const addToCart = async (id)=>{
    const productId = id.toString()
    setCartItems((perv)=>({
        ...perv,
        [id]:perv[id]? perv[id]+1:1
    }))
    if(token){
        await axios.post(`${url}/api/cart/add`, {id:productId}, {headers:{token}})
    }
}

const removeFromCart = async (id, removeAll = false)=>{
    const productId = id.toString()
    setCartItems((perv)=>{
        const updated = {...perv}
        if(removeAll || updated[id]===1) delete updated[id]
        else updated[id]--
        return updated
    })
    if(token){
        try{
            await axios.post(`${url}/api/cart/remove`, {id:productId}, {headers:{token}})
        }catch(err){
            console.log(err)
        }
    }
}

const clearCart = async()=>{
    if(!token) console.log("Error")
        try{
    const res = await axios.post(`${url}/api/cart/clear`, {}, {headers:{token}})
    setCartItems({})
}catch(err){
            console.log(err)
        }
}

const getTotalCartAmount = ()=>{
    return Object.entries(cartItems).reduce((total,[id,qty])=>{
        const product = products.find((p)=>p._id === id)
        return total + (product ? product.price * qty : 0)
    },0)
}

const fetchProductsList = async()=>{
    try{
        const res = await axios.get(`${url}/api/product/list`)
        setProducts(res.data.data || [])
    }catch(err){
            console.log(err)
            setProducts(all_products)
        }
}

const loadCartData = async(token)=>{
    const res = await axios.post(url+"/api/cart/get" , {} , {headers:{token}})
}


useEffect(()=>{
    async function loadData() {
        await fetchProductsList()
    if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"))
    }
   }
   loadData()
},[])

const value = {
    all_products:products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    url,
    setToken,
    clearCart,
    setCartItems
}

return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>

}

export default ShopContextProvider