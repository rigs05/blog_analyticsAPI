const express = require('express');
const _ = require('lodash');
const router = express.Router();
const axios = require('axios');

// Middleware
const fetchData = async (req, res, next) => {
    try {
        const apiUrl = 'https://intent-kit-16.hasura.app/api/rest/blogs';
        const authToken = req.headers.authorization;    // we could also predefine the token here
        if (!authToken) {
            return res.status(401).send("Unauthorized!");
        }
        
        const response = await axios.get(apiUrl, {
            headers: {
                'x-hasura-admin-secret': authToken
            }
        });
        req.fetched = response.data;
        next();
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching data." });
    }
}


// Blog Stats
router.get('/blog-stats', fetchData, async (req, res) => {
    try {
        // If middleware can't fetch the data from URL
        if ( _.size(req.fetched) == 0 ) {
            return res.status(404).json({ message: "Unable to fetch data from the API." });
        }

        const blogs = req.fetched.blogs;                    // Saving the array of objects in 'blogs'

        const sizeOfBlogs = await _.size(blogs);            // Size of total blogs

        // Atleast 1 object must have 'title' key to fetch the 'longestTitle'
        if (! (blogs.some(blog => _.has(blog, 'title'))) ) {
            return res.status(400).json({ message: "Cannot fetch (title) of blogs. " });
        }

        const longestTitleBlog = await _.maxBy(blogs, (blog) => { return blog.title.length });
        const longestTitle = longestTitleBlog.title;        // Fetching longest title

        // Titles having 'privacy' keyword
        const privacyTitles = await _.size(_.filter(blogs, (blog) => {
            return blog.title.toLowerCase().includes('privacy');
        }));

        const uniqueObj = await _.uniqBy(blogs, (blog) => blog.title.toLowerCase() );
        const uniqueTitles = await _.map(uniqueObj, 'title');

        const sizeofTitles = _.size(uniqueTitles);

        // Returning all the required data in JSON format
        res.status(200).json({
            'Total Number of Blogs': sizeOfBlogs,
            'Longest Title': longestTitle,
            'Number of Blogs having (privacy) Keyword': privacyTitles,
            'Size of Unique Blog Titles': sizeofTitles,
            'Array of Unique Blog Titles': uniqueTitles
        });
        

    } catch (err) {
        res.status(500).json({ message: "Internal server error." });
    }
});


// Blog Search
router.get('/blog-search', fetchData, (req, res) => {
    try {
        const blogs = req.fetched.blogs;
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({ message: "please enter correct query parameters." });
        }
        
        const result = _.filter(blogs, (blog) => {
            return blog.title.toLowerCase().includes(query);
        });

        if (result.length == 0) {
            return res.status(400).json({ error: `Cannot find any blog with keyword ${query}.` });
        }

        res.status(200).json({
            message: `Following blogs found having title ${query}`,
            blogs: result
        })

    } catch (err) {
        res.status(500).json({ message: "Internal server error." });
    }
});


module.exports = router;