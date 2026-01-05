import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryPage from "./pages/CategoryPage";
import { CartProvider } from "./context/CartContext";
import AddProduct from "./admin/AddProducts";
import ProductDetails from "./pages/ProductDetails";
import WhatsappButton from "./components/WhatsAppButton";
import CheckoutPage from "./pages/CheckoutPage";
import Order from "./admin/Order";
import ThankYouPage from "./pages/ThankYouPage";
import MyOrders from "./pages/MyOrders";
import ActionBar from "./components/ActionBar";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/ProfilePage";
import AllCategories from "./pages/AllCategories";
import AboutUs from "./pages/AboutUs";
import SearchPage from "./pages/SearchPage";
import AdminDashboard from "./admin/AdminDashboard";
import EditProduct from "./admin/EditProducts";
// import ProductManage from "./admin/ProductManager";
import FreeDeliveryBanner from "./components/DeliveryBanner";
import AdminOffer from "./admin/AdminOffer";
import AdminLogin from "./admin/AdminLogin";
import AdminSettings from "./admin/AdminSetting";
import AdminRoute from "./admin/AdminRoute";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop /> {/* Scroll to top on route change */}
        <Header />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/myorder" element={<MyOrders />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/offer" element={<AdminOffer />} />
            <Route path="/admin/products/edit/:id" element={<EditProduct />} />
            <Route path="/admin/order" element={<Order />} />
            <Route
              path="/admin/settings"
              element={
                <AdminRoute>
                  <AdminSettings />
                </AdminRoute>
              }
            />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/categories" element={<AllCategories />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        <FreeDeliveryBanner />
        <WhatsappButton
          phoneNumber="917522074547"
          message="Hello! I have a question about your website."
        />
        <ActionBar />
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
