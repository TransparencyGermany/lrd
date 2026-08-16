# Website for the Transparency Ranking in Germany

Repository of [lobbyranking.de](https://lobbyranking.de) – pull requests are welcome.

---

This site is generously supported by BrowserStack, [www.browserstack.com](https://www.browserstack.com) for cross-browser compatibility.

Built with [Next.js](https://nextjs.org/) and Data Love.

## Installation and running it

First install Node.js, then run

```sh
npm install
npm run dev
```

## Building for production

```sh
npm run build
```

This produces a fully static site in `out/`, ready to deploy to any static host.

## Updating the ranking data

Currently Data is updated by adding a data_YEAR.json file to /data. There is another way to update Data via Google sheets but in order to do so Data would have to be correctly stored there first.


The ranking data lives in a Google Sheet and is pulled into `data/data.json` on
demand — it is **not** fetched automatically as part of `npm run build`, so builds
never depend on Google Sheets being reachable. To refresh it after the sheet has
been updated:

```sh
npm run fetch-data
```

Then commit the resulting `data/data.json`.

## Editing state content

Each Bundesland's descriptive text lives in `content/states/*.md` as plain Markdown
with YAML frontmatter — edit these files directly and rebuild.
