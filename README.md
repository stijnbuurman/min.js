# min.js

A tiny JQuery syntax inspired library for querying, events and some simple DOM manipulation. This is a fork of Remy Sharp's min.js which is no longer being maintained.

[![Build Status](https://travis-ci.org/stijnbuurman/min.js.png?branch=master)](https://travis-ci.org/stijnbuurman/min.js)

## Query elements

```js
var links = $('p:first-child a');
```

If there is more than one link, the return value is `NodeList`, if there's only a single match, you have an `Element` object. So you need to have an idea of what to expect if you want to modify the DOM.

## Class Manipulation

### Add Class

```js
$('p:first-child a').addClass('first');
```

### Remove Class

```js
$('p:first-child a').removeClass('first');
```

### Toggle Class

```js
$('p:first-child a').toggleClass('first');
```

### Has Class

```js
$('p:first-child a').hasClass('first');
```

## Attribute Manipulation

### Add/Edit Attribute

```js
$('a').attr('href','index.html');
```

### Read Attribute

```js
$('input').attr('value');
```

### Read / Edit single results

```js
$('a#some-place').href = '/some-place.html';
```

```js
var link = $('a#some-place').href;
```

## Inserting HTML

### Before

```js
$('div#title').before(html);
```

### After

```js
$('div#title').after(html);
```

### Inner
This is just the native javascript function innerHTML.

```js
$('div#title').innerHTML = html;
```

## Events

### Bind events

```js
$('p:first-child a').on('click', function (event) {
  event.preventDefault();
  // do something else
});
```

Note: the `on` and `trigger` methods are on both `Node` objects and `NodeList` objects, which also means this affects the `document` node, so `document.on(type, callback)` will also work.

### Custom events

```js
$('a').on('foo', function () {
  // foo was fired
});

$('a:first-child').trigger('foo');
```

### Arbitrary events / pubsub

```js
$.on('foo', function () {
  // foo was fired, but doesn't require a selector
});
```

### Turning off events?

Current min.js has no support for turning off events (beyond `.removeEventListener` -- but even then you don't have the reference function to work with). 

## Looping

```js
$('p').forEach(function (el, index) {
  console.log(el.innerHTML);
});
```

Note: jQuery-like libraries tend to make the context `this` the element. Since we're borrowing `forEach` from the array object, `this` does not refer to the element.

## Chaining events

```js
$('a').on('foo', bar).on('click', doclick).trigger('foobar');
```

## Silent failing

Like jQuery, this tiny library silently fails when it doesn't match any elements. As you might expect.

# More info

* License: MIT / http://rem.mit-license.org
