@BLOG_ANALYTICS API

-> Modules used: Nodemon, Express, Axios, Lodash

-> app.js : root file containing all the routes and server establishment.

-> routes/analytics.js :
    
    * fetchData : Middleware function fetching the data from URL by making request using AXIOS and including the headers fetched from req.headers

    * API ENDPOINTS (GET) :
        
        1. localhost:5000/api/blog-stats
            * CURL COMMAND :
            curl --request GET \
            --url localhost:5000/api/blog-stats \
            --header 'authorization: 32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'

            := Fetches Total blogs, Longest Title, Blogs having 'privacy' keyword, Unique Blog Titles.


        2. localhost:5000/api/blog-search?query=privacy
            * CURL COMMAND :
            curl --request GET \
            --url localhost:5000/api/blog-search?query=privacy \
            --header 'authorization: 32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'

            := Fetches result data as per query searches.


# How to Use CURL commands in POSTMAN :
    1. Open postman application, hold " ctrl + O " or Options -> File -> Import, and paste the CURL command.
    2. Save these CURL commands in the text file, then import using the steps above in 1.