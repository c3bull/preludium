import React from "react";
import './index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/layouts/Navbar";
import OrderPage from "./pages/OrderPage";
import PricesPage from "./pages/PricesPage";
import Products from "./pages/Products";
import ProductsDetails from "./pages/ProductsDetails";
import Footer from "./components/footer/Footer";
import YourOrdersPage from "./pages/YourOrdersPage";
import ScrollToTop from "./components/utils/ScrollToTop";
import Sidebar from "./components/layouts/Sidebar";
import {client} from "./ApolloClient/client";
import {ApolloProvider} from '@apollo/client';
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";

function App() {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Navbar/>
                <Sidebar/>
                <ScrollToTop>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/o-nas' element={<About/>}/>
                        <Route path='/kontakt' element={<Contact/>}/>
                        <Route path='/produkty' element={<Products/>}/>
                        <Route path='/cennik' element={<PricesPage/>}/>
                        <Route path='/zamow' element={<OrderPage/>}/>
                        <Route path='/zaloguj' element={<Login/>}/>
                        <Route path='/rejestracja' element={<Register/>}/>
                        <Route path='/produkty/:category' element={<ProductsDetails/>}/>
                        <Route path='/twoje-zamowienia' element={<YourOrdersPage/>}/>
                        <Route path='/administrator' element={<AdminPanel/>}/>
                        <Route path='/administrator/zamowienia' element={<AdminOrders/>}/>
                        <Route path='/administrator/uzytkownicy' element={<AdminUsers/>}/>
                    </Routes>
                </ScrollToTop>
                <Footer/>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
