<h1 align="center" id="title">The Right Book</h1>

<p align="center"><img src="https://socialify.git.ci/Kunal1001/The-Right-Book/image?language=1&amp;owner=1&amp;name=1&amp;stargazers=1&amp;theme=Light" alt="project-image"></p>

<p id="description">A web app that allows you to add review of the books you have read. The books data is persisted in a database and can be edited deleted and sorted as per user demand.</p>

<h2>Project Screenshots:</h2>

<img src=".\public\assets\Screenshot 2024-03-13 090028.png" alt="project-screenshot" >

<img src=".\public\assets\Screenshot 2024-03-13 085532.png" alt="project-screenshot" >

  
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   Add new book reviews
*   Update/Delete the existing reviews
*   Sort the Book reviews as per name or rating
*   Persist the book data in a database

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the project</p>

```
git clone https://github.com/Kunal1001/The-Right-Book.git
```

<p>2. Install npm packages</p>

```
npm i
```

<p>3. create database in postgreSQL</p>

```
create database books
```

<p>4. create schema in that database</p>

```
CREATE TABLE IF NOT EXISTS bookdetail (isbn character varying(20),
title character varying(100),
author character varying(100),
review character varying(2000),
rating integer,
CONSTRAINT bookdetail_pkey PRIMARY KEY (isbn) )
```

<p>5. Run on localhost</p>

```
nodemon index.js
```

  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   HTML
*   CSS
*   Bootstrap
*   NodeJs
*   PostgreSQL

<p>Enjoy 🌞.</p>
