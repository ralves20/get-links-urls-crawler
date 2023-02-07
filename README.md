# 🔗 WebCrawler - Get Site URLs

WebCrawler to get URLs from a given site

## 1. Architecture

### 1.1. Technologies of the project

Belows are the tool used to perform the development of this project.
- [JavaScript](https://www.javascript.com/)
- [Express JS](https://expressjs.com/)
- [Selenium Webdriver](https://www.selenium.dev/)

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

```shell
npx get-links-urls your.given-url.com
```

### 2.2 CLI options / arguments


Get URL's from a given website.

Usage
```
$ npx get-links-urls <url>           # Get all URLs from a given website
$ npx get-links-urls --help		 # Help of the usage of the tool   
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


# About myself 
#### (the guy who received the challenge)

![ralves20-profile-avatar](https://avatars.githubusercontent.com/u/40844089)
This is my profile on Github: [ralves20](https://github.com/ralves20)



