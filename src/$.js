/*globals Node:true, NodeList:true*/
$ = (function (document, window, $) {
  // Node covers all elements, but also the document objects
  var node = Node.prototype,
      nodeList = NodeList.prototype,
      forEach = 'forEach',
      trigger = 'trigger',
      toggleClass = 'toggleClass',
      removeClass = 'removeClass',
      addClass = 'addClass',
      hasClass = 'hasClass',
      attr = 'attr',
      after = 'after',
      before = 'before',
      each = [][forEach],
      // note: createElement requires a string in Firefox
      dummy = document.createElement('i');

  nodeList[forEach] = each;

  // we have to explicitly add a window.on as it's not included
  // in the Node object.
  window.on = node.on = function (event, fn) {
    this.addEventListener(event, fn, false);

    // allow for chaining
    return this;
  };

  nodeList.on = function (event, fn) {
    this[forEach](function (el) {
      el.on(event, fn);
    });
    return this;
  };

  // we save a few bytes (but none really in compression)
  // by using [trigger] - really it's for consistency in the
  // source code.
  window[trigger] = node[trigger] = function (type, data) {
    // construct an HTML event. This could have
    // been a real custom event
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.data = data || {};
    event.eventName = type;
    event.target = this;
    this.dispatchEvent(event);
    return this;
  };

  nodeList[trigger] = function (event) {
    this[forEach](function (el) {
      el[trigger](event);
    });
    return this;
  };
    
 node[toggleClass] = function (className) {
    if (this.classList) {
      this.classList.toggle(className);
    } else {
      var classes = this.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0){
            classes.splice(existingIndex, 1);
      }
      else{
        classes.push(className);
      }

      this.className = classes.join(' ');
    }
    return this;
  }
  
  nodeList[toggleClass] = function (className) {
    this[forEach](function (el) {
      el[toggleClass](className);
    });
    return this;
  }
  
  node[removeClass] = function (className) {
    if (this.classList){
      this.classList.remove(className);
    }
    else{
      this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');    
    }
    return this;
  }

  nodeList[removeClass] = function (className) {
    this[forEach](function (el) {
      el[removeClass](className);
    });
    return this;
  }
  
  node[addClass] = function (className) {
    if (this.classList){
      this.classList.add(className);
    }
    else{
      this.element.className += ' ' + className;
    }
    return this;
  }

  nodeList[addClass] = function (className) {
    this[forEach](function (el) {
      el[removeClass](className);
    });
    return this;
  }  
  
  window[hasClass] = node[hasClass] = function (className) {
    if (this.classList) {
      return this.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(this.className);
    }
  }
  
  window[attr] = node[attr] = function(attr,value){
    if (typeof value === undefined) {
      return this.getAttribute(attr);
    } else {
      this.setAttribute(attr,value);
      return this;
    }
  }
  
  window[after] = node[after] = function(html){
    this.insertAdjacentHTML('afterend', html);
  }
  
  window[before] = node[before] = function(html){
    this.insertAdjacentHTML('beforebegin', html);
  }

  $ = function (s, c) {
    // querySelectorAll requires a string with a length
    // otherwise it throws an exception
    var r = (c || document).querySelectorAll(s || '☺'),
        length = r.length;
    // if we have a single element, just return that.
    // if there's no matched elements, return a nodeList to chain from
    // else return the NodeList collection from qSA
    return length == 1 ? r[0] : r;
  };

  // $.on and $.trigger allow for pub/sub type global
  // custom events.
  $.on = node.on.bind(dummy);
  $[trigger] = node[trigger].bind(dummy);

  return $;
})(document, this);