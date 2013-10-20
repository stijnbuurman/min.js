/*globals appendToDom:true, destroyDom:true, $:true*/
'use strict';

describe('elements', function () {
  beforeEach(function () {
    appendToDom('div', ['a','strong']);
  });

  afterEach(destroyDom);

  it('should grab an element from the DOM', function () {
    var link = $('div > a');

    assert(link.outerHTML === '<a></a>');
  });
  
  it('should grab an element from the given DOM context', function () {
    var link = $('a', $('div')[0]);
    assert(link.outerHTML === '<a></a>');
  });
});
