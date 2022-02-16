# Final Project: Go Scandinavia

For our 4-week final project ”Go Scandinavia” @Technigo we’ve built a travel community aimed at anyone who’d like to discover the countries of Sweden, Norway and Denmark. Wether you are new to the area or lived there all your life there is always something new to explore. All users can browse and like content of the site while signed in members also can contribute to the site by posting travel tips of their own and comment on other users posts. They can also save posts they like to their account to easily check them out later when planning their next Scandinavian adventure!

## Site Description

The site has a dark yet vibrant color scheme inspired by the northern lights and is applied throughout. The landing page has, besides the navbar, two main functionality features in shape of a keyword search bar and a choose-a-country section.

In the search bar the user can query for a keyword e.g. ”food” and get a list of all posts made that contains that word in any of it’s relevant properties. Clicking on the individual posts listed leads to a separate page with all the information about the post provided by the author (name, location, description, rating etc.). This is also where you can comment and save the post if you are signed in.

By clicking on a country in the country section of the landing page the user can access it’s country page straight away. After being transferred to the country page all the posts of that country are listed and possibility to filter them by category. You can also easily change to another country. On the country page there is also a map showing the location of all the posts made on the site and by clicking on the locations on the map you show the name and image and a link to go to their website.

The sign in and sign out is done through the navbar. If signed in the user can access the pages for authorized users (create new post, my posts, saved posts) through a dropdown menu appearing when clicking on their avatar image in the navbar. There is also an About page available for all users containing a short description of the project and it’s creators. A signed in user also has the possibility to delete any posts of comments that the user is the author of.

## Tech

The frontend is built with React and uses Redux to store data from the database to limit the amount of fetches made and improve performance. Styling was made with styled-components.

The backend is built with Node.js, Express, MondoDB and Mongoose. Cloudinary is used to enable image uploads to the site and bcrypt and crypto allows us to hash all passwords before storing them in the database.

In the backend we’ve built three schemas for sightseeing, user and comment that are being populated by each other in different constellations. The sightseeing schema is populated with user who is the author of the post and an array of comments and the user schema is populated with an array of saved sightseeings (posts). The comment schema is populated with both the user who is the author of the comment and the sightseeing that it belongs to.

In order to detect if the current user is the author of a specific comment (to display a delete button or not) we’re also using a two-layer population when posting a new comment. When the sightseeing in question gets updated and populated with the new comment the comment itself is also being populated with the user who is the author of the comment, which makes it possible to compare the current user id to the user id of the author in the frontend.

For updating the content of the database we’ve used several mongoose operators. $push is used for adding, $pull is used for deleting, $inc is used for incrementing and $or is used for making the keyword query possible by returning a post in the results if the keyword is found in at least one of the properties.

## Reflections

As we’ve been working with backend and frontend with Redux on another level from what we’ve done previously we have learned so much, both through sharing knowledge with each other and problem while solving using Google. This project was also a great experience in working together a dev team and we are very happy and proud to have managed to have produced this quite complex site in just four weeks.

## View it live

https://go-scandinavia.netlify.app/
