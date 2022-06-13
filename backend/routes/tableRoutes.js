const express = require('express')
const router = express.Router()
const {
  getTables,
  getTable,
  setTable,
  openTable,
  closeTable,
  deleteTable,
  updateTable,
} = require('../controllers/tableController')

// const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getTables).post(setTable)
router.route('/:id').get(getTable).put(updateTable).delete(deleteTable)
router.put('/open/:id', openTable)
router.put('/close/:id', closeTable)

module.exports = router
