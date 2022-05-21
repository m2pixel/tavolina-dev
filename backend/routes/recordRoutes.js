const express = require('express')
const router = express.Router()
const {
  getRecord,
  getRecords,
  createRecord,
} = require('../controllers/recordController')

router.route('/').get(getRecords).post(createRecord)
router.route('/:id').get(getRecord)

module.exports = router
