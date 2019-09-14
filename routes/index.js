const router = require('express').Router();

const Url = require('../models/url');

// @route GET /:code
// @desc  Redirect to long/original URL
router.get('/:code', async(req, res) => {
   try {
      const url = await Url.findOne({ urlCode: req.params.code });
      const expire = url.expire;
      const currentTime = new Date();

      if(url && currentTime < expire) {
         return res.redirect(url.longUrl)
      }
      else {
         return res.status(404).json('No Url found')
      }
   } catch (error) {
      console.error(error);
      res.sendStatus(500).json("Server Error")
   }
})

module.exports = router