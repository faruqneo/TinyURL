const router = require('express').Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/url');

// @route POST /api/url/shorten
// @desc  Create short URL
router.post('/shorten', async (req, res) => {
   const { longUrl } = req.body;
   const baseUrl = config.get('baseURl');

   // Check baseUrl
   if(!validUrl.isUri(baseUrl))
   return res.sendStatus(401).json('Invalid baseUrl');

   //Create Url code
   const urlCode = shortid.generate();

   // Check long url
   if(validUrl.isUri(longUrl)) {
      try {
         let url = await Url.findOne({longUrl});

         if(url)
            res.json(url);
         else
         {
            const shortUrl =  baseUrl+ '/' +urlCode;
            const currentDate = new Date();
            const expireDate = new Date().setHours(new Date().getHours() + 2);

            url = new Url({
               longUrl,
               shortUrl,
               urlCode,
               date: currentDate,
               expire: expireDate
            });

            await url.save();
            res.json(url);
         }
          
      } catch (error) {
         console.error(error);
         res.status(500).json('Server error')
      }
   }
   else {
      res.status(401).json('Invalid long url')
   }

})



module.exports = router