import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";


import "./App.css";
import CategoryPage from "./pages/Admin/Categories/CategoryPage";
import UpdateCategoryPage from "./pages/Admin/Categories/UpdateCategoryPage";
import CreateCategoryPage from "./pages/Admin/Categories/CreateCategoryPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import Success from "./pages/Success";
import OrderPage from "./pages/Admin/OrderPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/success" element={<Success />} />
          <Route path="/admin/*">
            <Route index element={<DashboardPage />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="categories/create" element={<CreateCategoryPage />} />
            <Route path="categories/update/:id" element={<UpdateCategoryPage />} />
            <Route path="orders" element={<OrderPage />} />
          </Route>
    </Routes>
  );
}

export default App;
