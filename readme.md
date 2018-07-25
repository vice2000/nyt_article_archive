### Live Demo
[https://desolate-reaches-55572.herokuapp.com/](https://desolate-reaches-55572.herokuapp.com/)

#### Hints

* uses `<input type="date">`, working only in Chrome
* requests may take a while unless any data ist persisted in indexedDB (a full month contains ~7000 articles)
* purge indexedDB manually from time to time

#### Local Development

- Create SSL-Key & Certificate for your local environment, see [https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/](https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/) 
- Create an .env file in the project's root directory:

```
NYT_ARCHIVE_API_KEY=YOUR_KEY
SSLKEY=/path/to/your.key
SSLCERT=/path/to/your.key.crt
NODE_TLS_REJECT_UNAUTHORIZED = "0"
ENVIRONMENT=development
```