const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // Tag.findAll().then((tagData) => {
  //   res.json(tagData);
  // })
  Tag.findAll(
    {
      include: {
        model: Product
      }
    }
  )
    .then((tagData) => {
      res.json(tagData);
    })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // Tag.findByPk(req.params.id).then((tagData) => {
  //   res.json(tagData);
  // })
  const options = { include: { model: Product }};

  Tag.findByPk(req.params.id, options)
    .then((tagData) => {
      res.json(tagData);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((newTag) => {
      res.json(newTag);
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then((updatedTag) => {
      res.json(updatedTag);
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
});

module.exports = router;
