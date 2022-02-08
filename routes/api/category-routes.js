const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  Category.findAll(
    {
      include: {
        model: Product,
        attributes: ["product_name"]
      }
    }
  )
    .then((categoryData) => {
      res.json(categoryData)
    });

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  const options = { include: { model: Product, attributes: ["category_id"] }};
  Category.findByPk(req.params.id, options)
    .then((categoryData) => {
      res.json(categoryData);
    })
    
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory);
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((deletedCategory) => {
      res.json(deletedCategory)
    })
});

module.exports = router;
