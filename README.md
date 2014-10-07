# rotunda_example

A url parser, build as example code for Rotunda.

## Instructions

```javascript
var rotunda_example = require('rotunda_example');
rotunda_example.parseUrl(format, url);
```

### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/commoner/rotunda_example/master/dist/rotunda_example.min.js
[max]: https://raw.github.com/commoner/rotunda_example/master/dist/rotunda_example.js

In your web page:

```html
<script src="dist/rotunda_example.min.js"></script>
<script>
var format = "/:version/api/:collecton/:id";
var url = "/6/api/listings/3?sort=desc&limit=10";
parseUrl(format, url);
</script>
```

## Documentation

### parseUrl(format, url)
`parseUrl` digests the provided url, then returns an object containing path variables and options.

Its first argument should be a string describing the url. Variable sections of the url should be preceded with a colon, leading to a format like:

```javascript
"/:version/api/:collecton/:id"
```

In this example, `version`, `collection`, and `id` are all variable sections. If you then provide a `url` like:

```javascript
"/6/api/listings/3?sort=desc&limit=10"
```

`parseUrl` will merge the url options with the variable sections of the path, returning an object like:

```javascript
{
	version: 6,
	collection: "listings",
	id: 3,
	sort: "desc",
	limit: 10
}
```

## License
Copyright (c) 2014 commoner  
Licensed under the MIT license.
