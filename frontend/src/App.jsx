import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";


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
      <Route path="/success" element={<Success />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
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
