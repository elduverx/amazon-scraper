const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

//const apiKey='d2f0bc462386ab09dfc4b95fcd373be6'

const generateScraperUrl = (apiKey) =>`https://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Welcome to Amazon Scraper API.');
});

//GET PRODUCTS DETAILS
 app.get('/products/:productId', async (req,res)=>{
     const {productId} = req.params;
     const {api_key} = req.query
     try {
         const response =  await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
         res.json(JSON.parse(response))
     } catch (error) {
         res.json(error)
     }
 })
//GET PRODUCTS REVIEWS
 app.get('/products/:productId/reviews', async (req,res)=>{
     const {productId} = req.params;
     const {api_key} = req.query
     try {
         const response =  await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
         res.json(JSON.parse(response))
     } catch (error) {
         res.json(error)
     }
 })
 
//GET PRODUCTS OFFERS
 app.get('/products/:productId/offers', async (req,res)=>{
     const {productId} = req.params;
     const {api_key} = req.query
     try {
         const response =  await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
         res.json(JSON.parse(response))
     } catch (error) {
         res.json(error)
     }
 })

//GET Search Results
 app.get('/search/:searchQuery', async (req,res)=>{
     const {searchQuery} = req.params;
     const {api_key} = req.query
     try {
         const response =  await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
         res.json(JSON.parse(response))
     } catch (error) {
         res.json(error)
     }
 })

app.listen(PORT,()=> console.log(`Server running on ${PORT}`));