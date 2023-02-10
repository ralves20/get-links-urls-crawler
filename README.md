# 🔗 WebCrawler - Get Site URLs

WebCrawler to get URLs from a given site

## 1. Architecture

### 1.1. Technologies of the project

Belows are the tool used to perform the development of this project.
- [JavaScript](https://www.javascript.com/)
- [Express JS](https://expressjs.com/)
- [Node JS](https://nodejs.org/en/)
- [Node JS For testing](https://nodejs.org/en/) - It's the same Node Library, but in this case to provide a quick solution, Node JS was used for testing purposes instead of any other testing library

### 1.2. Prerequisites to run

To use this project, you'll need:
- Node.js, a Long-Term Support (LTS) release version 16 or later - [download](https://nodejs.org/en/)
- Google Chrome, latest version - [download](https://www.google.com/intl/en-US/chrome/)

## 2. Usage

### 2.1 Installation / Setup

Once you have the code on your computer, use your computer terminal to run the following command in the directory where you've cloned the project:
```
npm install
```

### 2.1. Command line interface

To run the webcrawler, you can do in the following way:

**Currently it only works for urls that ends in .com** (if is added any other chars after .com, the cli will not work properly)

```shell
npx get-links-urls your.given-url.com
```

### 2.2 CLI options / arguments


Get URL's from a given website.

#### 2.2.1 Example of usage by using the BASH script


Usage
```
$ chmod +x run-crawler.sh
$ ./run-crawler.sh  
```

After those commands have been typed, the script is going to guide you through the options available on how ro run


#### 2.2.2 Example of usage by using the JS CLI


Usage
```
$ npx get-links-urls <url>        						 # Get all URLs from a given single website
$ npx get-links-urls <url1> <url2> <url3> <url4> <url5>  # Get all URLs from multiple websites
$ npx get-links-urls --help								 # Help of the usage of the tool   
```

```
* Running for a single URL
npx get-links-urls

* Running for multiple URLs
npx get-links-urls google.com polaris.shopify.com
```

Options
```
	--output=<string>, -o   File saved to the system
	--max-depth=<number>,   Maximum depth of routes to search
```

Examples
```
	$ get-site-urls your.given-url.com --output=sitemap.xml
	✅ Generated sitemap.xml 150 urls found from the tiven website
```

## 3. Tests

In this case, no tests/assertion library was used, in this case to provide a quick solution, Node JS was used for testing purposes instead of any other testing library

### 3.1 Installation / Setup

Download all the dependencies
```
npm install
```

### 2.1 Running the tests

Run the tests with a simple command
```
npm run tests
```

# About myself 
![ralves20-profile-avatar](https://avatars.githubusercontent.com/u/40844089)
This is my profile on Github: [ralves20](https://github.com/ralves20)



