import { useState } from "react"
import axios from "axios"




const Add = () => {

    const url= "http://localhost:4000"
    const [image , setImage] = useState(null)
    const [data , setData] = useState({
        name:"",
        description:"",
        price:"",
        category:""
    })

    const onChangeHandler = (event)=>{
        const {name, value} = event.target
        setData((perv)=>({...perv , [name]:value}))
    }
    const onImageChange = (event)=>{
        if(event.target.files && event.target.files[0]){
            setImage(event.target.files[0])
        }
    }

    const onSubmitHandler = async(event)=>{
        event.preventDefault()
        const formData = new FormData()
        formData.append("name" , data.name)
        formData.append("description" , data.description)
        formData.append("price" , Number(data.price))
        formData.append("category" , data.category)
        if(image) formData.append("image" , image)
            try{
        const res = await axios.post(`${url}/api/product/add` , formData)
    if(res.data.success){
        setData({name:"" , description:"" , price:"" , category:"Men"})
        setImage(null)
        alert("The product has been successfully added!")
    }}catch(err){
        console.error(err)
        alert("An error occurred while adding the product")
    }
    }
  return (
    <section className="relative w-full min-h-screen bg-linear-to-r from-indigo-900 via-purple-900
    to-pink-900 text-white py-24 px-6 sm:px-10">
        <form onSubmit={onSubmitHandler}>
            <div className="relative z-10 max-w-3xl mx-auto bg-white/10 backdrop-blur-md
            p-10 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-center">Add a new product</h2>
                <div className="space-y-4">
                    
                    <input type="text" name="name" placeholder="Product name"
                    value={data.name} onChange={onChangeHandler}
                    className={`w-full px-4 py-3 rounded-xl bg-white/15 text-white
                    placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none`} />

                    <input type="text" name="description" placeholder="Description"
                    value={data.description} onChange={onChangeHandler}
                    className={`w-full px-4 py-3 rounded-xl bg-white/15 text-white
                    placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none`} />
                    
                    <input type="number" name="price" placeholder="Price"
                    value={data.price} onChange={onChangeHandler}
                    className={`w-full px-4 py-3 rounded-xl bg-white/15 text-white
                    placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none`} />

                    <select name="category" value={data.category} onChange={onChangeHandler}
                    className="w-full px-4 py-3 rounded-xl bg-white/15 text-white
                    focus:ring-2 focus:ring-cyan-400 outline-none">

                        <option className="text-black">Men</option>
                        <option className="text-black">Women</option>
                        <option className="text-black">Kids</option>
                        <option className="text-black">Electronics</option>
                        <option className="text-black">Cosmetics</option>

                    </select>

                    <input type="file" accept="image/*" onChange={onImageChange}
                    className="w-full text-white" />Add Image

                    {image &&(
                        <img src={URL.createObjectURL(image)} className="w-full
                        h-64 object-cover rounded-2xl mt-2"/>
                    )}

                    <button type="submit" className="w-full bg-linear-to-r
                    from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 rounded-2xl font-semibold
                    hover:opacity-90 transition-all text-white shadow-lg mt-4">
                        Add a product
                        
                    </button>

                </div>

            </div>

        </form>
    </section>
  )
}

export default Add
