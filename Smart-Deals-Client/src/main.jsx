import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layouts/RootLayout.jsx';
import Home from './components/Home/Home.jsx';
import AllProducts from './components/AllProducts/AllProducts.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import MyProducts from './components/MyProducts/MyProducts.jsx';
import MyBids from './components/MyBids/MyBids.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import ProductPage from './components/ProductPage/ProductPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
      {
        index: true,
        Component: Home
      },
      {
        path: "allProducts",
        Component: AllProducts
      },
      {
        path:"register",
        Component: Register
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "myProducts",
        element:<PrivateRoute><MyProducts></MyProducts></PrivateRoute>
      },
      {
        path: "myBids",
        loader: () => fetch('http://localhost:3000/products'),
        element: <PrivateRoute><MyBids></MyBids></PrivateRoute>
      },
      {
        path: "products/:id",
        loader: ({params}) => fetch(`http://localhost:3000/products/${params.id}`),
        Component: ProductPage
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
     <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>,
)
