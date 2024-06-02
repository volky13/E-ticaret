import { Modal, Input, Button } from "antd";
import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [resetPasswordData, setResetPasswordData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        message.success("Giriş başarılı.");
        if (data.role === "admin") {
          window.location.href = "/admin";
        } else {
          navigate("/");
        }
      } else {
        message.error("Giriş başarısız.");
      }
    } catch (error) {
      console.log("Giriş hatası:", error);
    }
  };

  const handleResetPasswordInputChange = (e) => {
    const { name, value } = e.target;
    setResetPasswordData({ ...resetPasswordData, [name]: value });
  };

  const handleResetPassword = async () => {
    if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
      message.error("Şifreler eşleşmiyor.");
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetPasswordData),
      });

      if (response.ok) {
        message.success("Şifre sıfırlama başarılı.");
        setModalVisible(false);
      } else {
        message.error("Şifre sıfırlama başarısız.");
      }
    } catch (error) {
      console.log("Şifre sıfırlama hatası:", error);
    }
  };

  return (
    <div className="account-column">
      <h2>Giriş yap</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            <span>
              Kullanıcı adı veya e-posta <span className="required">*</span>
            </span>
            <input type="text" name="email" onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            <span>
              Şifre <span className="required">*</span>
            </span>
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <p className="remember">
          <button className="btn btn-sm">Giriş yap</button>
        </p>
        <a href="#" className="form-link" onClick={() => setModalVisible(true)}>
          Şifreni mi unuttun?
        </a>
      </form>

      <Modal
        title="Reset Password"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            İptal
          </Button>,
          <Button key="submit" type="primary" onClick={handleResetPassword}>
            Gönder
          </Button>,
        ]}
      >
        <div>
          <label>
            <span>E-posta</span>
            <Input
              type="email"
              name="email"
              value={resetPasswordData.email}
              onChange={handleResetPasswordInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            <span>Şifre</span>
            <Input
              type="password"
              name="newPassword"
              value={resetPasswordData.newPassword}
              onChange={handleResetPasswordInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            <span>Şifre tekrar</span>
            <Input
              type="password"
              name="confirmPassword"
              value={resetPasswordData.confirmPassword}
              onChange={handleResetPasswordInputChange}
            />
          </label>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
