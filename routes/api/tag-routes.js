const router = require('express').Router();
const {
  Tag,
  Product,
  ProductTag
} = require('../../models');
const sequelize = require('../../config/connection');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  console.log('=========================');
  Tag.findAll({
      attributes: [
        'id',
        'tag_name',
        'created_at',
      ],
      order: [
        ['created_at', 'DESC']
      ],
      include: [{
          model: Product,
          attributes: ['id', 'product_name']
        },
        {
          model: ProductTag,
          attributes: ['id', 'product_id', 'tag_id']
        }
      ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'tag_name',
        'created_at',
      ],
      include: [{
          model: Product,
          attributes: ['id', 'product_name']
        },
        {
          model: ProductTag,
          attributes: ['id', 'product_id', 'tag_id']
        }
      ]
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({
          message: 'no data found with this id'
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

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.params.tag_name
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, { Tag })
  .then(updatedPostData => res.json(updatedPostData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => {
    if(!dbPostData) {
      res.status(404).json({
        message: 'no data found with this id'
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