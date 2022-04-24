const express = require('express')
const router = express.Router()
const {
  getTables,
  getTable,
  setTable,
  openTable,
  closeTable,
  deleteTable,
} = require('../controllers/tableController')

// const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getTables).post(setTable)
router.route('/:id').delete(deleteTable).post(getTable)
router.put('/open/:id', openTable)
router.put('/close/:id', closeTable)

module.exports = router
