const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorite.js');

router.post('/add', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const existingFavorite = await Favorite.findOne({ userId, productId });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Bu ürün zaten favorilere eklenmiş.' });
    }
    const newFavorite = new Favorite({ userId, productId });
    await newFavorite.save();
    res.status(201).json({ message: 'Favori eklendi', favorite: newFavorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
});

router.get('/list/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const favorites = await Favorite.find({ userId }).populate('productId');
    res.status(200).json({ favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

router.delete('/remove', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const result = await Favorite.findOneAndDelete({ userId, productId });

    if (result) {
      res.status(200).json({ message: 'Favori çıkarıldı' });
    } else {
      res.status(404).json({ message: 'Favori bulunamadı' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
