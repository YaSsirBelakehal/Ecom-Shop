import { useContext, useEffect, useState } from "react"
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Order = () => {
  const { cartItems, all_products, getTotalCartAmount, url, token } = useContext(ShopContext)
  const navigate = useNavigate()
  const total = getTotalCartAmount()

  const cartProducts = Object.keys(cartItems).map((id)=>{
    const product = all_products.find((p)=>p._id === id)
    return product ? { ...product, quantity: cartItems[id]} : null
  }).filter(Boolean)

  const [shipping,setShipping] = useState({
    name:"",
    address:"",
    city:"",
    phone:""
  })

  const handleChange = (e)=>{
    setShipping({ ...shipping, [e.target.name]: e.target.value})
  }

  const handleConfirmOrder = ()=>{
    if(!shipping.name || !shipping.address || !shipping.city || !shipping.phone){
      alert("Please fill in all shipping details!")
      return
    } 
    alert("The order was successfully submitted!")
    navigate("/")
  }

  const placeOrder = async(e)=>{
    e.preventDefault()
    let orderItems = []
    all_products.map((item)=>{
      if(cartItems[item._id] > 0){
        let itemInfo = item
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:shipping,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }
    let res = await axios.post(url + "/api/order/place", orderData, {headers:{token}})
    if(res.data.succes){
      const {session_url} = res.data
      window.location.replace(session_url)
    }else{
      alert("Error")
    }
  }

  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }else if(getTotalCartAmount() === 0){
      navigate('/cart')
    }
  },[token])
  return (
    <section className="relative w-full min-h-screen bg-linear-to-r from-indigo-900 via-purple-900
    to-pink-900 text-white py-24 px-6 sm:px-10">
      
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none">

      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center">
          Complete the order
        </h2>
        {cartProducts.length === 0 ? (
          <div className="text-center text-gray-300 mt-20 space-y-6">
            <p className="text-xl">The cart is empty now</p>

            <button onClick={()=>navigate("/")} className="bg-linear-to-r from-cyan-500 to-blue-500
            px-8 py-3 rounded-2xl font-semibold text-white hover:opacity-90 transition-all">
              Back to shopping

            </button>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              {cartProducts.map((item)=>(
                <div key={item._id} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl
                shadow-lg border border-white/20">
                  <img src={url + "/images/" + item.image} className="w-20 h-20 object-contain rounded-xl"/>

                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-300">Quantity: {item.quantity}</p>
                    <p className="text-cyan-400 font-bold">${item.price.toFixed(2)}</p>
                  </div>

                </div>
              ))}

              <div className="text-xl font-bold mt-6">
                Total:
                <span className="text-cyan-400 ml-2">${total.toFixed(2)}</span>

              </div>

            </div>

            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20 shadow-xl">

            <h3 className="text-2xl font-semibold mb-6 text-center">
              Shipping Data

            </h3>

            <div className="space-y-4">
              <form onSubmit={placeOrder}>
              <input type="text" name="name" placeholder="Full Name" value={shipping.name} onChange={handleChange}
              className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl
              outline-none focus:ring-2 focus:ring-cyan-400" />

              <input type="text" name="address" placeholder="Full Address" value={shipping.address} onChange={handleChange}
              className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl
              outline-none focus:ring-2 focus:ring-cyan-400" />

              <input type="text" name="city" placeholder="City" value={shipping.city} onChange={handleChange}
              className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl
              outline-none focus:ring-2 focus:ring-cyan-400" />

              <input type="text" name="phone" placeholder="Phone" value={shipping.phone} onChange={handleChange}
              className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl
              outline-none focus:ring-2 focus:ring-cyan-400" />

              <button onClick={handleConfirmOrder} className="w-full bg-linear-to-r from-indigo-500
              via-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:opacity-90
              transition-all mt-4">
                Order confirmation

              </button>

              </form>

            </div>

            </div>

          </div>
        )}

      </div>

    </section>
  )
}

export default Order
