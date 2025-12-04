import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"


const Footer = () => {
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    message:""
  })

  const handleChange = (e)=>{
    setFormData((prev)=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    alert(`${formData.name},Thank you for contacting us!`)
  }
  return (
    <section className="relative w-full min-h-screen bg-linear-to-r from-indigo-900 via-purple-800 to-pink-900
    text-white py-24 px-6 sm:px-10">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none">

      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-center">
          Contact Us
        </h2>
        <p className="text-gray-300 mb-12 text-center text-lg sm:text-xl">
          We're here to help you anytime. Send us a message and we'll get back to you soon!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          <div className="space-y-8">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6
            rounded-3xl shadow-lg hover:shadow-cyan-400/30 transition-all">
              <MapPin className="w-8 h-8 text-cyan-400"/>

              
                <div>
                  <h4 className="font-semibold text-lg">Address</h4>
                  <p className="text-gray-300">Sidi talha,tetouan</p>

                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6
              rounded-3xl shadow-lg hover:shadow-cyan-400/30 transition-all">
                <Phone className="w-8 h-8 text-cyan-400"/>

                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <p className="text-gray-300">+0634567891</p>
                </div>

              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6
              rounded-3xl shadow-lg hover:shadow-cyan-400/30 transition-all">
                <Mail className="w-8 h-8 text-cyan-400"/>

                <div>
                  <h4 className="font-semibold text-lg">Email address</h4>
                  <p className="text-gray-300">support@ecommerce.com</p>
                </div>
                </div>

            </div>

            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl
            flex flex-col gap-6">

              <input type="text" name="name" placeholder="Your Name"
              value={formData.name} onChange={handleChange}
              required className="bg-white/10 p-4 rounded-xl text-black placeholder-gray-400
              font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all" />

              <input type="email" name="email" placeholder="Your Email Address"
              value={formData.email} onChange={handleChange}
              required className="bg-white/10 p-4 rounded-xl text-black placeholder-gray-400
              font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all" />

              <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange}
              required rows={5} className="bg-white/10 p-4 rounded-xl text-black placeholder-gray-400
              font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all">

              </textarea>

              <button type="submit" className="bg-linear-to-r from-indigo-500 via-purple-600 to-pink-500
              px-6 py-3 rounded-2xl font-semibold text-white hover:opacity-90 transition-all shadow-lg">
                Send a Message!

              </button>

            </form>

          </div>

        </div>

        <footer className="mt-24 relative z-10 max-w-7xl mx-auto text-center text-gray-300">
          <p className="mb-4">© 2025 E-Commerce. All rights reserved.</p>

          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              FACEBOOK
            </a>
            <a href="#" className="hover:text-white transition-colors">
              X
            </a>
            <a href="#" className="hover:text-white transition-colors">
              INSTAGRAM
            </a>
            
          </div>

        </footer>

      
      

    </section>
  )
}

export default Footer
