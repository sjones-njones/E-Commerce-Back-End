const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// shows all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product, 
          through: ProductTag
        }
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// shows tags by id
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product, 
          through: ProductTag
        }
      ],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tags with that id!' });
      return;
    }
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }  
});

// adds new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body); res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// updates tag by id
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }

});

// deletes tag by id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy ({
      where: {
        id: req.params.id, 
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  
  }
});

module.exports = router;
