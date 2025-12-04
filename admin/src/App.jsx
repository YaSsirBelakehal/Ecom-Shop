
import Add from "./components/Add"
import List from "./components/List"
import Orders from "./components/Orders"
import Sidebar from "./components/Sidebar"
import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminLogin from "./components/AdminLogin"
import { Toaster } from "react-hot-toast"
import Users from "./components/Users"
import Notifications from "./components/Notifications"

const App = () => {
  return (
    <>
    <Toaster/>
    <Sidebar/>
    <Routes>
      <Route path="/admin/login" element={<AdminLogin/>}/>

      <Route path="/admin/add" element={<ProtectedRoute> <Add/> </ProtectedRoute>}/>

      <Route path="/admin/list" element={<ProtectedRoute> <List/> </ProtectedRoute>}/>

      <Route path="/admin/orders" element={<ProtectedRoute> <Orders/> </ProtectedRoute>}/>

      <Route path="/admin/users" element={<ProtectedRoute> <Users/> </ProtectedRoute>}/>

      <Route path="/admin/notifications" element={<ProtectedRoute> <Notifications/> </ProtectedRoute>}/>
    </Routes>
    </>
  )
}

export default App
