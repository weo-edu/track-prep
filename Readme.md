
# track-prep

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Data processing util for segment. Prepares data for use with analytics tools. Flatten nested properties and converts dates to seconds (intercom).

## Installation

    $ npm install track-data

## Usage

```js
var prep = require('track-prp')
var props = prep({
  _id: 0,
  displayName: 'foo',
  nested: {
    displayName: 'bar'
  },
  createdAt: 'Thu Nov 05 2015 14:30:11 GMT-0800 (PST)',
  omit: 'qux'
}, ['_id', 'displayName', 'nested', 'createdAt'])

// props:
// {
//  _id: 0,
//  displayName: 'foo',
//  'nested.displayName': 'bar',
//  createdAt: 1446762611.134
// }
```

## License

The MIT License

Copyright &copy; 2015, Weo.io &lt;info@weo.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
