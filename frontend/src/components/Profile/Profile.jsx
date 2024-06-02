import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, message, Card, List, Typography, Space } from 'antd';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDleteModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [favorites, setFavorites] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData && userData.email) {
          const response = await fetch(`${apiUrl}/api/auth/profile/${userData.email}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        message.error('Kullanıcı bilgileri alınırken bir hata oluştu.');
      }
      console.log(user);
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const id = userData._id || userData.id;
        if (userData) {
          const response = await fetch(`${apiUrl}/api/favorite/list/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setFavorites(data.favorites);
        }
      } catch (error) {
        message.error('Favoriler alınırken bir hata oluştu.');
      }
      console.log(favorites);
    };

    fetchFavorites();
  }, []);
  const handleDeleteProfile = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      localStorage.removeItem("user");
      if (userData) {
        const response = await fetch(`${apiUrl}/api/users/${userData.email}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      }
    } catch (error) {
      message.error('Favoriler alınırken bir hata oluştu.');
    }
  }
  const handleUpdate = async (values) => {
    try {
      const updatedUser = { ...user, ...values, id: user.id }; 
      const response = await fetch(`${apiUrl}/api/auth/updateProfile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsModalOpen(false);
      message.success('Bilgiler güncellendi.');
    } catch (error) {
      message.error('Bilgiler güncellenirken bir hata oluştu.');
    }
  };

  const openModal = () => {
    form.setFieldsValue(user); 
    setIsModalOpen(true);
  };

  const openDeleteModal = () => {
    setIsDleteModalOpen(true);
    handleDeleteProfile();
    window.location.href="/auth";
  };

  const closeDeleteModal = () => {
    setIsDleteModalOpen(false);
  }
  const closeModal = () => setIsModalOpen(false);

  const handleRemoveFavorite = async (productId) => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const id = userData.id || userData._id;
      const response = await fetch(`${apiUrl}/api/favorite/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id,
          productId,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedFavorites = favorites.filter(fav => fav.productId._id !== productId);
      setFavorites(updatedFavorites);
      message.success('Ürün favorilerden çıkarıldı.');
    } catch (error) {
      message.error('Favori çıkarılırken bir hata oluştu.');
    }
  };

  if (!user) {
    return <div className="profile-loading">Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="profile-container">
        <Card className="profile-card" title="Profil" extra={<div style={{display: "flex", gap: 20}}>
          <Button type="primary" onClick={openModal}>Bilgileri Güncelle</Button>
          <Button danger type="primary" onClick={openDeleteModal}>Profili Sil</Button>
        </div>}>
          <p><strong>Kullanıcı Adı:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Adres:</strong> {user.address}</p>
        </Card>
        <Modal
          title="Profili sil"
          open={isDeleteModalOpen}
          onCancel={closeDeleteModal}
          footer={null}
        >
          <p><strong>Emin misin?</strong></p>
          <div style={{display: "flex", gap: 20}}>
            <Button type="primary" onClick={closeDeleteModal}>Hayır</Button>
            <Button danger type="primary" onClick={openDeleteModal}>Evet</Button>
          </div>
        </Modal>
        <Modal
          title="Bilgileri Güncelle"
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdate}
          >
            <Form.Item
              label="Kullanıcı Adı"
              name="username"
              rules={[{ required: true, message: 'Kullanıcı adı gereklidir' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email gereklidir' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Adres"
              name="address"
              rules={[{ required: true, message: 'Adres gereklidir' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Button onClick={closeModal} style={{ backgroundColor: '#f44336', color: '#fff', border: 'none' }}>
                  İptal
                </Button>
                <Button type="primary" htmlType="submit">
                  Kaydet
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <div className="favorites-container">
        <Typography.Title level={2} style={{ textAlign: 'center' }}>Favorilerim</Typography.Title>
        {favorites.length === 0 ? (
          <Typography.Text style={{ display: 'flex', justifyContent: 'center' }}>Henüz favori ürününüz yok.</Typography.Text>
        ) : (
          <List
          style={{padding:80}}
          grid={{ gutter: 16, column: 3 }}
          dataSource={favorites}
          renderItem={favorite => (
            <List.Item
              actions={[
                <Button danger type='primary' style={{display: "flex", justifyContent: "ce"}} onClick={() => handleRemoveFavorite(favorite.productId._id)}>Favorilerden Çıkar</Button>
              ]}
            >
              <Card
                hoverable
                style={{minHeight:400}}
                cover={<img alt={favorite.productId.name} src={favorite.productId.img[0]} style={{ height: '200px', objectFit: 'cover' }} />}
                onClick={() => window.location.href=`/product/${favorite.productId._id}`}
              >
                <Card.Meta title={favorite.productId.name}/>
                <div dangerouslySetInnerHTML={{ __html: favorite.productId.description }}/> 
              </Card>
            </List.Item>
          )}
        />
        )}
      </div>
    </div>
  );
};

export default Profile;
