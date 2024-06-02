import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import "./Products.css";
import { message } from "antd";

const Products = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(id ? `${apiUrl}/api/categories/${id}/products` : `${apiUrl}/api/products`);

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchProducts();
  }, [id, apiUrl]);

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>{id ? "Kategori Ürünleri" : "Tüm Ürünler"}</h2>
        </div>
        <ul className="product-list">
          {products.map((product) => (
            <ProductItem productItem={product} key={product._id} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Products;
