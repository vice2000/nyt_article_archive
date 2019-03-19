## Browse the New York Time's Articles back to 1851
This poject was mainly created to check out different browser technologies and explore handling of relatively large amounts of data while keeping everything reasonably usable.
It uses the New York Time's [Archive API](https://developer.nytimes.com/docs/archive-product/1/overview).

### [Live Demo](https://desolate-reaches-55572.herokuapp.com/)
The Demo ist hosted on a [Heroku Free Dyno](https://devcenter.heroku.com/articles/free-dyno-hours), so it might be sleeping upon the first request. The browser tab needs to be refreshed a second time in this case. 

![Iphone Demo](./screenshot.gif)

#### Hints

* if the Browser is not capable of rendering `<input type="date">`, it's required to enter the date in format `YYYY-MM` 
* requests may take a while unless any data ist persisted in indexedDB (a full month contains ~7000 articles)
* if a matching entry for the selected key `[year_month]` exists in indexedDB, teasers are rendered from there w/o requesting the live API
* idexedDB entries are kept for one hour
* purge indexedDB manually from time to time

### Local Development

#### Prerequisites
```
# clone repo & install dependencies

git clone git@github.com:vice2000/
nyt_article_archive.git && npm install
```

- Sign up for a free [Developer Account](https://developer.nytimes.com) with the New York Times and obtain an API key
- Optional: Create SSL-Key & Certificate for your local environment, see [https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/](https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/) if you want to request your local dummy data via SSL 
- Create an .env file in the project's root directory:
```
NYT_ARCHIVE_API_KEY=YOUR_KEY
SSLKEY=/path/to/your.key
SSLCERT=/path/to/your.key.crt
USE_LOCAL_DATA=true # set to 'false' to call the actual Live API
NODE_TLS_REJECT_UNAUTHORIZED = "0"
ENVIRONMENT=development
```
#### Running Locally

```
# run on http://localhost:3000 and https://localhost:8443

npm run dev

# build production assets

npm run build
```