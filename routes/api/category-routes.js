const router = require('express').Router();
const {
  Category,
  Product
} = require('../../models');
const {
  update
} = require('../../models/Tag');
const sequelize = require('../../config/connection');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
      attributes: [
        'id',
        'category_name',
        'created_at',
      ],
      order: [
        ['created_at', 'DESC']
      ],
      include: [{
        model: Product,
        attributes: ['product_name']
      }]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'category_name',
        'created_at',
      ],
      include: [{
        model: Product,
        attributes: ['product_name']
      }]
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({
          message: 'No category with this id!'
        });
        return;
      }
      res.json(dbPostData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Category.create({
      category_name: req.param.category_name
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
      Category
    })
    .then(updatedPostData => res.json(updatedPostData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({
          message: 'No Category with this ID!'
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;