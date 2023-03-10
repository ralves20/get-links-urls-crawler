#!/usr/bin/env node
import meow from "meow";
import ora from "ora";
import fs from "fs";
import { cleanUrl, crawlUrl } from "./index.js";

const cli = meow(
	`
	Usage
		$ get-links-urls <url>

	Options
		--output=<string>, -o   File saved to the system
		--max-depth=<number>,   Maximum depth of routes to search
		--alias=<string>,       Replace <url> with <alias> for localhost sitemap generation

	Examples
		$ get-links-urls your.given-url.com
		Created urls.json [166 urls found, 2 errors]
`,
	{
		importMeta: import.meta,
		flags: {
			maxDepth: {
				default: 3,
			},
			output: {
				default: "urls.json",
				alias: "o",
			},
			alias: {
				default: "",
			},
		},
	}
);

const supportedFormats = ["csv", "txt", "json", "xml"];

const [siteUrl2] = [cli.input];
let siteUrl = "";
const { maxDepth, output, alias } = cli.flags;


console.log(siteUrl2)

fs.stat(output, function (err, stats) {

	if (err) {
		return console.error(err);
	}

	fs.unlink(output, function (err) {
		if (err) return console.log(err);
		console.log(`Old output file {output} has been deleted successfully\n\n`);
	});
});

for (let i = 0; i < siteUrl2.length; i++) {
	siteUrl = siteUrl2[i];
	const spinner = ora({ prefixText: `${siteUrl}` }).start();
	console.log(siteUrl)


	if (!siteUrl) {
		throw new Error("No url provided.");
	}

	if (maxDepth <= 0) {
		throw new Error("Maximum depth must be greater than zero");
	}

	const format = output.split(".")[1];

	if (!supportedFormats.includes(format)) {
		throw new Error(`Output must be file types [${supportedFormats.join(", ")}]`);
	}

	try {
		const url = cleanUrl(siteUrl);

		const rawData = {
			queue: new Set([url]),
			found: new Set([]),
			errors: new Set([]),
		};

		await crawlUrl({
			url,
			data: rawData,
			maxDepth,
			spinner,
			baseUrl: url,
			currentDepth: 0,
		});

		const data = {
			found: [...rawData.found].sort(),
			errors: [...rawData.errors].sort(),
		};

		spinner.stop();

		if (format === "json") {
			fs.appendFileSync(output, JSON.stringify(data.found, null, 2));
			console.log(`??? Generated file ${output} with ${data.found.length} urls found`);
		}

		if (format === "csv" || format === "txt") {
			fs.appendFileSync(output, data.found.join("\n"));
			console.log(`??? Generated file ${output} with ${data.found.length} urls found`);
		}

		if (format === "xml") {
			const date = new Date().toISOString();
			const siteMapUrls = data.found
				.map(
					(url) =>
						`<url><loc>${alias !== "" ? url.replace(siteUrl, alias) : url
						}</loc><lastmod>${date}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>`
				)
				.join("\n");
			const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${siteMapUrls}
</urlset>`;
			fs.appendFileSync(output, sitemap);
			console.log(`??? Generated file ${output} with ${data.found.length} urls found`);
		}

		if (data.errors.length) {
			console.log(
				`??? Failed to load these URLs:\n - ${data.errors.join("\n - ")}`
			);
		}
	} catch (error) {
		spinner.fail(`Failed to get URLS for ${siteUrl}`);
		console.error(error);
	}
}