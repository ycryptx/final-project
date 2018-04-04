# Toxxxme

## Overview

Toxxxme is a simple but powerful website that shows people their exposure to environmental toxicity by having them type in their address.

Using the Google Maps API and publically available data sources, a user will be taken on a virtual tour of his/her exposure to toxicity supplemented with locational data and other information.


## Data Model

The application will have a SQL database which is a clone of data data from the Federal environmental database (TOXMAP). Two tables will be linked by reference (by facility serial #) The first table will include every facility on record, it's location and other metadata about it. The second table will list all toxic releases by each facility, where each entry is a toxic release.


Table 1:

```javascript
{
	('00602BXTRF111CO',110002085207,'BAXTER HEALTHCARE CORP, FENWAL DIV','111 COLON ST','AGUADA','PR','00602',72003,'AGUADA','18.379830','-67.184530'),
	('00602BXTRHRD115',110007807258,'DADE DIAGNOSTICS OF PR INC','RD 115 KM 226','AGUADA','PR','00602',72003,'AGUADA','18.380797','-67.191301')
  }

```

Table 2:

```javascript
{
	('98421SLRFN3001M',1394080394392,'Ethylbenzene','100-41-4','1994','4290.00000000000000000','',NULL,NULL,NULL,NULL),
	('98421SLRFN3001M',1394080394378,'Toluene','108-88-3','1994','22097.00000000000000000','',NULL,NULL,NULL,NULL)
}
```


## [Link to Commented First Draft Schema](db.js) 

(___TODO__: create a first draft of your Schemas in db.js and link to it_)

## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(___TODO__: draw out a site map that shows how pages are related to each other_)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

(___TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)_)

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new grocery list
4. as a user, I can view all of the grocery lists I've created in a single list
5. as a user, I can add items to an existing grocery list
6. as a user, I can cross off items in an existing grocery list

## Research Topics

(___TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit_)


## [Link to Initial Main Project File](app.js) 

(___TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)

## Annotations / References Used

(___TODO__: list any tutorials/references/etc. that you've based your code off of_)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)
