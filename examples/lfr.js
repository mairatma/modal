/**
 * liferay-core - Liferay's common JavaScript library
 * @version v0.0.1
 * @author Eduardo Lundgren <edua@rdo.io>
 * @link http://liferay.com
 * @license BSD
 */
(function(root, undefined) {
  'use strict';

  /**
   * Base namespace for the Liferay library. Checks to see lfr is already
   * defined in the current scope before assigning to prevent clobbering if
   * lfr.js is loaded more than once.
   * @const
   */
  root.lfr = root.lfr || {};

  /**
   * Unique id property prefix.
   * @type {String}
   * @protected
   */
  lfr.UID_PROPERTY = 'lfr_' + ((Math.random() * 1e9) >>> 0);

  /**
   * Counter for unique id.
   * @type {Number}
   * @private
   */
  lfr.uniqueIdCounter_ = 1;

  /**
   * When defining a class Foo with an abstract method bar(), you can do:
   * Foo.prototype.bar = lfr.abstractMethod
   *
   * Now if a subclass of Foo fails to override bar(), an error will be thrown
   * when bar() is invoked.
   *
   * @type {!Function}
   * @throws {Error} when invoked to indicate the method should be overridden.
   */
  lfr.abstractMethod = function() {
    throw Error('Unimplemented abstract method');
  };

  /**
   * Creates a new function that, when called, has its keyword set to the
   * provided value, with a given sequence of arguments preceding any provided
   * when the new function is called.
   *
   * Usage: <pre>var fn = bind(myFunction, myObj, 'arg1', 'arg2');
   * fn('arg3', 'arg4');</pre>
   *
   * @param {function} fn A function to partially apply.
   * @param {!Object} context Specifies the object which this should point to
   *     when the function is run.
   * @param {...*} var_args Additional arguments that are partially applied to
   *     the function.
   * @return {!Function} A partially-applied form of the function bind() was
   *     invoked as a method of.
   */
  lfr.bind = function(fn) {
    if (!fn) {
      throw new Error();
    }

    if (Function.prototype.bind) {
      return lfr.bindWithNative_.apply(lfr, arguments);
    } else {
      return lfr.bindWithoutNative_.apply(lfr, arguments);
    }
  };

  /**
   * Same as `lfr.bind`, but receives the arguments for the function as a single
   * param.
   * @param {function} fn A function to partially apply.
   * @param {!Object} context Specifies the object which this should point to
   *     when the function is run.
   * @param {...*} var_args Additional arguments that are partially applied to
   *     the function.
   * @return {!Function} A partially-applied form of the function bind() was
   *     invoked as a method of.
   * @protected
   */
  lfr.bindWithArgs_ = function(fn, context) {
    var args = Array.prototype.slice.call(arguments, 2);

    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, args);
      return fn.apply(context, newArgs);
    };
  };

  /**
   * Same as `lfr.bind`, but uses the native javascript `bind` function instead
   * of reimplementing it.
   *
   * @param {function} fn A function to partially apply.
   * @param {!Object} context Specifies the object which this should point to
   *     when the function is run.
   * @param {...*} var_args Additional arguments that are partially applied to
   *     the function.
   * @return {!Function} A partially-applied form of the function bind() was
   *     invoked as a method of.
   * @protected
   */
  lfr.bindWithNative_ = function(fn) {
    var bind = fn.call.apply(fn.bind, arguments);
    return function() {
      return bind.apply(null, arguments);
    };
  };

  /**
   * Same as `lfr.bind`, but it can't receive any arguments for the function.
   * @param {function} fn A function to partially apply.
   * @param {!Object} context Specifies the object which this should point to
   *     when the function is run.
   * @return {!Function} A partially-applied form of the function bind() was
   *     invoked as a method of.
   * @protected
   */
  lfr.bindWithoutArgs_ = function(fn, context) {
    return function() {
      return fn.apply(context, arguments);
    };
  };

  /**
   * Same as `lfr.bind`, but doesn't try to use the native javascript `bind`
   * function.
   *
   * @param {function} fn A function to partially apply.
   * @param {!Object} context Specifies the object which this should point to
   *     when the function is run.
   * @param {...*} var_args Additional arguments that are partially applied to
   *     the function.
   * @return {!Function} A partially-applied form of the function bind() was
   *     invoked as a method of.
   * @protected
   */
  lfr.bindWithoutNative_ = function(fn, context) {
    if (arguments.length > 2) {
      return lfr.bindWithArgs_.apply(lfr, arguments);
    } else {
      return lfr.bindWithoutArgs_(fn, context);
    }
  };

  /**
   * Loops constructor super classes collecting its properties values. If
   * property is not available on the super class `undefined` will be
   * collected as value for the class hierarchy position. Must be used with
   * classes created using `lfr.inherits`.
   * @param {!function()} constructor Class constructor.
   * @param {string} propertyName Property name to be collected.
   * @return {Array.<*>} Array of collected values.
   */
  lfr.collectSuperClassesProperty = function(constructor, propertyName) {
    var propertyValues = [constructor[propertyName]];
    while (constructor.superClass_) {
      constructor = constructor.superClass_.constructor;
      propertyValues.push(constructor[propertyName]);
    }
    return propertyValues;
  };

  /**
   * Gets an unique id. If `opt_object` argument is passed, the object is
   * mutated with an unique id. Consecutive calls with the same object
   * reference won't mutate the object again, instead the current object uid
   * returns. See {@link lfr.UID_PROPERTY}.
   * @type {opt_object} Optional object to be mutated with the uid. If not
   *     specified this method only returns the uid.
   * @throws {Error} when invoked to indicate the method should be overridden.
   */
  lfr.getUid = function(opt_object) {
    if (opt_object) {
      return opt_object[lfr.UID_PROPERTY] ||
        (opt_object[lfr.UID_PROPERTY] = lfr.uniqueIdCounter_++);
    }
    return lfr.uniqueIdCounter_++;
  };

  /**
   * Inherits the prototype methods from one constructor into another.
   *
   * Usage:
   * <pre>
   * function ParentClass(a, b) { }
   * ParentClass.prototype.foo = function(a) { }
   *
   * function ChildClass(a, b, c) {
   *   lfr.base(this, a, b);
   * }
   * lfr.inherits(ChildClass, ParentClass);
   *
   * var child = new ChildClass('a', 'b', 'c');
   * child.foo();
   * </pre>
   *
   * @param {Function} childCtor Child class.
   * @param {Function} parentCtor Parent class.
   */
  lfr.inherits = function(childCtor, parentCtor) {
    function TempCtor() {
    }
    TempCtor.prototype = parentCtor.prototype;
    childCtor.superClass_ = parentCtor.prototype;
    childCtor.prototype = new TempCtor();
    childCtor.prototype.constructor = childCtor;

    /**
     * Calls superclass constructor/method.
     *
     * This function is only available if you use lfr.inherits to express
     * inheritance relationships between classes.
     *
     * @param {!object} me Should always be "this".
     * @param {string} methodName The method name to call. Calling superclass
     *     constructor can be done with the special string 'constructor'.
     * @param {...*} var_args The arguments to pass to superclass
     *     method/constructor.
     * @return {*} The return value of the superclass method/constructor.
     */
    childCtor.base = function(me, methodName) {
      var args = Array.prototype.slice.call(arguments, 2);
      return parentCtor.prototype[methodName].apply(me, args);
    };
  };

  /**
   * The identity function. Returns its first argument.
   * @param {*=} opt_returnValue The single value that will be returned.
   * @return {?} The first argument.
   */
  lfr.identityFunction = function(opt_returnValue) {
    return opt_returnValue;
  };

  /**
   * Returns true if the specified value is a boolean.
   * @param {?} val Variable to test.
   * @return {boolean} Whether variable is boolean.
   */
  lfr.isBoolean = function(val) {
    return typeof val === 'boolean';
  };

  /**
   * Returns true if the specified value is not undefined.
   * @param {?} val Variable to test.
   * @return {boolean} Whether variable is defined.
   */
  lfr.isDef = function(val) {
    return val !== undefined;
  };

  /**
   * Returns true if value is not undefined or null.
   * @param {*} val
   * @return {Boolean}
   */
  lfr.isDefAndNotNull = function(val) {
    return lfr.isDef(val) && !lfr.isNull(val);
  };

  /**
   * Returns true if value is a dom element.
   * @param {*} val
   * @return {Boolean}
   */
  lfr.isElement = function(val) {
    return val && typeof val === 'object' && val.nodeType === 1;
  };

  /**
   * Returns true if the specified value is a function.
   * @param {?} val Variable to test.
   * @return {boolean} Whether variable is a function.
   */
  lfr.isFunction = function(val) {
    return typeof val === 'function';
  };

  /**
   * Returns true if value is null.
   * @param {*} val
   * @return {Boolean}
   */
  lfr.isNull = function(val) {
    return val === null;
  };

  /**
   * Returns true if the specified value is an object. This includes arrays
   * and functions.
   * @param {?} val Variable to test.
   * @return {boolean} Whether variable is an object.
   */
  lfr.isObject = function(val) {
    var type = typeof val;
    return type === 'object' && val !== null || type === 'function';
  };

  /**
   * Returns true if value is a string.
   * @param {*} val
   * @return {Boolean}
   */
  lfr.isString = function(val) {
    return typeof val === 'string';
  };

  /**
   * Merges the values of a static property a class with the values of that
   * property for all its super classes, and stores it as a new static
   * property of that class. If the static property already existed, it won't
   * be recalculated.
   * @param {!function()} constructor Class constructor.
   * @param {string} propertyName Property name to be collected.
   * @param {function(*, *):*=} opt_mergeFn Function that receives an array filled
   *   with the values of the property for the current class and all its super classes.
   *   Should return the merged value to be stored on the current class.
   * @return {*} The value of the merged property.
   */
  lfr.mergeSuperClassesProperty = function(constructor, propertyName, opt_mergeFn) {
    var mergedName = propertyName + '_MERGED';
    if (constructor[mergedName]) {
      return constructor[mergedName];
    }

    var merged = lfr.collectSuperClassesProperty(constructor, propertyName);
    if (opt_mergeFn) {
      merged = opt_mergeFn(merged);
    }
    constructor[mergedName] = merged;
    return constructor[mergedName];
  };

  /**
   * Null function used for default values of callbacks, etc.
   * @return {void} Nothing.
   */
  lfr.nullFunction = function() {};

  /**
   * Creates a new function that, when called, has its this keyword set to the
   * provided value, with a given sequence of arguments following any provided
   * when the new function is called.
   *
   * Usage: <pre>var fn = rbind(myFunction, myObj, 'arg1', 'arg2');
   * fn('arg3', 'arg4');</pre>
   *
   * @param {function} fn A function to partially apply.
   * @param {!Object} context Specifies the object which this should point to
   *     when the function is run.
   * @param {...*} var_args Additional arguments that are partially applied to
   *     the function.
   * @return {!Function} A partially-applied form of the function bind() was
   *     invoked as a method of.
   */
  lfr.rbind = function(fn, context) {
    if (!fn) {
      throw new Error();
    }

    if (arguments.length > 2) {
      var args = Array.prototype.slice.call(arguments, 2);
      return function() {
        var newArgs = Array.prototype.slice.call(arguments);
        Array.prototype.push.apply(newArgs, args);
        return fn.apply(context, newArgs);
      };
    } else {
      return function() {
        return fn.apply(context, arguments);
      };
    }
  };

}(this));

(function() {
  'use strict';

  lfr.object = lfr.object || {};

  /**
   * Copies all the members of a source object to a target object.
   * @param {Object} target Target object.
   * @param {...Object} var_args The objects from which values will be copied.
   * @return {Object} Returns the target object reference.
   */
  lfr.object.mixin = function(target) {
    var key, source;
    for (var i = 1; i < arguments.length; i++) {
      source = arguments[i];
      for (key in source) {
        target[key] = source[key];
      }
    }
    return target;
  };

}());

(function() {
  'use strict';

  lfr.array = lfr.array || {};

  /**
   * Returns the first value in the given array that isn't undefined.
   * @param {!Array} arr
   * @return {*}
   */
  lfr.array.firstDefinedValue = function(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== undefined) {
        return arr[i];
      }
    }
  };

  /**
   * Transforms the input nested array to become flat.
   * @param {Array.<*|Array.<*>>} arr Nested array to flatten.
   * @param {Array.<*>} opt_output Optional output array.
   * @return {Array.<*>} Flat array.
   */
  lfr.array.flatten = function(arr, opt_output) {
    var output = opt_output || [];
    for (var i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        lfr.array.flatten(arr[i], output);
      } else {
        output.push(arr[i]);
      }
    }
    return output;
  };

  /**
   * Removes the first occurrence of a particular value from an array.
   * @param {Array.<T>} arr Array from which to remove value.
   * @param {T} obj Object to remove.
   * @return {boolean} True if an element was removed.
   * @template T
   */
  lfr.array.remove = function(arr, obj) {
    var i = arr.indexOf(obj);
    var rv;
    if ( (rv = i >= 0) ) {
      lfr.array.removeAt(arr, i);
    }
    return rv;
  };

  /**
   * Removes from an array the element at index i
   * @param {Array} arr Array or array like object from which to remove value.
   * @param {number} i The index to remove.
   * @return {boolean} True if an element was removed.
   */
  lfr.array.removeAt = function(arr, i) {
    return Array.prototype.splice.call(arr, i, 1).length === 1;
  };

}());

(function() {
  'use strict';

  lfr.string = lfr.string || {};

  /**
   * Removes the breaking spaces from the left and right of the string and
   * collapses the sequences of breaking spaces in the middle into single spaces.
   * The original and the result strings render the same way in HTML.
   * @param {string} str A string in which to collapse spaces.
   * @return {string} Copy of the string with normalized breaking spaces.
   */
  lfr.string.collapseBreakingSpaces = function(str) {
    return str.replace(/[\t\r\n ]+/g, ' ').replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, '');
  };

  /**
   * Calculates the hashcode for a string. The hashcode value is computed by
   * the sum algorithm: s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]. A nice
   * property of using 31 prime is that the multiplication can be replaced by
   * a shift and a subtraction for better performance: 31*i == (i<<5)-i.
   * Modern VMs do this sort of optimization automatically.
   * @param {String} val Target string.
   * @return {Number} Returns the string hashcode.
   */
  lfr.string.hashCode = function(val) {
    var hash = 0;
    for (var i = 0, len = val.length; i < len; i++) {
      hash = 31 * hash + val.charCodeAt(i);
      hash %= 0x100000000;
    }
    return hash;
  };

  /**
   * Replaces interval into the string with specified value, e.g.
   * `replaceInterval("abcde", 1, 4, "")` returns "ae".
   * @param {string} str The input string.
   * @param {Number} start Start interval position to be replaced.
   * @param {Number} end End interval position to be replaced.
   * @param {string} value The value that replaces the specified interval.
   * @return {string}
   */
  lfr.string.replaceInterval = function(str, start, end, value) {
    return str.substring(0, start) + value + str.substring(end);
  };

}());

(function() {
  'use strict';

  lfr.html = lfr.html || {};

  /**
   * HTML regex patterns.
   * @enum {RegExp}
   * @protected
   */
  lfr.html.Patterns = {
    /**
     * @type {RegExp}
     */
    INTERTAG_CUSTOM_CUSTOM: /~%%%\s+%%%~/g,

    /**
     * @type {RegExp}
     */
    INTERTAG_TAG_CUSTOM: />\s+%%%~/g,

    /**
     * @type {RegExp}
     */
    INTERTAG_CUSTOM_TAG: /~%%%\s+</g,

    /**
     * @type {RegExp}
     */
    INTERTAG_TAG: />\s+</g,

    /**
     * @type {RegExp}
     */
    SURROUNDING_SPACES: /\s*(<[^>]+>)\s*/g,

    /**
     * @type {RegExp}
     */
    TAG_END_SPACES: /(<(?:[^>]+?))(?:\s+?)(\/?>)/g,

    /**
     * @type {RegExp}
     */
    TAG_QUOTE_SPACES: /\s*=\s*(["']?)\s*(.*?)\s*(\1)/g
  };

  /**
   * Minifies given HTML source by removing extra white spaces, comments and
   * other unneeded characters without breaking the content structure. As a
   * result HTML become smaller in size.
   * - Contents within <code>, <pre>, <script>, <style>, <textarea> and
   *   conditional comments tags are preserved.
   * - Comments are removed.
   * - Conditional comments are preserved.
   * - Breaking spaces are collapsed into a single space.
   * - Unneeded spaces inside tags (around = and before />) are removed.
   * - Spaces between tags are removed, even from inline-block elements.
   * - Spaces surrounding tags are removed.
   * - DOCTYPE declaration is simplified to <!DOCTYPE html>.
   * - Does not remove default attributes from <script>, <style>, <link>,
   *   <form>, <input>.
   * - Does not remove values from boolean tag attributes.
   * - Does not remove "javascript:" from in-line event handlers.
   * - Does not remove http:// and https:// protocols.
   * @param {string} html Input HTML to be compressed.
   * @return {string} Compressed version of the HTML.
   */
  lfr.html.compress = function(html) {
    var preserved = {};
    html = lfr.html.preserveBlocks_(html, preserved);
    html = lfr.html.simplifyDoctype_(html);
    html = lfr.html.removeComments_(html);
    html = lfr.html.removeIntertagSpaces_(html);
    html = lfr.html.collapseBreakingSpaces_(html);
    html = lfr.html.removeSpacesInsideTags_(html);
    html = lfr.html.removeSurroundingSpaces_(html);
    html = lfr.html.returnBlocks_(html, preserved);
    return html.trim();
  };

  /**
   * Collapses breaking spaces into a single space.
   * @param {string} html
   * @return {string}
   * @protected
   */
  lfr.html.collapseBreakingSpaces_ = function(html) {
    return lfr.string.collapseBreakingSpaces(html);
  };

  /**
   * Searches for first occurrence of the specified open tag string pattern
   * and from that point finds next ">" position, identified as possible tag
   * end position.
   * @param {string} html
   * @param {string} openTag Open tag string pattern without open tag ending
   *     character, e.g. "<textarea" or "<code".
   * @return {string}
   * @protected
   */
  lfr.html.lookupPossibleTagEnd_ = function(html, openTag) {
    var tagPos = html.indexOf(openTag);
    if (tagPos > -1) {
      tagPos += html.substring(tagPos).indexOf('>') + 1;
    }
    return tagPos;
  };

  /**
   * Preserves contents inside any <code>, <pre>, <script>, <style>,
   * <textarea> and conditional comment tags. When preserved, original content
   * are replaced with an unique generated block id and stored into
   * `preserved` map.
   * @param {string} html
   * @param {Object} preserved Object to preserve the content indexed by an
   *     unique generated block id.
   * @return {html} The preserved HTML.
   * @protected
   */
  lfr.html.preserveBlocks_ = function(html, preserved) {
    html = lfr.html.preserveOuterHtml_(html, '<!--[if', '<![endif]-->', preserved);
    html = lfr.html.preserveInnerHtml_(html, '<code', '</code', preserved);
    html = lfr.html.preserveInnerHtml_(html, '<pre', '</pre', preserved);
    html = lfr.html.preserveInnerHtml_(html, '<script', '</script', preserved);
    html = lfr.html.preserveInnerHtml_(html, '<style', '</style', preserved);
    html = lfr.html.preserveInnerHtml_(html, '<textarea', '</textarea', preserved);
    return html;
  };

  /**
   * Preserves inner contents inside the specified tag. When preserved,
   * original content are replaced with an unique generated block id and
   * stored into `preserved` map.
   * @param {string} html
   * @param {string} openTag Open tag string pattern without open tag ending
   *     character, e.g. "<textarea" or "<code".
   * @param {string} closeTag Close tag string pattern without close tag
   *     ending character, e.g. "</textarea" or "</code".
   * @param {Object} preserved Object to preserve the content indexed by an
   *     unique generated block id.
   * @return {html} The preserved HTML.
   * @protected
   */
  lfr.html.preserveInnerHtml_ = function(html, openTag, closeTag, preserved) {
    var tagPosEnd = lfr.html.lookupPossibleTagEnd_(html, openTag);
    while (tagPosEnd > -1) {
      var tagEndPos = html.indexOf(closeTag);
      html = lfr.html.preserveInterval_(html, tagPosEnd, tagEndPos, preserved);
      html = html.replace(openTag, '%%%~1~%%%');
      html = html.replace(closeTag, '%%%~2~%%%');
      tagPosEnd = lfr.html.lookupPossibleTagEnd_(html, openTag);
    }
    html = html.replace(/%%%~1~%%%/g, openTag);
    html = html.replace(/%%%~2~%%%/g, closeTag);
    return html;
  };

  /**
   * Preserves interval of the specified HTML into the preserved map replacing
   * original contents with an unique generated id.
   * @param {string} html
   * @param {Number} start Start interval position to be replaced.
   * @param {Number} end End interval position to be replaced.
   * @param {Object} preserved Object to preserve the content indexed by an
   *     unique generated block id.
   * @return {string} The HTML with replaced interval.
   * @protected
   */
  lfr.html.preserveInterval_ = function(html, start, end, preserved) {
    var blockId = '%%%~BLOCK~' + lfr.getUid() + '~%%%';
    preserved[blockId] = html.substring(start, end);
    return lfr.string.replaceInterval(html, start, end, blockId);
  };

  /**
   * Preserves outer contents inside the specified tag. When preserved,
   * original content are replaced with an unique generated block id and
   * stored into `preserved` map.
   * @param {string} html
   * @param {string} openTag Open tag string pattern without open tag ending
   *     character, e.g. "<textarea" or "<code".
   * @param {string} closeTag Close tag string pattern without close tag
   *     ending character, e.g. "</textarea" or "</code".
   * @param {Object} preserved Object to preserve the content indexed by an
   *     unique generated block id.
   * @return {html} The preserved HTML.
   * @protected
   */
  lfr.html.preserveOuterHtml_ = function(html, openTag, closeTag, preserved) {
    var tagPos = html.indexOf(openTag);
    while (tagPos > -1) {
      var tagEndPos = html.indexOf(closeTag) + closeTag.length;
      html = lfr.html.preserveInterval_(html, tagPos, tagEndPos, preserved);
      tagPos = html.indexOf(openTag);
    }
    return html;
  };

  /**
   * Removes all comments of the HTML. Including conditional comments and
   * "<![CDATA[" blocks.
   * @param {string} html
   * @return {string} The HTML without comments.
   * @protected
   */
  lfr.html.removeComments_ = function(html) {
    var preserved = {};
    html = lfr.html.preserveOuterHtml_(html, '<![CDATA[', ']]>', preserved);
    html = lfr.html.preserveOuterHtml_(html, '<!--', '-->', preserved);
    html = lfr.html.replacePreservedBlocks_(html, preserved, '');
    return html;
  };

  /**
   * Removes spaces between tags, even from inline-block elements.
   * @param {string} html
   * @return {string} The HTML without spaces between tags.
   * @protected
   */
  lfr.html.removeIntertagSpaces_ = function(html) {
    html = html.replace(lfr.html.Patterns.INTERTAG_CUSTOM_CUSTOM, '~%%%%%%~');
    html = html.replace(lfr.html.Patterns.INTERTAG_CUSTOM_TAG, '~%%%<');
    html = html.replace(lfr.html.Patterns.INTERTAG_TAG, '><');
    html = html.replace(lfr.html.Patterns.INTERTAG_TAG_CUSTOM, '>%%%~');
    return html;
  };

  /**
   * Removes spaces inside tags.
   * @param {string} html
   * @return {string} The HTML without spaces inside tags.
   * @protected
   */
  lfr.html.removeSpacesInsideTags_ = function(html) {
    html = html.replace(lfr.html.Patterns.TAG_END_SPACES, '$1$2');
    html = html.replace(lfr.html.Patterns.TAG_QUOTE_SPACES, '=$1$2$3');
    return html;
  };

  /**
   * Removes spaces surrounding tags.
   * @param {string} html
   * @return {string} The HTML without spaces surrounding tags.
   * @protected
   */
  lfr.html.removeSurroundingSpaces_ = function(html) {
    return html.replace(lfr.html.Patterns.SURROUNDING_SPACES, '$1');
  };

  /**
   * Restores preserved map keys inside the HTML. Note that the passed HTML
   * should contain the unique generated block ids to be replaced.
   * @param {string} html
   * @param {Object} preserved Object to preserve the content indexed by an
   *     unique generated block id.
   * @param {string} replaceValue The value to replace any block id inside the
   * HTML.
   * @return {string}
   * @protected
   */
  lfr.html.replacePreservedBlocks_ = function(html, preserved, replaceValue) {
    for (var blockId in preserved) {
      html = html.replace(blockId, replaceValue);
    }
    return html;
  };

  /**
   * Simplifies DOCTYPE declaration to <!DOCTYPE html>.
   * @param {string} html
   * @return {string}
   * @protected
   */
  lfr.html.simplifyDoctype_ = function(html) {
    var preserved = {};
    html = lfr.html.preserveOuterHtml_(html, '<!DOCTYPE', '>', preserved);
    html = lfr.html.replacePreservedBlocks_(html, preserved, '<!DOCTYPE html>');
    return html;
  };

  /**
   * Restores preserved map original contents inside the HTML. Note that the
   * passed HTML should contain the unique generated block ids to be restored.
   * @param {string} html
   * @param {Object} preserved Object to preserve the content indexed by an
   *     unique generated block id.
   * @return {string}
   * @protected
   */
  lfr.html.returnBlocks_ = function(html, preserved) {
    for (var blockId in preserved) {
      html = html.replace(blockId, preserved[blockId]);
    }
    return html;
  };

}());

/*!
 * Promises polyfill from Google's Closure Library.
 *
 *      Copyright 2013 The Closure Library Authors. All Rights Reserved.
 *
 * NOTE(eduardo): Promise support is not ready on all supported browsers,
 * therefore lfr.js is temporarily using Google's promises as polyfill. It
 * supports cancellable promises and has clean and fast implementation.
 */

(function(window) {
  'use strict';

  /**
   * Provides a more strict interface for Thenables in terms of
   * http://promisesaplus.com for interop with {@see lfr.Promise}.
   *
   * @interface
   * @extends {IThenable.<TYPE>}
   * @template TYPE
   */
  lfr.Thenable = function() {};


  /**
   * Adds callbacks that will operate on the result of the Thenable, returning a
   * new child Promise.
   *
   * If the Thenable is fulfilled, the {@code onFulfilled} callback will be
   * invoked with the fulfillment value as argument, and the child Promise will
   * be fulfilled with the return value of the callback. If the callback throws
   * an exception, the child Promise will be rejected with the thrown value
   * instead.
   *
   * If the Thenable is rejected, the {@code onRejected} callback will be invoked
   * with the rejection reason as argument, and the child Promise will be rejected
   * with the return value of the callback or thrown value.
   *
   * @param {?(function(this:THIS, TYPE):
   *             (RESULT|IThenable.<RESULT>|Thenable))=} opt_onFulfilled A
   *     function that will be invoked with the fulfillment value if the Promise
   *     is fullfilled.
   * @param {?(function(*): *)=} opt_onRejected A function that will be invoked
   *     with the rejection reason if the Promise is rejected.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     with the default this.
   * @return {!lfr.Promise.<RESULT>} A new Promise that will receive the result
   *     of the fulfillment or rejection callback.
   * @template RESULT,THIS
   */
  lfr.Thenable.prototype.then = function() {};


  /**
   * An expando property to indicate that an object implements
   * {@code lfr.Thenable}.
   *
   * {@see addImplementation}.
   *
   * @const
   */
  lfr.Thenable.IMPLEMENTED_BY_PROP = '$goog_Thenable';


  /**
   * Marks a given class (constructor) as an implementation of Thenable, so
   * that we can query that fact at runtime. The class must have already
   * implemented the interface.
   * Exports a 'then' method on the constructor prototype, so that the objects
   * also implement the extern {@see lfr.Thenable} interface for interop with
   * other Promise implementations.
   * @param {function(new:lfr.Thenable,...[?])} ctor The class constructor. The
   *     corresponding class must have already implemented the interface.
   */
  lfr.Thenable.addImplementation = function(ctor) {
    ctor.prototype.then = ctor.prototype.then;
    ctor.prototype.$goog_Thenable = true;
  };


  /**
   * @param {*} object
   * @return {boolean} Whether a given instance implements {@code lfr.Thenable}.
   *     The class/superclass of the instance must call {@code addImplementation}.
   */
  lfr.Thenable.isImplementedBy = function(object) {
    if (!object) {
      return false;
    }
    try {
      return !!object.$goog_Thenable;
    } catch (e) {
      // Property access seems to be forbidden.
      return false;
    }
  };


  /**
   * Like bind(), except that a 'this object' is not required. Useful when the
   * target function is already bound.
   *
   * Usage:
   * var g = partial(f, arg1, arg2);
   * g(arg3, arg4);
   *
   * @param {Function} fn A function to partially apply.
   * @param {...*} var_args Additional arguments that are partially applied to fn.
   * @return {!Function} A partially-applied form of the function bind() was
   *     invoked as a method of.
   */
  lfr.partial = function(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
      // Clone the array (with slice()) and append additional arguments
      // to the existing arguments.
      var newArgs = args.slice();
      newArgs.push.apply(newArgs, arguments);
      return fn.apply(this, newArgs);
    };
  };


  lfr.async = {};


  /**
   * Throw an item without interrupting the current execution context.  For
   * example, if processing a group of items in a loop, sometimes it is useful
   * to report an error while still allowing the rest of the batch to be
   * processed.
   * @param {*} exception
   */
  lfr.async.throwException = function(exception) {
    // Each throw needs to be in its own context.
    lfr.async.nextTick(function() {
      throw exception;
    });
  };


  /**
   * Fires the provided callback just before the current callstack unwinds, or as
   * soon as possible after the current JS execution context.
   * @param {function(this:THIS)} callback
   * @param {THIS=} opt_context Object to use as the "this value" when calling
   *     the provided function.
   * @template THIS
   */
  lfr.async.run = function(callback, opt_context) {
    if (!lfr.async.run.workQueueScheduled_) {
      // Nothing is currently scheduled, schedule it now.
      lfr.async.nextTick(lfr.async.run.processWorkQueue);
      lfr.async.run.workQueueScheduled_ = true;
    }

    lfr.async.run.workQueue_.push(
      new lfr.async.run.WorkItem_(callback, opt_context));
  };


  /** @private {boolean} */
  lfr.async.run.workQueueScheduled_ = false;


  /** @private {!Array.<!lfr.async.run.WorkItem_>} */
  lfr.async.run.workQueue_ = [];

  /**
   * Run any pending lfr.async.run work items. This function is not intended
   * for general use, but for use by entry point handlers to run items ahead of
   * lfr.async.nextTick.
   */
  lfr.async.run.processWorkQueue = function() {
    // NOTE: additional work queue items may be pushed while processing.
    while (lfr.async.run.workQueue_.length) {
      // Don't let the work queue grow indefinitely.
      var workItems = lfr.async.run.workQueue_;
      lfr.async.run.workQueue_ = [];
      for (var i = 0; i < workItems.length; i++) {
        var workItem = workItems[i];
        try {
          workItem.fn.call(workItem.scope);
        } catch (e) {
          lfr.async.throwException(e);
        }
      }
    }

    // There are no more work items, reset the work queue.
    lfr.async.run.workQueueScheduled_ = false;
  };


  /**
   * @constructor
   * @final
   * @struct
   * @private
   *
   * @param {function()} fn
   * @param {Object|null|undefined} scope
   */
  lfr.async.run.WorkItem_ = function(fn, scope) {
    /** @const */
    this.fn = fn;
    /** @const */
    this.scope = scope;
  };


  /**
   * Fires the provided callbacks as soon as possible after the current JS
   * execution context. setTimeout(…, 0) always takes at least 5ms for legacy
   * reasons.
   * @param {function(this:SCOPE)} callback Callback function to fire as soon as
   *     possible.
   * @param {SCOPE=} opt_context Object in whose scope to call the listener.
   * @template SCOPE
   */
  lfr.async.nextTick = function(callback, opt_context) {
    var cb = callback;
    if (opt_context) {
      cb = lfr.bind(callback, opt_context);
    }
    cb = lfr.async.nextTick.wrapCallback_(cb);
    // Introduced and currently only supported by IE10.
    if (lfr.isFunction(window.setImmediate)) {
      window.setImmediate(cb);
      return;
    }
    // Look for and cache the custom fallback version of setImmediate.
    if (!lfr.async.nextTick.setImmediate_) {
      lfr.async.nextTick.setImmediate_ = lfr.async.nextTick.getSetImmediateEmulator_();
    }
    lfr.async.nextTick.setImmediate_(cb);
  };


  /**
   * Cache for the setImmediate implementation.
   * @type {function(function())}
   * @private
   */
  lfr.async.nextTick.setImmediate_ = null;


  /**
   * Determines the best possible implementation to run a function as soon as
   * the JS event loop is idle.
   * @return {function(function())} The "setImmediate" implementation.
   * @private
   */
  lfr.async.nextTick.getSetImmediateEmulator_ = function() {
    // Create a private message channel and use it to postMessage empty messages
    // to ourselves.
    var Channel = window.MessageChannel;
    // If MessageChannel is not available and we are in a browser, implement
    // an iframe based polyfill in browsers that have postMessage and
    // document.addEventListener. The latter excludes IE8 because it has a
    // synchronous postMessage implementation.
    if (typeof Channel === 'undefined' && typeof window !== 'undefined' &&
      window.postMessage && window.addEventListener) {
      /** @constructor */
      Channel = function() {
        // Make an empty, invisible iframe.
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = '';
        document.documentElement.appendChild(iframe);
        var win = iframe.contentWindow;
        var doc = win.document;
        doc.open();
        doc.write('');
        doc.close();
        var message = 'callImmediate' + Math.random();
        var origin = win.location.protocol + '//' + win.location.host;
        var onmessage = lfr.bind(function(e) {
          // Validate origin and message to make sure that this message was
          // intended for us.
          if (e.origin !== origin && e.data !== message) {
            return;
          }
          this.port1.onmessage();
        }, this);
        win.addEventListener('message', onmessage, false);
        this.port1 = {};
        this.port2 = {
          postMessage: function() {
            win.postMessage(message, origin);
          }
        };
      };
    }
    if (typeof Channel !== 'undefined') {
      var channel = new Channel();
      // Use a fifo linked list to call callbacks in the right order.
      var head = {};
      var tail = head;
      channel.port1.onmessage = function() {
        head = head.next;
        var cb = head.cb;
        head.cb = null;
        cb();
      };
      return function(cb) {
        tail.next = {
          cb: cb
        };
        tail = tail.next;
        channel.port2.postMessage(0);
      };
    }
    // Implementation for IE6-8: Script elements fire an asynchronous
    // onreadystatechange event when inserted into the DOM.
    if (typeof document !== 'undefined' && 'onreadystatechange' in
        document.createElement('script')) {
      return function(cb) {
        var script = document.createElement('script');
        script.onreadystatechange = function() {
          // Clean up and call the callback.
          script.onreadystatechange = null;
          script.parentNode.removeChild(script);
          script = null;
          cb();
          cb = null;
        };
        document.documentElement.appendChild(script);
      };
    }
    // Fall back to setTimeout with 0. In browsers this creates a delay of 5ms
    // or more.
    return function(cb) {
      setTimeout(cb, 0);
    };
  };


  /**
   * Helper function that is overrided to protect callbacks with entry point
   * monitor if the application monitors entry points.
   * @param {function()} callback Callback function to fire as soon as possible.
   * @return {function()} The wrapped callback.
   * @private
   */
  lfr.async.nextTick.wrapCallback_ = function(opt_returnValue) {
    return opt_returnValue;
  };


  /**
   * Promises provide a result that may be resolved asynchronously. A Promise may
   * be resolved by being fulfilled or rejected with a value, which will be known
   * as the fulfillment value or the rejection reason. Whether fulfilled or
   * rejected, the Promise result is immutable once it is set.
   *
   * Promises may represent results of any type, including undefined. Rejection
   * reasons are typically Errors, but may also be of any type. Closure Promises
   * allow for optional type annotations that enforce that fulfillment values are
   * of the appropriate types at compile time.
   *
   * The result of a Promise is accessible by calling {@code then} and registering
   * {@code onFulfilled} and {@code onRejected} callbacks. Once the Promise
   * resolves, the relevant callbacks are invoked with the fulfillment value or
   * rejection reason as argument. Callbacks are always invoked in the order they
   * were registered, even when additional {@code then} calls are made from inside
   * another callback. A callback is always run asynchronously sometime after the
   * scope containing the registering {@code then} invocation has returned.
   *
   * If a Promise is resolved with another Promise, the first Promise will block
   * until the second is resolved, and then assumes the same result as the second
   * Promise. This allows Promises to depend on the results of other Promises,
   * linking together multiple asynchronous operations.
   *
   * This implementation is compatible with the Promises/A+ specification and
   * passes that specification's conformance test suite. A Closure Promise may be
   * resolved with a Promise instance (or sufficiently compatible Promise-like
   * object) created by other Promise implementations. From the specification,
   * Promise-like objects are known as "Thenables".
   *
   * @see http://promisesaplus.com/
   *
   * @param {function(
   *             this:RESOLVER_CONTEXT,
   *             function((TYPE|IThenable.<TYPE>|Thenable)),
   *             function(*)): void} resolver
   *     Initialization function that is invoked immediately with {@code resolve}
   *     and {@code reject} functions as arguments. The Promise is resolved or
   *     rejected with the first argument passed to either function.
   * @param {RESOLVER_CONTEXT=} opt_context An optional context for executing the
   *     resolver function. If unspecified, the resolver function will be executed
   *     in the default scope.
   * @constructor
   * @struct
   * @final
   * @implements {lfr.Thenable.<TYPE>}
   * @template TYPE,RESOLVER_CONTEXT
   */
  lfr.Promise = function(resolver, opt_context) {
    /**
     * The internal state of this Promise. Either PENDING, FULFILLED, REJECTED, or
     * BLOCKED.
     * @private {lfr.Promise.State_}
     */
    this.state_ = lfr.Promise.State_.PENDING;

    /**
     * The resolved result of the Promise. Immutable once set with either a
     * fulfillment value or rejection reason.
     * @private {*}
     */
    this.result_ = undefined;

    /**
     * For Promises created by calling {@code then()}, the originating parent.
     * @private {lfr.Promise}
     */
    this.parent_ = null;

    /**
     * The list of {@code onFulfilled} and {@code onRejected} callbacks added to
     * this Promise by calls to {@code then()}.
     * @private {Array.<lfr.Promise.CallbackEntry_>}
     */
    this.callbackEntries_ = null;

    /**
     * Whether the Promise is in the queue of Promises to execute.
     * @private {boolean}
     */
    this.executing_ = false;

    if (lfr.Promise.UNHANDLED_REJECTION_DELAY > 0) {
      /**
       * A timeout ID used when the {@code UNHANDLED_REJECTION_DELAY} is greater
       * than 0 milliseconds. The ID is set when the Promise is rejected, and
       * cleared only if an {@code onRejected} callback is invoked for the
       * Promise (or one of its descendants) before the delay is exceeded.
       *
       * If the rejection is not handled before the timeout completes, the
       * rejection reason is passed to the unhandled rejection handler.
       * @private {number}
       */
      this.unhandledRejectionId_ = 0;
    } else if (lfr.Promise.UNHANDLED_REJECTION_DELAY === 0) {
      /**
       * When the {@code UNHANDLED_REJECTION_DELAY} is set to 0 milliseconds, a
       * boolean that is set if the Promise is rejected, and reset to false if an
       * {@code onRejected} callback is invoked for the Promise (or one of its
       * descendants). If the rejection is not handled before the next timestep,
       * the rejection reason is passed to the unhandled rejection handler.
       * @private {boolean}
       */
      this.hadUnhandledRejection_ = false;
    }

    try {
      var self = this;
      resolver.call(
        opt_context, function(value) {
          self.resolve_(lfr.Promise.State_.FULFILLED, value);
        }, function(reason) {
          self.resolve_(lfr.Promise.State_.REJECTED, reason);
        });
    } catch (e) {
      this.resolve_(lfr.Promise.State_.REJECTED, e);
    }
  };

  /**
   * @define {number} The delay in milliseconds before a rejected Promise's reason
   * is passed to the rejection handler. By default, the rejection handler
   * rethrows the rejection reason so that it appears in the developer console or
   * {@code window.onerror} handler.
   *
   * Rejections are rethrown as quickly as possible by default. A negative value
   * disables rejection handling entirely.
   */
  lfr.Promise.UNHANDLED_REJECTION_DELAY = 0;


  /**
   * The possible internal states for a Promise. These states are not directly
   * observable to external callers.
   * @enum {number}
   * @private
   */
  lfr.Promise.State_ = {
    /** The Promise is waiting for resolution. */
    PENDING: 0,

    /** The Promise is blocked waiting for the result of another Thenable. */
    BLOCKED: 1,

    /** The Promise has been resolved with a fulfillment value. */
    FULFILLED: 2,

    /** The Promise has been resolved with a rejection reason. */
    REJECTED: 3
  };


  /**
   * Typedef for entries in the callback chain. Each call to {@code then},
   * {@code thenCatch}, or {@code thenAlways} creates an entry containing the
   * functions that may be invoked once the Promise is resolved.
   *
   * @typedef {{
   *   child: lfr.Promise,
   *   onFulfilled: function(*),
   *   onRejected: function(*)
   * }}
   * @private
   */
  lfr.Promise.CallbackEntry_ = null;


  /**
   * @param {(TYPE|lfr.Thenable.<TYPE>|Thenable)=} opt_value
   * @return {!lfr.Promise.<TYPE>} A new Promise that is immediately resolved
   *     with the given value.
   * @template TYPE
   */
  lfr.Promise.resolve = function(opt_value) {
    return new lfr.Promise(function(resolve) {
        resolve(opt_value);
      });
  };


  /**
   * @param {*=} opt_reason
   * @return {!lfr.Promise} A new Promise that is immediately rejected with the
   *     given reason.
   */
  lfr.Promise.reject = function(opt_reason) {
    return new lfr.Promise(function(resolve, reject) {
        reject(opt_reason);
      });
  };


  /**
   * @param {!Array.<!(lfr.Thenable.<TYPE>|Thenable)>} promises
   * @return {!lfr.Promise.<TYPE>} A Promise that receives the result of the
   *     first Promise (or Promise-like) input to complete.
   * @template TYPE
   */
  lfr.Promise.race = function(promises) {
    return new lfr.Promise(function(resolve, reject) {
        if (!promises.length) {
          resolve(undefined);
        }
        for (var i = 0, promise; (promise = promises[i]); i++) {
          promise.then(resolve, reject);
        }
      });
  };


  /**
   * @param {!Array.<!(lfr.Thenable.<TYPE>|Thenable)>} promises
   * @return {!lfr.Promise.<!Array.<TYPE>>} A Promise that receives a list of
   *     every fulfilled value once every input Promise (or Promise-like) is
   *     successfully fulfilled, or is rejected by the first rejection result.
   * @template TYPE
   */
  lfr.Promise.all = function(promises) {
    return new lfr.Promise(function(resolve, reject) {
        var toFulfill = promises.length;
        var values = [];

        if (!toFulfill) {
          resolve(values);
          return;
        }

        var onFulfill = function(index, value) {
          toFulfill--;
          values[index] = value;
          if (toFulfill === 0) {
            resolve(values);
          }
        };

        var onReject = function(reason) {
          reject(reason);
        };

        for (var i = 0, promise; (promise = promises[i]); i++) {
          promise.then(lfr.partial(onFulfill, i), onReject);
        }
      });
  };


  /**
   * @param {!Array.<!(lfr.Thenable.<TYPE>|Thenable)>} promises
   * @return {!lfr.Promise.<TYPE>} A Promise that receives the value of the first
   *     input to be fulfilled, or is rejected with a list of every rejection
   *     reason if all inputs are rejected.
   * @template TYPE
   */
  lfr.Promise.firstFulfilled = function(promises) {
    return new lfr.Promise(function(resolve, reject) {
        var toReject = promises.length;
        var reasons = [];

        if (!toReject) {
          resolve(undefined);
          return;
        }

        var onFulfill = function(value) {
          resolve(value);
        };

        var onReject = function(index, reason) {
          toReject--;
          reasons[index] = reason;
          if (toReject === 0) {
            reject(reasons);
          }
        };

        for (var i = 0, promise; (promise = promises[i]); i++) {
          promise.then(onFulfill, lfr.partial(onReject, i));
        }
      });
  };


  /**
   * Adds callbacks that will operate on the result of the Promise, returning a
   * new child Promise.
   *
   * If the Promise is fulfilled, the {@code onFulfilled} callback will be invoked
   * with the fulfillment value as argument, and the child Promise will be
   * fulfilled with the return value of the callback. If the callback throws an
   * exception, the child Promise will be rejected with the thrown value instead.
   *
   * If the Promise is rejected, the {@code onRejected} callback will be invoked
   * with the rejection reason as argument, and the child Promise will be rejected
   * with the return value (or thrown value) of the callback.
   *
   * @override
   */
  lfr.Promise.prototype.then = function(
  opt_onFulfilled, opt_onRejected, opt_context) {

    return this.addChildPromise_(
      lfr.isFunction(opt_onFulfilled) ? opt_onFulfilled : null,
      lfr.isFunction(opt_onRejected) ? opt_onRejected : null,
      opt_context);
  };
  lfr.Thenable.addImplementation(lfr.Promise);


  /**
   * Adds a callback that will be invoked whether the Promise is fulfilled or
   * rejected. The callback receives no argument, and no new child Promise is
   * created. This is useful for ensuring that cleanup takes place after certain
   * asynchronous operations. Callbacks added with {@code thenAlways} will be
   * executed in the same order with other calls to {@code then},
   * {@code thenAlways}, or {@code thenCatch}.
   *
   * Since it does not produce a new child Promise, cancellation propagation is
   * not prevented by adding callbacks with {@code thenAlways}. A Promise that has
   * a cleanup handler added with {@code thenAlways} will be canceled if all of
   * its children created by {@code then} (or {@code thenCatch}) are canceled.
   *
   * @param {function(this:THIS): void} onResolved A function that will be invoked
   *     when the Promise is resolved.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     in the global scope.
   * @return {!lfr.Promise.<TYPE>} This Promise, for chaining additional calls.
   * @template THIS
   */
  lfr.Promise.prototype.thenAlways = function(onResolved, opt_context) {
    var callback = function() {
      try {
        // Ensure that no arguments are passed to onResolved.
        onResolved.call(opt_context);
      } catch (err) {
        lfr.Promise.handleRejection_.call(null, err);
      }
    };

    this.addCallbackEntry_({
      child: null,
      onRejected: callback,
      onFulfilled: callback
    });
    return this;
  };


  /**
   * Adds a callback that will be invoked only if the Promise is rejected. This
   * is equivalent to {@code then(null, onRejected)}.
   *
   * @param {!function(this:THIS, *): *} onRejected A function that will be
   *     invoked with the rejection reason if the Promise is rejected.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     in the global scope.
   * @return {!lfr.Promise} A new Promise that will receive the result of the
   *     callback.
   * @template THIS
   */
  lfr.Promise.prototype.thenCatch = function(onRejected, opt_context) {
    return this.addChildPromise_(null, onRejected, opt_context);
  };


  /**
   * Cancels the Promise if it is still pending by rejecting it with a cancel
   * Error. No action is performed if the Promise is already resolved.
   *
   * All child Promises of the canceled Promise will be rejected with the same
   * cancel error, as with normal Promise rejection. If the Promise to be canceled
   * is the only child of a pending Promise, the parent Promise will also be
   * canceled. Cancellation may propagate upward through multiple generations.
   *
   * @param {string=} opt_message An optional debugging message for describing the
   *     cancellation reason.
   */
  lfr.Promise.prototype.cancel = function(opt_message) {
    if (this.state_ === lfr.Promise.State_.PENDING) {
      lfr.async.run(function() {
        var err = new lfr.Promise.CancellationError(opt_message);
        this.cancelInternal_(err);
      }, this);
    }
  };


  /**
   * Cancels this Promise with the given error.
   *
   * @param {!Error} err The cancellation error.
   * @private
   */
  lfr.Promise.prototype.cancelInternal_ = function(err) {
    if (this.state_ === lfr.Promise.State_.PENDING) {
      if (this.parent_) {
        // Cancel the Promise and remove it from the parent's child list.
        this.parent_.cancelChild_(this, err);
      } else {
        this.resolve_(lfr.Promise.State_.REJECTED, err);
      }
    }
  };


  /**
   * Cancels a child Promise from the list of callback entries. If the Promise has
   * not already been resolved, reject it with a cancel error. If there are no
   * other children in the list of callback entries, propagate the cancellation
   * by canceling this Promise as well.
   *
   * @param {!lfr.Promise} childPromise The Promise to cancel.
   * @param {!Error} err The cancel error to use for rejecting the Promise.
   * @private
   */
  lfr.Promise.prototype.cancelChild_ = function(childPromise, err) {
    if (!this.callbackEntries_) {
      return;
    }
    var childCount = 0;
    var childIndex = -1;

    // Find the callback entry for the childPromise, and count whether there are
    // additional child Promises.
    for (var i = 0, entry; (entry = this.callbackEntries_[i]); i++) {
      var child = entry.child;
      if (child) {
        childCount++;
        if (child === childPromise) {
          childIndex = i;
        }
        if (childIndex >= 0 && childCount > 1) {
          break;
        }
      }
    }

    // If the child Promise was the only child, cancel this Promise as well.
    // Otherwise, reject only the child Promise with the cancel error.
    if (childIndex >= 0) {
      if (this.state_ === lfr.Promise.State_.PENDING && childCount === 1) {
        this.cancelInternal_(err);
      } else {
        var callbackEntry = this.callbackEntries_.splice(childIndex, 1)[0];
        this.executeCallback_(
          callbackEntry, lfr.Promise.State_.REJECTED, err);
      }
    }
  };


  /**
   * Adds a callback entry to the current Promise, and schedules callback
   * execution if the Promise has already been resolved.
   *
   * @param {lfr.Promise.CallbackEntry_} callbackEntry Record containing
   *     {@code onFulfilled} and {@code onRejected} callbacks to execute after
   *     the Promise is resolved.
   * @private
   */
  lfr.Promise.prototype.addCallbackEntry_ = function(callbackEntry) {
    if ((!this.callbackEntries_ || !this.callbackEntries_.length) &&
      (this.state_ === lfr.Promise.State_.FULFILLED ||
      this.state_ === lfr.Promise.State_.REJECTED)) {
      this.scheduleCallbacks_();
    }
    if (!this.callbackEntries_) {
      this.callbackEntries_ = [];
    }
    this.callbackEntries_.push(callbackEntry);
  };


  /**
   * Creates a child Promise and adds it to the callback entry list. The result of
   * the child Promise is determined by the state of the parent Promise and the
   * result of the {@code onFulfilled} or {@code onRejected} callbacks as
   * specified in the Promise resolution procedure.
   *
   * @see http://promisesaplus.com/#the__method
   *
   * @param {?function(this:THIS, TYPE):
   *          (RESULT|lfr.Promise.<RESULT>|Thenable)} onFulfilled A callback that
   *     will be invoked if the Promise is fullfilled, or null.
   * @param {?function(this:THIS, *): *} onRejected A callback that will be
   *     invoked if the Promise is rejected, or null.
   * @param {THIS=} opt_context An optional execution context for the callbacks.
   *     in the default calling context.
   * @return {!lfr.Promise} The child Promise.
   * @template RESULT,THIS
   * @private
   */
  lfr.Promise.prototype.addChildPromise_ = function(
  onFulfilled, onRejected, opt_context) {

    var callbackEntry = {
      child: null,
      onFulfilled: null,
      onRejected: null
    };

    callbackEntry.child = new lfr.Promise(function(resolve, reject) {
      // Invoke onFulfilled, or resolve with the parent's value if absent.
      callbackEntry.onFulfilled = onFulfilled ? function(value) {
        try {
          var result = onFulfilled.call(opt_context, value);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      } : resolve;

      // Invoke onRejected, or reject with the parent's reason if absent.
      callbackEntry.onRejected = onRejected ? function(reason) {
        try {
          var result = onRejected.call(opt_context, reason);
          if (!lfr.isDef(result) &&
            reason instanceof lfr.Promise.CancellationError) {
            // Propagate cancellation to children if no other result is returned.
            reject(reason);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      } : reject;
    });

    callbackEntry.child.parent_ = this;
    this.addCallbackEntry_(
      /** @type {lfr.Promise.CallbackEntry_} */ (callbackEntry));
    return callbackEntry.child;
  };


  /**
   * Unblocks the Promise and fulfills it with the given value.
   *
   * @param {TYPE} value
   * @private
   */
  lfr.Promise.prototype.unblockAndFulfill_ = function(value) {
    if (this.state_ !== lfr.Promise.State_.BLOCKED) {
      throw new Error('Promise is not blocked.');
    }
    this.state_ = lfr.Promise.State_.PENDING;
    this.resolve_(lfr.Promise.State_.FULFILLED, value);
  };


  /**
   * Unblocks the Promise and rejects it with the given rejection reason.
   *
   * @param {*} reason
   * @private
   */
  lfr.Promise.prototype.unblockAndReject_ = function(reason) {
    if (this.state_ !== lfr.Promise.State_.BLOCKED) {
      throw new Error('Promise is not blocked.');
    }
    this.state_ = lfr.Promise.State_.PENDING;
    this.resolve_(lfr.Promise.State_.REJECTED, reason);
  };


  /**
   * Attempts to resolve a Promise with a given resolution state and value. This
   * is a no-op if the given Promise has already been resolved.
   *
   * If the given result is a Thenable (such as another Promise), the Promise will
   * be resolved with the same state and result as the Thenable once it is itself
   * resolved.
   *
   * If the given result is not a Thenable, the Promise will be fulfilled or
   * rejected with that result based on the given state.
   *
   * @see http://promisesaplus.com/#the_promise_resolution_procedure
   *
   * @param {lfr.Promise.State_} state
   * @param {*} x The result to apply to the Promise.
   * @private
   */
  lfr.Promise.prototype.resolve_ = function(state, x) {
    if (this.state_ !== lfr.Promise.State_.PENDING) {
      return;
    }

    if (this === x) {
      state = lfr.Promise.State_.REJECTED;
      x = new TypeError('Promise cannot resolve to itself');

    } else if (lfr.Thenable.isImplementedBy(x)) {
      x = /** @type {!lfr.Thenable} */ (x);
      this.state_ = lfr.Promise.State_.BLOCKED;
      x.then(this.unblockAndFulfill_, this.unblockAndReject_, this);
      return;

    } else if (lfr.isObject(x)) {
      try {
        var then = x.then;
        if (lfr.isFunction(then)) {
          this.tryThen_(x, then);
          return;
        }
      } catch (e) {
        state = lfr.Promise.State_.REJECTED;
        x = e;
      }
    }

    this.result_ = x;
    this.state_ = state;
    this.scheduleCallbacks_();

    if (state === lfr.Promise.State_.REJECTED &&
      !(x instanceof lfr.Promise.CancellationError)) {
      lfr.Promise.addUnhandledRejection_(this, x);
    }
  };


  /**
   * Attempts to call the {@code then} method on an object in the hopes that it is
   * a Promise-compatible instance. This allows interoperation between different
   * Promise implementations, however a non-compliant object may cause a Promise
   * to hang indefinitely. If the {@code then} method throws an exception, the
   * dependent Promise will be rejected with the thrown value.
   *
   * @see http://promisesaplus.com/#point-70
   *
   * @param {Thenable} thenable An object with a {@code then} method that may be
   *     compatible with the Promise/A+ specification.
   * @param {!Function} then The {@code then} method of the Thenable object.
   * @private
   */
  lfr.Promise.prototype.tryThen_ = function(thenable, then) {
    this.state_ = lfr.Promise.State_.BLOCKED;
    var promise = this;
    var called = false;

    var resolve = function(value) {
      if (!called) {
        called = true;
        promise.unblockAndFulfill_(value);
      }
    };

    var reject = function(reason) {
      if (!called) {
        called = true;
        promise.unblockAndReject_(reason);
      }
    };

    try {
      then.call(thenable, resolve, reject);
    } catch (e) {
      reject(e);
    }
  };


  /**
   * Executes the pending callbacks of a resolved Promise after a timeout.
   *
   * Section 2.2.4 of the Promises/A+ specification requires that Promise
   * callbacks must only be invoked from a call stack that only contains Promise
   * implementation code, which we accomplish by invoking callback execution after
   * a timeout. If {@code startExecution_} is called multiple times for the same
   * Promise, the callback chain will be evaluated only once. Additional callbacks
   * may be added during the evaluation phase, and will be executed in the same
   * event loop.
   *
   * All Promises added to the waiting list during the same browser event loop
   * will be executed in one batch to avoid using a separate timeout per Promise.
   *
   * @private
   */
  lfr.Promise.prototype.scheduleCallbacks_ = function() {
    if (!this.executing_) {
      this.executing_ = true;
      lfr.async.run(this.executeCallbacks_, this);
    }
  };


  /**
   * Executes all pending callbacks for this Promise.
   *
   * @private
   */
  lfr.Promise.prototype.executeCallbacks_ = function() {
    while (this.callbackEntries_ && this.callbackEntries_.length) {
      var entries = this.callbackEntries_;
      this.callbackEntries_ = [];

      for (var i = 0; i < entries.length; i++) {
        this.executeCallback_(entries[i], this.state_, this.result_);
      }
    }
    this.executing_ = false;
  };


  /**
   * Executes a pending callback for this Promise. Invokes an {@code onFulfilled}
   * or {@code onRejected} callback based on the resolved state of the Promise.
   *
   * @param {!lfr.Promise.CallbackEntry_} callbackEntry An entry containing the
   *     onFulfilled and/or onRejected callbacks for this step.
   * @param {lfr.Promise.State_} state The resolution status of the Promise,
   *     either FULFILLED or REJECTED.
   * @param {*} result The resolved result of the Promise.
   * @private
   */
  lfr.Promise.prototype.executeCallback_ = function(
  callbackEntry, state, result) {
    if (state === lfr.Promise.State_.FULFILLED) {
      callbackEntry.onFulfilled(result);
    } else {
      this.removeUnhandledRejection_();
      callbackEntry.onRejected(result);
    }
  };


  /**
   * Marks this rejected Promise as having being handled. Also marks any parent
   * Promises in the rejected state as handled. The rejection handler will no
   * longer be invoked for this Promise (if it has not been called already).
   *
   * @private
   */
  lfr.Promise.prototype.removeUnhandledRejection_ = function() {
    var p;
    if (lfr.Promise.UNHANDLED_REJECTION_DELAY > 0) {
      for (p = this; p && p.unhandledRejectionId_; p = p.parent_) {
        clearTimeout(p.unhandledRejectionId_);
        p.unhandledRejectionId_ = 0;
      }
    } else if (lfr.Promise.UNHANDLED_REJECTION_DELAY === 0) {
      for (p = this; p && p.hadUnhandledRejection_; p = p.parent_) {
        p.hadUnhandledRejection_ = false;
      }
    }
  };


  /**
   * Marks this rejected Promise as unhandled. If no {@code onRejected} callback
   * is called for this Promise before the {@code UNHANDLED_REJECTION_DELAY}
   * expires, the reason will be passed to the unhandled rejection handler. The
   * handler typically rethrows the rejection reason so that it becomes visible in
   * the developer console.
   *
   * @param {!lfr.Promise} promise The rejected Promise.
   * @param {*} reason The Promise rejection reason.
   * @private
   */
  lfr.Promise.addUnhandledRejection_ = function(promise, reason) {
    if (lfr.Promise.UNHANDLED_REJECTION_DELAY > 0) {
      promise.unhandledRejectionId_ = setTimeout(function() {
        lfr.Promise.handleRejection_.call(null, reason);
      }, lfr.Promise.UNHANDLED_REJECTION_DELAY);

    } else if (lfr.Promise.UNHANDLED_REJECTION_DELAY === 0) {
      promise.hadUnhandledRejection_ = true;
      lfr.async.run(function() {
        if (promise.hadUnhandledRejection_) {
          lfr.Promise.handleRejection_.call(null, reason);
        }
      });
    }
  };


  /**
   * A method that is invoked with the rejection reasons for Promises that are
   * rejected but have no {@code onRejected} callbacks registered yet.
   * @type {function(*)}
   * @private
   */
  lfr.Promise.handleRejection_ = lfr.async.throwException;


  /**
   * Sets a handler that will be called with reasons from unhandled rejected
   * Promises. If the rejected Promise (or one of its descendants) has an
   * {@code onRejected} callback registered, the rejection will be considered
   * handled, and the rejection handler will not be called.
   *
   * By default, unhandled rejections are rethrown so that the error may be
   * captured by the developer console or a {@code window.onerror} handler.
   *
   * @param {function(*)} handler A function that will be called with reasons from
   *     rejected Promises. Defaults to {@code lfr.async.throwException}.
   */
  lfr.Promise.setUnhandledRejectionHandler = function(handler) {
    lfr.Promise.handleRejection_ = handler;
  };



  /**
   * Error used as a rejection reason for canceled Promises.
   *
   * @param {string=} opt_message
   * @constructor
   * @extends {lfr.debug.Error}
   * @final
   */
  lfr.Promise.CancellationError = function(opt_message) {
    lfr.Promise.CancellationError.base(this, 'constructor', opt_message);

    if (opt_message) {
      this.message = opt_message;
    }
  };
  lfr.inherits(lfr.Promise.CancellationError, Error);


  /** @override */
  lfr.Promise.CancellationError.prototype.name = 'cancel';
}(window));

(function() {
  'use strict';

  /**
   * Disposable utility. When inherited provides the `dispose` function to its
   * subclass, which is responsible for disposing of any object references
   * when an instance won't be used anymore. Subclasses should override
   * `disposeInternal` to implement any specific disposing logic.
   * @constructor
   */
  lfr.Disposable = function() {};

  /**
   * Flag indicating if this instance has already been disposed.
   * @type {boolean}
   * @protected
   */
  lfr.Disposable.prototype.disposed_ = false;

  /**
   * Disposes of this instance's object references. Calls `disposeInternal`.
   */
  lfr.Disposable.prototype.dispose = function() {
    if (!this.disposed_) {
      this.disposeInternal();
      this.disposed_ = true;
    }
  };

  /**
   * Subclasses should override this method to implement any specific
   * disposing logic (like clearing references and calling `dispose` on other
   * disposables).
   */
  lfr.Disposable.prototype.disposeInternal = lfr.nullFunction;

  /**
   * Checks if this instance has already been disposed.
   * @return {boolean}
   */
  lfr.Disposable.prototype.isDisposed = function() {
    return this.disposed_;
  };

}());

(function() {
  'use strict';

  /**
   * Trie data structure. It's useful for quickly storing and finding
   * information related to strings and their prefixes. See
   * http://en.wikipedia.org/wiki/Trie.
   * @constructor
   */
  lfr.Trie = function(value) {
    this.value_ = value;
    this.children_ = {};
  };
  lfr.inherits(lfr.Trie, lfr.Disposable);

  /**
   * The list of children for this tree.
   * @type {Object.<string, Trie>}
   * @protected
   */
  lfr.Trie.prototype.children_ = null;

  /**
   * The value associated with this tree.
   * @type {*}
   * @protected
   */
  lfr.Trie.prototype.value_ = null;

  /**
   * Empties the trie of all keys and values.
   */
  lfr.Trie.prototype.clear = function() {
    this.children_ = {};
    this.value_ = null;
  };

  /**
   * Creates a new trie node.
   * @return {lfr.Trie}
   */
  lfr.Trie.prototype.createNewTrieNode = function() {
    return new lfr.Trie();
  };

  /**
   * Disposes of this instance's object references.
   * @override
   */
  lfr.Trie.prototype.disposeInternal = function() {
    for (var k in this.children_) {
      this.children_[k].dispose();
    }

    this.children_ = null;
    this.value_ = null;
  };

  /**
   * Finds the node that represents the given key on this tree.
   * @param {!(Array|string)} key The key to set the value at.
   * @param {boolean} createIfMissing Flag indicating if nodes that don't yet
   *   exist in the searched path should be created.
   * @return {!Trie}
   */
  lfr.Trie.prototype.findKeyNode_ = function(key, createIfMissing) {
    var node = this;

    key = this.normalizeKey(key);

    for (var i = 0; i < key.length; i++) {
      node = node.getChild(key[i], createIfMissing);
      if (!node) {
        return null;
      }
    }

    return node;
  };

  /**
   * Returns an array with all the child nodes for this trie.
   * @return {!Array}
   */
  lfr.Trie.prototype.getAllChildren = function() {
    var allChildren = [];

    for (var k in this.children_) {
      allChildren.push(this.children_[k]);
    }

    return allChildren;
  };

  /**
   * Gets the child node for the given key part.
   * @param {string} keyPart String that can directly access a child of this
   *   Trie.
   * @param {boolean} createIfMissing Flag indicating if the child should be
   *   created if it doesn't exist.
   * @return {lfr.Trie}
   */
  lfr.Trie.prototype.getChild = function(keyPart, createIfMissing) {
    var child = this.children_[keyPart];

    if (createIfMissing && !child) {
      child = this.createNewTrieNode();
      this.setChild(keyPart, child);
    }

    return child;
  };

  /**
   * Gets the value for the given key in the tree.
   * @param {!(Array|string)} key
   * @return {*}
   */
  lfr.Trie.prototype.getKeyValue = function(key) {
    var node = this.findKeyNode_(key);

    return node ? node.getValue() : null;
  };

  /**
   * Gets this tree's value.
   * @return {*}
   */
  lfr.Trie.prototype.getValue = function() {
    return this.value_;
  };

  /**
   * Returns a normalized key, to be used by a Trie.
   * @param  {!(Array|string)} key The key to be normalized.
   * @return {!Array} The normalized key.
   */
  lfr.Trie.prototype.normalizeKey = function(key) {
    return lfr.isString(key) ? key.split('') : key;
  };

  /**
   * Sets the child node for the given key part.
   * @param {string} keyPart String that can directly access a child of this
   *   Trie.
   * @param {lfr.Trie} child
   */
  lfr.Trie.prototype.setChild = function(keyPart, child) {
    this.children_[keyPart] = child;
  };

  /**
   * Sets the given key/value pair in the tree. If the key already exists and
   * `mergeFn` is given, the result of its call will be set as the value
   * instead.
   * @param {!(Array|string)} key The key to set the value at.
   * @param {*} value The value to set.
   * @param {function(*, *)=} opt_mergeFn Function to be called if the key
   *   already exists. It will be called with the old and the new values, and
   *   the key will be set to its return value.
   */
  lfr.Trie.prototype.setKeyValue = function(key, value, opt_mergeFn) {
    var node = this.findKeyNode_(key, true);

    if (node.getValue() && opt_mergeFn) {
      value = opt_mergeFn(node.getValue(), value);
    }

    node.setValue(value);

    return node.getValue();
  };

  /**
   * Sets this tree's value.
   * @param {*} value
   */
  lfr.Trie.prototype.setValue = function(value) {
    this.value_ = value;
  };

}());

(function() {
  'use strict';

  /**
   * A trie that can handle wildcards.
   * @param {*} value
   * @constructor
   */
  lfr.WildcardTrie = function(value) {
    lfr.WildcardTrie.base(this, 'constructor', value);
  };
  lfr.inherits(lfr.WildcardTrie, lfr.Trie);

  /**
   * A token representing any single namespace.
   * @type {string}
   * @static
   */
  lfr.WildcardTrie.TOKEN_SKIP_SINGLE = '*';

  /**
   * Creates a new trie node.
   * @return {Trie}
   * @override
   */
  lfr.WildcardTrie.prototype.createNewTrieNode = function() {
    return new lfr.WildcardTrie();
  };

  /**
   * Gets all the children that match any of the given list of key parts.
   * @param {!Array} keyParts
   * @return {!Array}
   * @protected
   */
  lfr.WildcardTrie.prototype.getChildrenMatchingKeyParts_ = function(keyParts) {
    var matchingChildren = [];

    for (var i = 0; i < keyParts.length; i++) {
      var child = this.getChild(keyParts[i]);
      if (child) {
        matchingChildren.push(child);
      }
    }

    return matchingChildren;
  };

  /**
   * Gets the value for the given key in the tree.
   * @param {!(Array|string)} key
   * @return {!Array}
   * @override
   */
  lfr.WildcardTrie.prototype.getKeyValue = function(key) {
    key = this.normalizeKey(key);

    var nextKey = key.concat();
    var keyPart = nextKey.shift();

    if (!keyPart) {
      return this.getValue() ? [this.getValue()] : [];
    }

    return this.getKeyValueForChildren_(nextKey, keyPart);
  };

  /**
   * Gets the values of a key on the children that match the given key part.
   * @param  {!Array} key
   * @param  {string} keyPart
   * @return {!Array}
   */
  lfr.WildcardTrie.prototype.getKeyValueForChildren_ = function(key, keyPart) {
    var values = [];

    var children = this.getMatchingChildren_(keyPart);
    for (var i = 0; i < children.length; i++) {
      values = values.concat(children[i].getKeyValue(key));
    }

    return values;
  };

  /**
   * Gets all the children of this trie that match the given key part.
   * @param  {string} keyPart
   * @return {!Array.<Trie>}
   */
  lfr.WildcardTrie.prototype.getMatchingChildren_ = function(keyPart) {
    var matchingChildren = [];

    if (keyPart === lfr.WildcardTrie.TOKEN_SKIP_SINGLE) {
      matchingChildren = this.getAllChildren();
    } else {
      matchingChildren = this.getChildrenMatchingKeyParts_(
        [keyPart, lfr.WildcardTrie.TOKEN_SKIP_SINGLE]
      );
    }

    return matchingChildren;
  };

}());

(function() {
  'use strict';

  /**
   * EventHandle utility. Holds information about an event subscription, and
   * allows removing them easily.
   * EventHandle is a Disposable, but it's important to note that the
   * EventEmitter that created it is not the one responsible for disposing it.
   * That responsibility is for the code that holds a reference to it.
   * @param {!lfr.EventEmitter} emitter Emitter the event was subscribed to.
   * @param {string} event The name of the event that was subscribed to.
   * @param {!Function} listener The listener subscribed to the event.
   * @constructor
   */
  lfr.EventHandle = function(emitter, event, listener) {
    this.emitter_ = emitter;
    this.event_ = event;
    this.listener_ = listener;
  };
  lfr.inherits(lfr.EventHandle, lfr.Disposable);

  /**
   * The lfr.EventEmitter instance that the event was subscribed to.
   * @type {lfr.EventEmitter}
   * @protected
   */
  lfr.EventHandle.prototype.emitter_ = null;

  /**
   * The name of the event that was subscribed to.
   * @type {string}
   * @protected
   */
  lfr.EventHandle.prototype.event_ = null;

  /**
   * The listener subscribed to the event.
   * @type {Function}
   * @protected
   */
  lfr.EventHandle.prototype.listener_ = null;

  /**
   * Disposes of this instance's object references.
   * @override
   */
  lfr.EventHandle.prototype.disposeInternal = function() {
    this.emitter_ = null;
    this.listener_ = null;
  };

  /**
   * Removes the listener subscription from the emitter.
   */
  lfr.EventHandle.prototype.removeListener = function() {
    if (!this.emitter_.isDisposed()) {
      this.emitter_.removeListener(this.event_, this.listener_);
    }
  };

}());

(function() {
  'use strict';

  /**
   * This is a special EventHandle, that is responsible for dom events, instead
   * of EventEmitter events.
   * @param {!lfr.EventEmitter} emitter Emitter the event was subscribed to.
   * @param {string} event The name of the event that was subscribed to.
   * @param {!Function} listener The listener subscribed to the event.
   * @constructor
   */
  lfr.DomEventHandle = function(emitter, event, listener) {
    lfr.DomEventHandle.base(this, 'constructor', emitter, event, listener);
  };
  lfr.inherits(lfr.DomEventHandle, lfr.EventHandle);

  /**
   * @inheritDoc
   */
  lfr.DomEventHandle.prototype.removeListener = function() {
    this.emitter_.removeEventListener(this.event_, this.listener_);
  };
}());

(function() {
  'use strict';

  /**
   * EventHandler utility. It's useful for easily removing a group of
   * listeners from different lfr.EventEmitter instances.
   * @constructor
   */
  lfr.EventHandler = function() {
    this.eventHandles_ = [];
  };
  lfr.inherits(lfr.EventHandler, lfr.Disposable);

  /**
   * An array that holds the added event handles, so the listeners can be
   * removed later.
   * @type {Array.<lfr.EventHandle>}
   * @protected
   */
  lfr.EventHandler.prototype.eventHandles_ = null;

  /**
   * Adds event handles to be removed later through the `removeAllListeners`
   * method.
   * @param {...(!lfr.EventHandle)} var_args
   */
  lfr.EventHandler.prototype.add = function() {
    for (var i = 0; i < arguments.length; i++) {
      this.eventHandles_.push(arguments[i]);
    }
  };

  /**
   * Disposes of this instance's object references.
   * @override
   */
  lfr.EventHandler.prototype.disposeInternal = function() {
    this.eventHandles_ = null;
  };

  /**
   * Removes all listeners that have been added through the `add` method.
   */
  lfr.EventHandler.prototype.removeAllListeners = function() {
    for (var i = 0; i < this.eventHandles_.length; i++) {
      this.eventHandles_[i].removeListener();
    }

    this.eventHandles_ = [];
  };

}());

(function() {
  'use strict';

  /**
   * EventEmitter utility.
   * @constructor
   */
  lfr.EventEmitter = function() {
    this.listenersTree_ = new lfr.WildcardTrie();
  };
  lfr.inherits(lfr.EventEmitter, lfr.Disposable);

  /**
   * The delimiter being used for namespaces.
   * @type {string}
   * @protected
   */
  lfr.EventEmitter.prototype.delimiter_ = '.';

  /**
   * Holds event listeners scoped by event type.
   * @type {Trie}
   * @protected
   */
  lfr.EventEmitter.prototype.listenersTree_ = null;

  /**
   * The maximum number of listeners allowed for each event type. If the number
   * becomes higher than the max, a warning will be issued.
   * @type {number}
   * @protected
   */
  lfr.EventEmitter.prototype.maxListeners_ = 10;

  /**
   * The id that will be assigned to the next listener added to this event
   * emitter.
   * @type {number}
   * @protected
   */
  lfr.EventEmitter.prototype.nextId_ = 1;

  /**
   * Configuration option which determines if an event facade should be sent
   * as a param of listeners when emitting events. If set to true, the facade
   * will be passed as the first argument of the listener.
   * @type {boolean}
   * @protected
   */
  lfr.EventEmitter.prototype.shouldUseFacade_ = false;

  /**
   * Adds a listener to the end of the listeners array for the specified events.
   * @param {!(Array|string)} events
   * @param {!Function} listener
   * @return {!lfr.EventHandle} Can be used to remove the listener.
   */
  lfr.EventEmitter.prototype.addListener = function(events, listener) {
    this.validateListener_(listener);

    events = this.normalizeEvents_(events);
    for (var i = 0; i < events.length; i++) {
      this.addSingleListener_(events[i], listener);
    }

    return new lfr.EventHandle(this, events, listener);
  };

  /**
   * Adds a listener to the end of the listeners array for a single event.
   * @param {string} event
   * @param {!Function} listener
   * @param {Function=} opt_origin The original function that was added as a
   *   listener, if there is any.
   * @protected
   */
  lfr.EventEmitter.prototype.addSingleListener_ = function(event, listener, opt_origin) {
    this.emit('newListener', event, listener);

    var listeners = this.listenersTree_.setKeyValue(
      this.splitNamespaces_(event),
      [{
        fn: listener,
        id: this.nextId_++,
        origin: opt_origin
      }],
      this.mergeListenerArrays_
    );

    if (listeners.length > this.maxListeners_ && !listeners.warned) {
      console.warn(
        'Possible EventEmitter memory leak detected. %d listeners added ' +
        'for event %s. Use emitter.setMaxListeners() to increase limit.',
        listeners.length,
        event
      );
      listeners.warned = true;
    }
  };

  /**
   * Comparison function between listener objects.
   * @param {!Object} listener1
   * @param {!Object} listener2
   * @return {Number} The difference between the ids of the objects.
   * @protected
   */
  lfr.EventEmitter.prototype.compareListenerObjs_ = function(obj1, obj2) {
    return obj1.id - obj2.id;
  };

  /**
   * Disposes of this instance's object references.
   * @override
   */
  lfr.EventEmitter.prototype.disposeInternal = function() {
    this.listenersTree_.dispose();
    this.listenersTree_ = null;
  };

  /**
   * Execute each of the listeners in order with the supplied arguments.
   * @param {string} event
   * @param {*} opt_args [arg1], [arg2], [...]
   * @return {boolean} Returns true if event had listeners, false otherwise.
   */
  lfr.EventEmitter.prototype.emit = function(event) {
    var args = Array.prototype.slice.call(arguments, 1);
    var listened = false;
    var listeners = this.listeners(event);

    if (this.getShouldUseFacade()) {
      var facade = {
        type: event
      };
      args = [facade].concat(args);
    }

    for (var i = 0; i < listeners.length; i++) {
      listeners[i].apply(this, args);
      listened = true;
    }

    return listened;
  };

  /**
   * Gets the delimiter to be used by namespaces.
   * @return {string}
   */
  lfr.EventEmitter.prototype.getDelimiter = function() {
    return this.delimiter_;
  };

  /**
   * Gets the configuration option which determines if an event facade should
   * be sent as a param of listeners when emitting events. If set to true, the
   * facade will be passed as the first argument of the listener.
   * @return {boolean}
   */
  lfr.EventEmitter.prototype.getShouldUseFacade = function() {
    return this.shouldUseFacade_;
  };

  /**
   * Returns an array of listeners for the specified event.
   * @param {string} event
   * @return {Array} Array of listeners.
   */
  lfr.EventEmitter.prototype.listeners = function(event) {
    var listenerArrays = this.searchListenerTree_(event);
    var listeners = [];

    for (var i = 0; i < listenerArrays.length; i++) {
      listeners = listeners.concat(listenerArrays[i]);
    }

    if (listenerArrays.length > 1) {
      // If there was more than one result, we should reorder the listeners,
      // since we joined them without taking the order into account.
      listeners.sort(this.compareListenerObjs_);
    }

    return listeners.map(function(listener) {
      return listener.fn;
    });
  };

  /**
   * Adds a listener that will be invoked a fixed number of times for the
   * events. After each event is triggered the specified amount of times, the
   * listener is removed for it.
   * @param {!(Array|string)} events
   * @param {number} amount The amount of times this event should be listened
   * to.
   * @param {!Function} listener
   * @return {!lfr.EventHandle} Can be used to remove the listener.
   */
  lfr.EventEmitter.prototype.many = function(events, amount, listener) {
    events = this.normalizeEvents_(events);
    for (var i = 0; i < events.length; i++) {
      this.many_(events[i], amount, listener);
    }

    return new lfr.EventHandle(this, events, listener);
  };

  /**
   * Adds a listener that will be invoked a fixed number of times for a single
   * event. After the event is triggered the specified amount of times, the
   * listener is removed.
   * @param {string} event
   * @param {number} amount The amount of times this event should be listened
   * to.
   * @param {!Function} listener
   * @protected
   */
  lfr.EventEmitter.prototype.many_ = function(event, amount, listener) {
    var self = this;

    if (amount <= 0) {
      return;
    }

    function handlerInternal() {
      if (--amount === 0) {
        self.removeListener(event, handlerInternal);
      }
      listener.apply(self, arguments);
    }

    self.addSingleListener_(event, handlerInternal, listener);
  };

  /**
   * Checks if a listener object matches the given listener function. To match,
   * it needs to either point to that listener or have it as its origin.
   * @param {!Object} listenerObj
   * @param {!Function} listener
   * @return {boolean}
   * @protected
   */
  lfr.EventEmitter.prototype.matchesListener_ = function(listenerObj, listener) {
    return listenerObj.fn === listener ||
      (listenerObj.origin && listenerObj.origin === listener);
  };

  /**
   * Merges two objects that contain event listeners.
   * @param  {!Object} arr1
   * @param  {!Object} arr2
   * @return {!Object}
   * @protected
   */
  lfr.EventEmitter.prototype.mergeListenerArrays_ = function(arr1, arr2) {
    for (var i = 0; i < arr2.length; i++) {
      arr1.push(arr2[i]);
    }
    return arr1;
  };

  /**
   * Converts the parameter to an array if only one event is given.
   * @param  {!(Array|string)} events
   * @return {!Array}
   * @protected
   */
  lfr.EventEmitter.prototype.normalizeEvents_ = function(events) {
    return lfr.isString(events) ? [events] : events;
  };

  /**
   * Removes a listener for the specified events.
   * Caution: changes array indices in the listener array behind the listener.
   * @param {!(Array|string)} events
   * @param {!Function} listener
   * @return {!Object} Returns emitter, so calls can be chained.
   */
  lfr.EventEmitter.prototype.off = function(events, listener) {
    this.validateListener_(listener);

    var listenerArrays = this.searchListenerTree_(events);
    for (var i = 0; i < listenerArrays.length; i++) {
      this.removeMatchingListenerObjs_(listenerArrays[i], listener);
    }

    return this;
  };

  /**
   * Adds a listener to the end of the listeners array for the specified events.
   * @param {!(Array|string)} events
   * @param {!Function} listener
   * @return {!lfr.EventHandle} Can be used to remove the listener.
   */
  lfr.EventEmitter.prototype.on = lfr.EventEmitter.prototype.addListener;

  /**
   * Adds a one time listener for the events. This listener is invoked only the
   * next time each event is fired, after which it is removed.
   * @param {!(Array|string)} events
   * @param {!Function} listener
   * @return {!lfr.EventHandle} Can be used to remove the listener.
   */
  lfr.EventEmitter.prototype.once = function(events, listener) {
    return this.many(events, 1, listener);
  };

  /**
   * Removes all listeners, or those of the specified events. It's not a good
   * idea to remove listeners that were added elsewhere in the code,
   * especially when it's on an emitter that you didn't create.
   * @param {(Array|string)=} opt_events
   * @return {!Object} Returns emitter, so calls can be chained.
   */
  lfr.EventEmitter.prototype.removeAllListeners = function(opt_events) {
    if (!opt_events) {
      this.listenersTree_.clear();
      return this;
    }

    return this.removeAllListenersForEvents_(opt_events);
  };

  /**
   * Removes all listeners for the specified events.
   * @param  {!(Array|string)} events
   * @return {!Object} Returns emitter, so calls can be chained.
   * @protected
   */
  lfr.EventEmitter.prototype.removeAllListenersForEvents_ = function(events) {
    events = this.normalizeEvents_(events);
    for (var i = 0; i < events.length; i++) {
      this.listenersTree_.setKeyValue(this.splitNamespaces_(events[i]), []);
    }

    return this;
  };

  /**
   * Removes a listener for the specified events.
   * Caution: changes array indices in the listener array behind the listener.
   * @param {!(Array|string)} events
   * @param {!Function} listener
   * @return {!Object} Returns emitter, so calls can be chained.
   */
  lfr.EventEmitter.prototype.removeListener = lfr.EventEmitter.prototype.off;

  /**
   * Removes all listener objects from the given array that match the given
   * listener function.
   * @param {!Array.<Object>} listenerObjects
   * @param {!Function} listener
   * @protected
   */
  lfr.EventEmitter.prototype.removeMatchingListenerObjs_ = function(listenerObjects, listener) {
    for (var i = listenerObjects.length - 1; i >= 0; i--) {
      if (this.matchesListener_(listenerObjects[i], listener)) {
        listenerObjects.splice(i, 1);
      }
    }
  };

  /**
   * Searches the listener tree for the given events.
   * @param {!(Array|string)} events
   * @return {!Array.<Array>} An array of listener arrays returned by the tree.
   * @protected
   */
  lfr.EventEmitter.prototype.searchListenerTree_ = function(events) {
    var values = [];

    events = this.normalizeEvents_(events);
    for (var i = 0; i < events.length; i++) {
      values = values.concat(
        this.listenersTree_.getKeyValue(this.splitNamespaces_(events[i]))
      );
    }

    return values;
  };

  /**
   * Sets the delimiter to be used by namespaces.
   * @param {string} delimiter
   * @return {!Object} Returns emitter, so calls can be chained.
   */
  lfr.EventEmitter.prototype.setDelimiter = function(delimiter) {
    this.delimiter_ = delimiter;
    return this;
  };

  /**
   * By default EventEmitters will print a warning if more than 10 listeners
   * are added for a particular event. This is a useful default which helps
   * finding memory leaks. Obviously not all Emitters should be limited to 10.
   * This function allows that to be increased. Set to zero for unlimited.
   * @param {number} max The maximum number of listeners.
   * @return {!Object} Returns emitter, so calls can be chained.
   */
  lfr.EventEmitter.prototype.setMaxListeners = function(max) {
    this.maxListeners_ = max;
    return this;
  };

  /**
   * Sets the configuration option which determines if an event facade should
   * be sent as a param of listeners when emitting events. If set to true, the
   * facade will be passed as the first argument of the listener.
   * @param {boolean} shouldUseFacade
   * @return {!Object} Returns emitter, so calls can be chained.
   */
  lfr.EventEmitter.prototype.setShouldUseFacade = function(shouldUseFacade) {
    this.shouldUseFacade_ = shouldUseFacade;
    return this;
  };

  /**
   * Splits the event, using the current delimiter.
   * @param {string} event
   * @return {!Array}
   * @protected
   */
  lfr.EventEmitter.prototype.splitNamespaces_ = function(event) {
    return event.split(this.getDelimiter());
  };

  /**
   * Checks if the given listener is valid, throwing an exception when it's not.
   * @param  {*} listener
   * @protected
   */
  lfr.EventEmitter.prototype.validateListener_ = function(listener) {
    if (!lfr.isFunction(listener)) {
      throw new TypeError('Listener must be a function');
    }
  };
}());

(function() {
  'use strict';

  /**
   * EventEmitterProxy utility. It's responsible for linking two EventEmitter
   * instances together, emitting events from the first emitter through the
   * second one. That means that listening to a supported event on the target
   * emitter will mean listening to it on the origin emitter as well.
   * @param {lfr.EventEmitter | Element} originEmitter Events originated on this emitter
   *   will be fired for the target emitter's listeners as well. Can be either a real
   *   EventEmitter instance or a DOM element.
   * @param {lfr.EventEmitter} targetEmitter Event listeners attached to this emitter
   *   will also be triggered when the event is fired by the origin emitter.
   * @param {Object} opt_blacklist Optional blacklist of events that should not be
   *   proxied.
   * @constructor
   */
  lfr.EventEmitterProxy = function(originEmitter, targetEmitter, opt_blacklist) {
    this.originEmitter_ = originEmitter;
    this.targetEmitter_ = targetEmitter;
    this.blacklist_ = opt_blacklist || {};
    this.proxiedEvents_ = {};

    this.startProxy_();
  };
  lfr.inherits(lfr.EventEmitterProxy, lfr.Disposable);

  /**
   * Map of events that should not be proxied.
   * @type {Object}
   * @default null
   * @protected
   */
  lfr.EventEmitterProxy.prototype.blacklist_ = null;

  /**
   * The origin emitter. This emitter's events will be proxied through the
   * target emitter.
   * @type {lfr.EventEmitter}
   * @default null
   * @protected
   */
  lfr.EventEmitterProxy.prototype.originEmitter_ = null;

  /**
   * Holds a map of events from the origin emitter that are already being proxied.
   * @type {Object}
   * @default null
   * @protected
   */
  lfr.EventEmitterProxy.prototype.proxiedEvents_ = null;

  /**
   * The target emitter. This emitter will emit all events that come from
   * the origin emitter.
   * @type {lfr.EventEmitter}
   * @default null
   * @protected
   */
  lfr.EventEmitterProxy.prototype.targetEmitter_ = null;

  /**
   * @inheritDoc
   */
  lfr.EventEmitterProxy.prototype.disposeInternal = function() {
    var removeFnName = lfr.isElement(this.originEmitter_) ? 'removeEventListener' : 'removeListener';
    for (var event in this.proxiedEvents_) {
      this.originEmitter_[removeFnName](event, this.proxiedEvents_[event]);
    }

    this.proxiedEvents_ = null;
    this.originEmitter_ = null;
    this.targetEmitter_ = null;
  };

  /**
   * Proxies the given event from the origin to the target emitter.
   * @param {string} event
   */
  lfr.EventEmitterProxy.prototype.proxyEvent_ = function(event) {
    if (!this.shouldProxyEvent_(event)) {
      return;
    }

    var self = this;
    this.proxiedEvents_[event] = function() {
      var args = [event].concat(Array.prototype.slice.call(arguments, 0));
      self.targetEmitter_.emit.apply(self.targetEmitter_, args);
    };

    var addFnName = lfr.isElement(this.originEmitter_) ? 'addEventListener' : 'on';
    this.originEmitter_[addFnName](event, this.proxiedEvents_[event]);
  };

  /**
   * Checks if the given event should be proxied.
   * @param {string} event
   * @return {boolean}
   * @protected
   */
  lfr.EventEmitterProxy.prototype.shouldProxyEvent_ = function(event) {
    return !this.proxiedEvents_[event] && !this.blacklist_[event] &&
      (!lfr.isElement(this.originEmitter_) || lfr.dom.supportsEvent(this.originEmitter_, event));
  };

  /**
   * Starts proxying all events from the origin to the target emitter.
   * @protected
   */
  lfr.EventEmitterProxy.prototype.startProxy_ = function() {
    this.targetEmitter_.on('newListener', lfr.bind(this.proxyEvent_, this));
  };
}());

(function() {
  'use strict';

  lfr.dom = lfr.dom || {};

  /**
   * Appends a child node with text or other nodes to a parent node. If
   * child is a HTML string it will be automatically converted to a document
   * fragment before appending it to the parent.
   * @param {!Element} parent The node to append nodes to.
   * @param {!Element|String} child The thing to append to the parent.
   * @return {!Element} The appended child.
   */
  lfr.dom.append = function(parent, child) {
    if (lfr.isString(child)) {
      child = lfr.dom.buildFragment(child);
    }
    return parent.appendChild(child);
  };

  /**
   * Helper for converting a HTML string into a document fragment.
   * @param {string} htmlString The HTML string to convert.
   * @return {!Element} The resulting document fragment.
   */
  lfr.dom.buildFragment = function(htmlString) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = '<br>' + htmlString;
    tempDiv.removeChild(tempDiv.firstChild);

    var fragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
    return fragment;
  };

  /**
   * Listens to the specified event on the given DOM element, but only calls the
   * callback with the event when it triggered by elements that match the given
   * selector.
   * @param {!Element} element The container DOM element to listen to the event on.
   * @param {string} eventName The name of the event to listen to.
   * @param {string} selector The selector that matches the child elements that
   *   the event should be triggered for.
   * @param {!function(!Object)} callback Function to be called when the event is
   *   triggered. It will receive the normalized event object.
   * @return {!lfr.DomEventHandle} Can be used to remove the listener.
   */
  lfr.dom.delegate = function(element, eventName, selector, callback) {
    return lfr.dom.on(
      element,
      eventName,
      lfr.bind(lfr.dom.handleDelegateEvent_, null, selector, callback)
    );
  };

  /**
   * This is called when an event is triggered by a delegate listener (see
   * `lfr.dom.delegate` for more details).
   * @param {string} selector The selector that matches the child elements that
   *   the event should be triggered for.
   * @param {!function(!Object)} callback Function to be called when the event is
   *   triggered. It will receive the normalized event object.
   * @param {!Event} event The event payload.
   * @return {boolean} False if at least one of the triggered callbacks returns false,
   *   or true otherwise.
   */
  lfr.dom.handleDelegateEvent_ = function(selector, callback, event) {
    lfr.dom.normalizeDelegateEvent_(event);

    var currentElement = event.target;
    var returnValue = true;

    while (currentElement && !event.stopped) {
      if (lfr.dom.match(currentElement, selector)) {
        event.delegateTarget = currentElement;
        returnValue &= callback(event);
      }
      currentElement = currentElement.parentNode;
    }

    return returnValue;
  };

  /**
   * Check if an element matches a given selector.
   * @param {Element} element
   * @param {string} selector
   * @return {boolean}
   */
  lfr.dom.match = function(element, selector) {
    if (!element || element.nodeType !== 1) {
      return false;
    }

    var p = Element.prototype;
    var m = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector;
    if (m) {
      return m.call(element, selector);
    }

    return lfr.dom.matchFallback_(element, selector);
  };

  /**
   * Check if an element matches a given selector, using an internal implementation
   * instead of calling existing javascript functions.
   * @param {Element} element
   * @param {string} selector
   * @return {boolean}
   * @protected
   */
  lfr.dom.matchFallback_ = function(element, selector) {
    var nodes = document.querySelectorAll(selector, element.parentNode);
    for (var i = 0; i < nodes.length; ++i) {
      if (nodes[i] === element) {
        return true;
      }
    }
    return false;
  };

  /**
   * Normalizes the event payload for delegate listeners.
   * @param {!Event} event
   */
  lfr.dom.normalizeDelegateEvent_ = function(event) {
    event.stopPropagation = lfr.dom.stopPropagation_;
    event.stopImmediatePropagation = lfr.dom.stopImmediatePropagation_;
  };

  /**
   * Listens to the specified event on the given DOM element. This function normalizes
   * DOM event payloads and functions so they'll work the same way on all supported
   * browsers.
   * @param {!Element} element The DOM element to listen to the event on.
   * @param {string} eventName The name of the event to listen to.
   * @param {!function(!Object)} callback Function to be called when the event is
   *   triggered. It will receive the normalized event object.
   * @return {!lfr.DomEventHandle} Can be used to remove the listener.
   */
  lfr.dom.on = function(element, eventName, callback) {
    element.addEventListener(eventName, callback);
    return new lfr.DomEventHandle(element, eventName, callback);
  };

  /**
   * Removes all the child nodes on a DOM node.
   * @param {Element} node Element to remove children from.
   */
  lfr.dom.removeChildren = function(node) {
    var child;
    while ((child = node.firstChild)) {
      node.removeChild(child);
    }
  };

  /**
   * The function that replaces `stopImmediatePropagation_` for events.
   * @protected
   */
  lfr.dom.stopImmediatePropagation_ = function() {
    this.stopped = true;
    Event.prototype.stopImmediatePropagation.call(this);
  };

  /**
   * The function that replaces `stopPropagation` for events.
   * @protected
   */
  lfr.dom.stopPropagation_ = function() {
    this.stopped = true;
    Event.prototype.stopPropagation.call(this);
  };

  /**
   * Checks if the given element supports the given event type.
   * @param {!Element} element The DOM element to check.
   * @param {string} eventName The name of the event to check.
   * @return {boolean}
   */
  lfr.dom.supportsEvent = function(element, eventName) {
    return 'on' + eventName in element;
  };

  /**
   * Converts the given argument to a DOM element. Strings are assumed to
   * be selectors, and so a matched element will be returned. If the arg
   * is already a DOM element it will be the return value.
   * @param {string|Element} selectorOrElement
   * @return {Element} The converted element, or null if none was found.
   */
  lfr.dom.toElement = function(selectorOrElement) {
    if (lfr.isElement(selectorOrElement)) {
      return selectorOrElement;
    } else if (lfr.isString(selectorOrElement)) {
      return document.querySelector(selectorOrElement);
    } else {
      return null;
    }
  };

  /**
   * Triggers the specified event on the given element.
   * NOTE: This should mostly be used for testing, not on real code.
   * @param {!Element} element The node that should trigger the event.
   * @param {string} eventName The name of the event to be triggred.
   * @param {Object=} opt_eventObj An object with data that should be on the
   *   triggered event's payload.
   */
  lfr.dom.triggerEvent = function(element, eventName, opt_eventObj) {
    var eventObj = document.createEvent('HTMLEvents');
    eventObj.initEvent(eventName, true, true);
    lfr.object.mixin(eventObj, opt_eventObj);
    element.dispatchEvent(eventObj);
  };
}());

(function() {
  'use strict';

  /**
   * Attribute adds support for having object properties that can be watched for
   * changes, as well as configured with validators, setters and other options.
   * See the `addAttr` method for a complete list of available attribute
   * configuration options.
   * @constructor
   */
  lfr.Attribute = function(opt_config) {
    lfr.Attribute.base(this, 'constructor');
    this.attrsInfo_ = {};
    this.addAttrsFromStaticHint_(opt_config);
  };
  lfr.inherits(lfr.Attribute, lfr.EventEmitter);

  /**
   * Constants that represent the states that an attribute can be in.
   * @type {Object}
   */
  lfr.Attribute.States = {
    UNINITIALIZED: 0,
    INITIALIZING: 1,
    INITIALIZING_DEFAULT: 2,
    INITIALIZED: 3
  };

  /**
   * Object that contains information about all this instance's attributes.
   * @type {!Object<string, !Object>}
   * @protected
   */
  lfr.Attribute.prototype.attrsInfo_ = null;

  /**
   * Object with information about the batch event that is currently scheduled, or
   * null if none is.
   * @type {Object}
   * @protected
   */
  lfr.Attribute.prototype.scheduledBatchData_ = null;

  /**
   * Adds the given attribute.
   * @param {string} name The name of the new attribute.
   * @param {Object.<string, *>=} config The configuration object for the new attribute.
   *   This object can have the following keys:
   *   initOnly - Ignores writes to the attribute after it's been initialized. That is,
   *   allows writes only when adding the attribute for the first time.
   *   setter - Function for normalizing new attribute values. It receives the new value
   *   that was set, and returns the value that should be stored.
   *   validator - Function that validates new attribute values. When it returns false,
   *   the new value is ignored.
   *   value - The default value for this attribute. Note that setting this to an object
   *   will cause all attribute instances to use the same reference to the object. To
   *   have each attribute instance use a different reference, use the `valueFn` option
   *   instead.
   *   valueFn - A function that returns the default value for this attribute.
   * @param {*} initialValue The initial value of the new attribute. This value has higher
   *   precedence than the default value specified in this attribute's configuration.
   */
  lfr.Attribute.prototype.addAttr = function(name, config, initialValue) {
    this.assertValidAttrName_(name);

    this.attrsInfo_[name] = {
      config: config || {},
      initialValue: initialValue,
      state: lfr.Attribute.States.UNINITIALIZED
    };

    Object.defineProperty(this, name, {
      configurable: true,
      get: lfr.bind(this.getAttrValue_, this, name),
      set: lfr.bind(this.setAttrValue_, this, name)
    });
  };

  /**
   * Adds the given attributes.
   * @param {!Object.<string, !Object>} configs An object that maps the names of all the
   *   attributes to be added to their configuration objects.
   * @param {!Object.<string, *>} initialValues An object that maps the names of
   *   attributes to their initial values. These values have higher precedence than the
   *   default values specified in the attribute configurations.
   */
  lfr.Attribute.prototype.addAttrs = function(configs, initialValues) {
    initialValues = initialValues || {};
    var names = Object.keys(configs);

    for (var i = 0; i < names.length; i++) {
      this.addAttr(names[i], configs[names[i]], initialValues[names[i]]);
    }
  };

  /**
   * Adds attributes from super classes static hint `MyClass.ATTRS = {};`.
   * @param {!Object.<string, !Object>} configs An object that maps the names
   *     of all the attributes to be added to their configuration objects.
   * @protected
   */
  lfr.Attribute.prototype.addAttrsFromStaticHint_ = function(config) {
    lfr.mergeSuperClassesProperty(this.constructor, 'ATTRS', this.mergeAttrs_);
    this.addAttrs(this.constructor.ATTRS_MERGED, config);
  };

  /**
   * Checks that the given name is a valid attribute name. If it's not, an error
   * will be thrown.
   * @param {string} name The name to be validated.
   * @throws {Error}
   */
  lfr.Attribute.prototype.assertValidAttrName_ = function(name) {
    if (name === 'attrs') {
      throw new Error('It\'s not allowed to create an attribute with the name "attrs".');
    }
  };

  /**
   * Checks if the it's allowed to write on the requested attribute.
   * @param {string} name The name of the attribute.
   * @return {Boolean}
   * @protected
   */
  lfr.Attribute.prototype.canWrite_ = function(name) {
    this.initAttr_(name);

    var info = this.attrsInfo_[name];
    return !info.config.initOnly || info.state !== lfr.Attribute.States.INITIALIZED;
  };

  /**
   * Calls the requested function, running the appropriate code for when it's
   * passed as an actual function object or just the function's name.
   * @param {!Function|string} fn Function, or name of the function to run.
   * @param {...*} A variable number of optional parameters to be passed to the
   *   function that will be called.
   * @return {*} The return value of the called function.
   * @protected
   */
  lfr.Attribute.prototype.callFunction_ = function(fn) {
    var args = Array.prototype.slice.call(arguments, 1);

    if (lfr.isString(fn)) {
      return this[fn].apply(this, args);
    } else if (lfr.isFunction(fn)) {
      return fn.apply(this, args);
    }
  };

  /**
   * Calls the attribute's setter, if there is one.
   * @param {string} name The name of the attribute.
   * @param {*} value The value to be set.
   * @return {*} The final value to be set.
   */
  lfr.Attribute.prototype.callSetter_ = function(name, value) {
    var info = this.attrsInfo_[name];
    var config = info.config;
    if (config.setter) {
      value = this.callFunction_(config.setter, value);
    }
    return value;
  };

  /**
   * Calls the attribute's validator, if there is one.
   * @param {string} name The name of the attribute.
   * @param {*} value The value to be validated.
   * @return {Boolean} Flag indicating if value is valid or not.
   */
  lfr.Attribute.prototype.callValidator_ = function(name, value) {
    var info = this.attrsInfo_[name];
    var config = info.config;
    if (config.validator) {
      return this.callFunction_(config.validator, value);
    }
    return true;
  };

  /**
   * @inheritDoc
   */
  lfr.Attribute.prototype.disposeInternal = function() {
    this.attrsInfo_ = null;
    this.scheduledBatchData_ = null;
  };

  /**
   * Emits the attribute change batch event.
   * @protected
   */
  lfr.Attribute.prototype.emitBatchEvent_ = function() {
    var data = this.scheduledBatchData_;
    this.scheduledBatchData_ = null;
    this.emit('attrsChanged', data);
  };

  /**
   * Returns an object that maps all attribute names to their values.
   * @return {Object.<string, *>}
   */
  lfr.Attribute.prototype.getAttrs = function() {
    var attrsMap = {};
    var names = Object.keys(this.attrsInfo_);

    for (var i = 0; i < names.length; i++) {
      attrsMap[names[i]] = this[names[i]];
    }

    return attrsMap;
  };

  /**
   * Gets the value of the specified attribute. This is passed as that attribute's
   * getter to the `Object.defineProperty` call inside the `addAttr` method.
   * @param {string} name The name of the attribute.
   * @return {*}
   * @protected
   */
  lfr.Attribute.prototype.getAttrValue_ = function(name) {
    this.initAttr_(name);

    return this.attrsInfo_[name].value;
  };

  /**
   * Informs of changes to an attributes value through an event. Won't trigger
   * the event if the value hasn't changed or if it's being initialized.
   * @param {string} name The name of the attribute.
   * @param {*} prevVal The previous value of the attribute.
   * @protected
   */
  lfr.Attribute.prototype.informChange_ = function(name, prevVal) {
    if (this.shouldInformChange_(name, prevVal)) {
      var data = {
        attrName: name,
        newVal: this[name],
        prevVal: prevVal
      };
      this.emit(name + 'Changed', data);
      this.scheduleBatchEvent_(data);
    }
  };

  /**
   * Initializes the specified attribute, giving it a first value.
   * @param {string} name The name of the attribute.
   * @protected
   */
  lfr.Attribute.prototype.initAttr_ = function(name) {
    var info = this.attrsInfo_[name];
    if (info.state !== lfr.Attribute.States.UNINITIALIZED) {
      return;
    }

    info.state = lfr.Attribute.States.INITIALIZING;
    this.setInitialValue_(name);
    if (!info.written) {
      info.state = lfr.Attribute.States.INITIALIZING_DEFAULT;
      this.setDefaultValue_(name);
    }
    info.state = lfr.Attribute.States.INITIALIZED;
  };

  /**
   * Merges an array of values for the ATTRS property into a single object.
   * @param {!Array} values The values to be merged.
   * @return {!Object} The merged value.
   */
  lfr.Attribute.prototype.mergeAttrs_ = function(values) {
    return lfr.object.mixin.apply(null, [{}].concat(values.reverse()));
  };

  /**
   * Removes the requested attribute.
   * @param {string} name The name of the attribute.
   */
  lfr.Attribute.prototype.removeAttr = function(name) {
    this.attrsInfo_[name] = null;
    delete this[name];
  };

  /**
   * Schedules an attribute change batch event to be emitted asynchronously.
   * @param {!Object} attrChangeData Information about an attribute's update.
   * @protected
   */
  lfr.Attribute.prototype.scheduleBatchEvent_ = function(attrChangeData) {
    if (!this.scheduledBatchData_) {
      lfr.async.nextTick(this.emitBatchEvent_, this);
      this.scheduledBatchData_ = {
        changes: {}
      };
    }

    var name = attrChangeData.attrName;
    var changes = this.scheduledBatchData_.changes;
    if (changes[name]) {
      changes[name].newVal = attrChangeData.newVal;
    } else {
      changes[name] = attrChangeData;
    }
  };

  /**
   * Sets the value of all the specified attributes.
   * @param {!Object.<string,*>} values A map of attribute names to the values they
   *   should be set to.
   */
  lfr.Attribute.prototype.setAttrs = function(values) {
    var names = Object.keys(values);

    for (var i = 0; i < names.length; i++) {
      this[names[i]] = values[names[i]];
    }
  };

  /**
   * Sets the value of the specified attribute. This is passed as that attribute's
   * setter to the `Object.defineProperty` call inside the `addAttr` method.
   * @param {string} name The name of the attribute.
   * @param {*} value The new value of the attribute.
   * @protected
   */
  lfr.Attribute.prototype.setAttrValue_ = function(name, value) {
    if (!this.canWrite_(name) || !this.validateAttrValue_(name, value)) {
      return;
    }

    var info = this.attrsInfo_[name];
    var prevVal = this[name];
    info.value = this.callSetter_(name, value);
    info.written = true;
    this.informChange_(name, prevVal);
  };

  /**
   * Sets the default value of the requested attribute.
   * @param {string} name The name of the attribute.
   * @return {*}
   */
  lfr.Attribute.prototype.setDefaultValue_ = function(name) {
    var config = this.attrsInfo_[name].config;

    if (config.value) {
      this[name] = config.value;
    } else {
      this[name] = this.callFunction_(config.valueFn);
    }
  };

  /**
   * Sets the initial value of the requested attribute.
   * @param {string} name The name of the attribute.
   * @return {*}
   */
  lfr.Attribute.prototype.setInitialValue_ = function(name) {
    var info = this.attrsInfo_[name];
    if (info.initialValue !== undefined) {
      this[name] = info.initialValue;
      info.initialValue = undefined;
    }
  };

  /**
   * Checks if we should inform about an attributes update. Updates are ignored
   * during attribute initialization. Otherwise, updates to primitive values
   * are only informed when the new value is different from the previous
   * one. Updates to objects (which includes functions and arrays) are always
   * informed outside initialization though, since we can't be sure if all of
   * the internal data has stayed the same.
   * @param {string} name The name of the attribute.
   * @param {*} prevVal The previous value of the attribute.
   * @return {Boolean}
   */
  lfr.Attribute.prototype.shouldInformChange_ = function(name, prevVal) {
    var info = this.attrsInfo_[name];
    return (info.state === lfr.Attribute.States.INITIALIZED) &&
    (lfr.isObject(prevVal) || prevVal !== this[name]);
  };

  /**
   * Validates the attribute's value, which includes calling the validator defined
   * in the attribute's configuration object, if there is one.
   * @param {string} name The name of the attribute.
   * @param {*} value The value to be validated.
   * @return {Boolean} Flag indicating if value is valid or not.
   */
  lfr.Attribute.prototype.validateAttrValue_ = function(name, value) {
    var info = this.attrsInfo_[name];

    return info.state === lfr.Attribute.States.INITIALIZING_DEFAULT ||
      this.callValidator_(name, value);
  };
}());

(function() {
  'use strict';

  /**
   * Provides a convenient API for data transport.
   * @constructor
   * @param {string} uri
   * @extends {lfr.EventEmitter}
   */
  lfr.Transport = function(uri) {
    lfr.Transport.base(this, 'constructor');

    if (!lfr.isDef(uri)) {
      throw new Error('Transport uri not specified');
    }
    this.uri_ = uri;
    this.defaultConfig_ = lfr.mergeSuperClassesProperty(
      this.constructor,
      'INITIAL_DEFAULT_CONFIG',
      lfr.array.firstDefinedValue
    );

    this.on('close', lfr.bind(this.onCloseHandler_, this));
    this.on('open', lfr.bind(this.onOpenHandler_, this));
    this.on('opening', lfr.bind(this.onOpeningHandler_, this));
  };
  lfr.inherits(lfr.Transport, lfr.EventEmitter);

  /**
   * Holds the initial default config that should be used for this transport.
   * @type null
   * @const
   * @static
   */
  lfr.Transport.INITIAL_DEFAULT_CONFIG = null;

  /**
   * Holds the transport state values.
   * @type {Object}
   * @const
   * @static
   */
  lfr.Transport.State = {
    CLOSED: 'closed',
    OPEN: 'open',
    OPENING: 'opening'
  };

  /**
   * Map of all the main transport events.
   * @type {!Object}
   * @const
   * @static
   */
  lfr.Transport.TRANSPORT_EVENTS = {
    /**
     * Emits when the transport has closed.
     * @event close
     */
    close: true,

    /**
     * Emits when data is received from the connection.
     * @event data
     */
    data: true,

    /**
     * Emits when an error is received from the connection.
     * @event error
     */
    error: true,

    /**
     * Emits when the message event is sent.
     * @event message
     */
    message: true,

    /**
     * Emits when the transport has opened.
     * @event open
     */
    open: true,

    /**
     * Emits when the transport has started opening (when `open` is called).
     * @event opening
     */
    opening: true
  };

  /**
   * Holds the default configuration for this transport. Configuration options
   * passed for a request override these defaults.
   * @type {Object}
   * @default null
   * @protected
   */
  lfr.Transport.prototype.defaultConfig_ = null;

  /**
   * Holds the transport uri.
   * @type {string}
   * @default ''
   * @protected
   */
  lfr.Transport.prototype.uri_ = '';

  /**
   * Holds the transport state, it supports the available states: '',
   * 'opening', 'open' and 'closed'.
   * @type {string}
   * @default ''
   * @protected
   */
  lfr.Transport.prototype.state_ = '';

  /**
   * Closes the transport.
   * @chainable
   */
  lfr.Transport.prototype.close = lfr.abstractMethod;

  /**
   * Decodes a data chunk received.
   * @param {*=} data
   * @return {?}
   */
  lfr.Transport.prototype.decodeData = lfr.identityFunction;

  /**
   * Encodes a data chunk to be sent.
   * @param {*=} data
   * @return {?}
   */
  lfr.Transport.prototype.encodeData = lfr.identityFunction;

  /**
   * Gets this transport's default configuration.
   * @return {Object}
   */
  lfr.Transport.prototype.getDefaultConfig = function() {
    return this.defaultConfig_;
  };

  /**
   * @inheritDoc
   * @override
   */
  lfr.Transport.prototype.disposeInternal = function() {
    this.once('close', function() {
      lfr.Transport.base(this, 'disposeInternal');
    });
    this.close();
  };

  /**
   * Gets the transport uri.
   * @return {string}
   */
  lfr.Transport.prototype.getUri = function() {
    return this.uri_;
  };

  /**
   * Gets the transport state value.
   * @return {string}
   */
  lfr.Transport.prototype.getState = function() {
    return this.state_;
  };

  /**
   * Returns true if the transport is open.
   * @return {boolean}
   */
  lfr.Transport.prototype.isOpen = function() {
    switch (this.state_) {
      case lfr.Transport.State.OPENING:
      case lfr.Transport.State.OPEN:
        return true;
    }
    return false;
  };

  /**
   * Defaults handler for close event.
   * @protected
   */
  lfr.Transport.prototype.onCloseHandler_ = function() {
    this.state_ = lfr.Transport.State.CLOSED;
  };

  /**
   * Defaults handler for open event.
   * @protected
   */
  lfr.Transport.prototype.onOpenHandler_ = function() {
    this.state_ = lfr.Transport.State.OPEN;
  };

  /**
   * Defaults handler for opening event.
   * @protected
   */
  lfr.Transport.prototype.onOpeningHandler_ = function() {
    this.state_ = lfr.Transport.State.OPENING;
  };

  /**
   * Opens the transport.
   * @chainable
   */
  lfr.Transport.prototype.open = lfr.abstractMethod;

  /**
   * Sends message.
   * @param {*} message
   * @param {Object} opt_config Relevant if the transport needs information such as
   *   HTTP method, headers and parameters.
   * @param {function(*)} opt_success Function to be called when the request receives
   *   a success response.
   * @param {function(*)} opt_error Function to be called when the request receives
   *   an error response.
   */
  lfr.Transport.prototype.send = function(message, opt_config, opt_success, opt_error) {
    if (this.isOpen()) {
      this.write(message, lfr.object.mixin({}, this.defaultConfig_, opt_config), opt_success, opt_error);
    } else {
      throw new Error('Transport not open');
    }
  };

  /**
   * Sets this transport's default configuration.
   * @param {Object} defaultConfig
   */
  lfr.Transport.prototype.setDefaultConfig = function(defaultConfig) {
    this.defaultConfig_ = defaultConfig;
  };

  /**
   * Sets the transport state value.
   * @param {string} state
   */
  lfr.Transport.prototype.setState = function(state) {
    this.state_ = state;
  };

  /**
   * Writes data to the transport.
   * @param {*} message The data that will be sent through the transport.
   * @param {!Object} config Relevant if the transport needs information such as
   *   HTTP method, headers and parameters.
   * @param {function(*)} opt_success Function to be called when the request receives
   *   a success response.
   * @param {function(*)} opt_error Function to be called when the request receives
   *   an error response.
   * @chainable
   */
  lfr.Transport.prototype.write = lfr.abstractMethod;
}());

(function() {

  'use strict';

  /**
   * Provides XMLHttpRequest implementation for transport.
   * @constructor
   * @extends {lfr.Transport}
   */
  lfr.XhrTransport = function(uri) {
    lfr.XhrTransport.base(this, 'constructor', uri);

    this.sendInstances_ = [];
  };
  lfr.inherits(lfr.XhrTransport, lfr.Transport);

  /**
   * Holds the initial default config that should be used for this transport.
   * @type {Object}
   * @const
   * @static
   */
  lfr.XhrTransport.INITIAL_DEFAULT_CONFIG = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    method: 'POST',
    responseType: 'html'
  };

  /**
   * Holds all the valid values for the `responseType` configuration option.
   * @type {Object}
   * @const
   * @static
   */
  lfr.XhrTransport.ResponseTypes = {
    HTML: 'html',
    JSON: 'json'
  };

  /**
   * Holds the XMLHttpRequest sent objects.
   * @type {Array.<XMLHttpRequest>}
   * @default null
   * @protected
   */
  lfr.XhrTransport.prototype.sendInstances_ = null;

  /**
   * Makes a XMLHttpRequest instance already open.
   * @param {!Object} config
   * @param {function(!Object)} successFn
   * @param {function(!Object)} errorFn
   * @return {XMLHttpRequest}
   * @protected
   */
  lfr.XhrTransport.prototype.createXhr_ = function(config, successFn, errorFn) {
    var xhr = new XMLHttpRequest();
    xhr.onload = lfr.bind(this.onXhrLoad_, this, xhr, config, successFn);
    xhr.onerror = lfr.bind(this.onXhrError_, this, xhr, errorFn);
    this.openXhr_(xhr, config.method);
    this.setXhrHttpHeaders_(xhr, config.headers);

    return xhr;
  };

  /**
   * @inheritDoc
   */
  lfr.XhrTransport.prototype.close = function() {
    for (var i = 0; i < this.sendInstances_.length; i++) {
      this.sendInstances_[i].abort();
    }
    this.sendInstances_ = [];
    this.emitAsync_('close');
    return this;
  };

  /**
   * Encodes a data chunk to be sent.
   * @param {*} data
   * @param {!Object} config
   * @return {*}
   * @protected
   */
  lfr.XhrTransport.prototype.encodeData = function(data, config) {
    if (config.headers['Content-Type'] === 'application/json') {
      return JSON.stringify(data);
    } else {
      return data;
    }
  };

  /**
   * Decodes a data chunk received.
   * @param {*} data
   * @param {!Object} config
   * @return {*}
   * @override
   * @protected
   */
  lfr.XhrTransport.prototype.decodeData = function(data, config) {
    if (config.responseType === lfr.XhrTransport.ResponseTypes.JSON) {
      return JSON.parse(data);
    } else {
      return data;
    }
  };

  /**
   * TODO(eduardo): replace with lfr.nextTick when available.
   */
  lfr.XhrTransport.prototype.emitAsync_ = function(event, data) {
    var self = this;
    clearTimeout(this.timer_);
    this.timer_ = setTimeout(function() {
      self.emit(event, data);
    }, 0);
  };

  /**
   * Fired when an xhr's `error` event is triggered.
   * @param {!XMLHttpRequest} xhr The xhr request that triggered the event.
   * @param {function(!Object)} opt_error Function that will be called for this error.
   * @protected
   */
  lfr.XhrTransport.prototype.onXhrError_ = function(xhr, opt_error) {
    if (opt_error) {
      var errorResponse = {
        error: new Error('Transport request error')
      };
      errorResponse.error.xhr = xhr;
      opt_error(errorResponse);
    }
    lfr.array.remove(this.sendInstances_, xhr);
  };

  /**
   * Fired when an xhr's `load` event is triggered.
   * @param {!XMLHttpRequest} xhr The xhr request that triggered the event.
   * @param {!Object} config
   * @param {function(!Object)} opt_success Function that will be called if the
   *   request is successful.
   * @protected
   */
  lfr.XhrTransport.prototype.onXhrLoad_ = function(xhr, config, opt_success) {
    if (xhr.status === 200) {
      if (opt_success) {
        opt_success(this.decodeData(xhr.responseText, config));
      }
      lfr.array.remove(this.sendInstances_, xhr);
    } else {
      xhr.onerror();
    }
  };

  /**
   * @inheritDoc
   */
  lfr.XhrTransport.prototype.open = function() {
    if (this.isOpen()) {
      console.warn('Transport is already open');
      return;
    }
    this.emit('opening');
    this.emitAsync_('open');
    return this;
  };

  /**
   * Opens the given xhr request.
   * @param {!XMLHttpRequest} xhr The xhr request to open.
   * @param {string} method Optional method to override the default.
   * @protected
   */
  lfr.XhrTransport.prototype.openXhr_ = function(xhr, method) {
    xhr.open(method, this.getUri(), true);
  };

  /**
   * Sets the http headers of the given xhr request.
   * @param {!XMLHttpRequest} xhr The xhr request to set the headers for.
   * @param {!Object} headers Optional headers to override the default.
   * @protected
   */
  lfr.XhrTransport.prototype.setXhrHttpHeaders_ = function(xhr, headers) {
    for (var i in headers) {
      xhr.setRequestHeader(i, headers[i]);
    }
  };

  /**
   * @inheritDoc
   */
  lfr.XhrTransport.prototype.write = function(message, config, opt_success, opt_error) {
    var xhr = this.createXhr_(config, opt_success, opt_error);
    this.sendInstances_.push(xhr);

    message = this.encodeData(message, config);
    this.emitAsync_('message', message);
    xhr.send(message);
  };

}());

(function() {
  'use strict';

  /**
   * Provides implementation of transport-based cross-browser/cross-device
   * bi-directional communication layer for Socket.IO.
   * @constructor
   * @extends {lfr.Transport}
   */
  lfr.WebSocketTransport = function(uri) {
    lfr.WebSocketTransport.base(this, 'constructor', uri);
    this.socketEvents_ = [];
  };
  lfr.inherits(lfr.WebSocketTransport, lfr.Transport);

  /**
   * Holds the initial default config that should be used for this transport.
   * @type {Object}
   * @const
   * @static
   */
  lfr.WebSocketTransport.INITIAL_DEFAULT_CONFIG = {
    method: 'POST'
  };

  /**
   * EventEmitterProxy instance that proxies events from the socket to this
   * transport.
   * @type {EventEmitterProxy}
   * @default null
   * @protected
   */
  lfr.WebSocketTransport.prototype.eventEmitterProxy_ = null;

  /**
   * If the requests should be RESTful or not. RESTful requests are always sent as
   * JSON data, with the method as one of the params, and the original data to be
   * sent accessible through the `data` key.
   * @type {boolean}
   * @default false
   * @protected
   */
  lfr.WebSocketTransport.prototype.restful_ = false;

  /**
   * Holds the underlying socket mechanism. Default mechanism uses Socket.IO.
   * @type {Socket.IO}
   * @default null
   */
  lfr.WebSocketTransport.prototype.socket = null;

  /**
   * Holds information about the events that are being listened in the socket.
   * This is necessary for removing these listeners when the transport is
   * disposed.
   * @type {Array<Object>}
   * @default null
   */
  lfr.WebSocketTransport.prototype.socketEvents_ = null;

  /**
   * Listens to the specified event on the socket. This action should always be done
   * through this method, since it will appropriately hold the necessary information
   * so the listener can be removed when the transport is disposed.
   * @param {!Socket.IO} socket
   * @param {string} event
   * @param {!function} listener
   * @protected
   */
  lfr.WebSocketTransport.prototype.addSocketListener_ = function(socket, event, listener) {
    this.socketEvents_.push({
      event: event,
      listener: listener
    });
    socket.on(event, listener);
  };

  /**
   * @inheritDoc
   */
  lfr.WebSocketTransport.prototype.close = function() {
    if (this.socket) {
      this.socket.close();
    }
    return this;
  };

  /**
   * Makes a Socket.IO instance.
   * @return {Socket.IO}
   * @protected
   */
  lfr.WebSocketTransport.prototype.createSocket_ = function() {
    this.verifySocketIOExists_();

    var socket = io(this.getUri());
    this.addSocketListener_(socket, 'connect', lfr.bind(this.onSocketConnect_, this));
    this.addSocketListener_(socket, 'disconnect', lfr.bind(this.onSocketDisconnect_, this));
    this.addSocketListener_(socket, 'error', lfr.bind(this.onSocketError_, this));
    this.addSocketListener_(socket, 'data', lfr.bind(this.onSocketData_, this));
    this.addSocketListener_(socket, 'message', lfr.bind(this.onSocketMessage_, this));
    return socket;
  };

  /**
   * @inheritDoc
   */
  lfr.WebSocketTransport.prototype.disposeInternal = function() {
    this.once('close', function() {
      this.eventEmitterProxy_.dispose();
      this.eventEmitterProxy_ = null;

      this.removeSocketListeners_();
      this.socket = null;
    });
    lfr.WebSocketTransport.base(this, 'disposeInternal');
  };

  /**
   * Event handle for socket connect event. Fires transport open event.
   * @param {?Object} event
   * @protected
   */
  lfr.WebSocketTransport.prototype.onSocketConnect_ = function() {
    this.emit('open');
  };

  /**
   * Event handle for socket data event. Fires transport data event.
   * @param {*} data
   * @protected
   */
  lfr.WebSocketTransport.prototype.onSocketData_ = function(data) {
    this.emit('data', this.decodeData(data));
  };

  /**
   * Event handle for socket disconnect event. Fires transport close event.
   * @protected
   */
  lfr.WebSocketTransport.prototype.onSocketDisconnect_ = function() {
    this.emit('close');
  };

  /**
   * Event handle for socket error event. Fires transport error event.
   * @param {Object} event
   * @protected
   */
  lfr.WebSocketTransport.prototype.onSocketError_ = function(event) {
    var error = new Error('Transport request error');
    error.socket = this.socket;
    error.message = event;
    this.emit('error', {
      error: error
    });
  };

  /**
   * Event handle for socket message event. Fires transport message event.
   * @protected
   */
  lfr.WebSocketTransport.prototype.onSocketMessage_ = function(message) {
    this.emit('message', message);
  };

  /**
   * @inheritDoc
   */
  lfr.WebSocketTransport.prototype.open = function() {
    if (this.isOpen()) {
      console.warn('Transport is already open');
      return;
    }

    this.emit('opening');

    if (!this.socket) {
      this.socket = this.createSocket_();
      this.eventEmitterProxy_ = new lfr.EventEmitterProxy(this.socket, this, lfr.Transport.TRANSPORT_EVENTS);
    }

    this.socket.open();

    return this;
  };

  /**
   * Removes all listeners that were attached to the socket by this transport.
   * @protected
   */
  lfr.WebSocketTransport.prototype.removeSocketListeners_ = function() {
    for (var i = 0; i < this.socketEvents_.length; i++) {
      this.socket.removeListener(
        this.socketEvents_[i].event,
        this.socketEvents_[i].listener
      );
    }
  };

  /**
   * Sets this transport to be RESTful or not.
   * @param {boolean} restful
   */
  lfr.WebSocketTransport.prototype.setRestful = function(restful) {
    this.restful_ = restful;
  };

  /**
   * Verifies that the `io` global function exists, throwing an error otherwise.
   * @throws {Error}
   * @protected
   */
  lfr.WebSocketTransport.prototype.verifySocketIOExists_ = function() {
    /*global io*/
    if (!io) {
      throw new Error('Socket.IO client not found');
    }
  };

  /**
   * @inheritDoc
   */
  lfr.WebSocketTransport.prototype.write = function(message, config, opt_success) {
    if (this.restful_) {
      message = {
        data: message,
        method: config.method
      };
    }

    var self = this;
    this.socket.send(message, function(response) {
      if (opt_success) {
        opt_success(self.decodeData(response));
      }
    });
  };

}());

(function() {
  'use strict';

  /**
   * API for WebChannel messaging. Supports HTTP verbs for point-to-point
   * socket-like communication between a browser client and a remote origin.
   * @constructor
   * @param {!lfr.Transport} opt_transport Optional transport. If not
   *   specified defaults to <code>lfr.WebSocketTransport(location.origin +
   *   location.pathname)</code>.
   * @extends {lfr.EventEmitter}
   */
  lfr.WebChannel = function(opt_transport) {
    lfr.WebChannel.base(this, 'constructor');

    if (!opt_transport) {
      if (!window.location) {
        throw new Error('WebChannel cannot resolve transport uri');
      }
      opt_transport = new lfr.WebSocketTransport(window.location.origin + window.location.pathname);
    }

    this.pendingRequests_ = [];
    this.setTransport_(opt_transport);
  };
  lfr.inherits(lfr.WebChannel, lfr.EventEmitter);

  /**
   * Holds http verbs.
   * @type {Object}
   * @const
   * @static
   */
  lfr.WebChannel.HttpVerbs = {
    DELETE: 'DELETE',
    GET: 'GET',
    HEAD: 'HEAD',
    PATCH: 'PATCH',
    POST: 'POST',
    PUT: 'PUT'
  };

  /**
   * Holds status of a request message.
   * @type {Object}
   * @const
   * @static
   */
  lfr.WebChannel.MessageStatus = {
    PENDING: 0,
    SENT: 1
  };

  /**
   * EventEmitterProxy instance that proxies events from the transport to this
   * web channel.
   * @type {EventEmitterProxy}
   * @default null
   * @protected
   */
  lfr.WebChannel.prototype.eventEmitterProxy_ = null;

  /**
   * Holds pending requests.
   * @type {Array}
   * @default null
   * @protected
   */
  lfr.WebChannel.prototype.pendingRequests_ = null;

  /**
   * Timeout for performed database action in milliseconds.
   * @type {number}
   * @default 30000
   * @protected
   */
  lfr.WebChannel.prototype.timeoutMs_ = 30000;

  /**
   * Holds the transport.
   * @type {lfr.Transport}
   * @default null
   * @protected
   */
  lfr.WebChannel.prototype.transport_ = null;

  /**
   * Dispatches web channel transport action with timeout support.
   * @param {!Function} handler
   * @param {!*} data Message object to the message.
   * @param {Object=} opt_config Optional configuration object with metadata
   *   about delete operation.
   * @return {Promise}
   */
  lfr.WebChannel.prototype.createDeferredRequest_ = function(method, data, opt_config) {
    var self = this;

    var config = opt_config ? opt_config : {};
    var request;

    var def = new lfr.Promise(function(resolve, reject) {
      config.method = method;

      request = {
        config: config,
        message: data,
        reject: reject,
        resolve: resolve,
        status: lfr.WebChannel.MessageStatus.PENDING
      };

      self.pendingRequests_.push(request);
      self.processPendingRequests_();
    });

    // Removes itself from pending requests when it's done.
    def.thenAlways(function() {
      lfr.array.remove(self.pendingRequests_, request);
    });

    this.startRequestTimer_(def);

    return def;
  };

  /**
   * Sends message with DELETE http verb.
   * @param {*=} message The value which will be used to send as request data.
   * @param {Object=} opt_config Optional message payload.
   * @return {Promise}
   */
  lfr.WebChannel.prototype.delete = function(message, opt_config) {
    return this.createDeferredRequest_(lfr.WebChannel.HttpVerbs.DELETE, message, opt_config);
  };

  /**
   * @inheritDoc
   */
  lfr.WebChannel.prototype.disposeInternal = function() {
    var self = this;
    this.transport_.once('close', function() {
      self.transport_ = null;

      self.eventEmitterProxy_.dispose();
      self.eventEmitterProxy_ = null;

      lfr.WebChannel.base(self, 'disposeInternal');
    });
    this.transport_.dispose();
  };

  /**
   * Sends message with GET http verb.
   * @param {*=} message The value which will be used to send as request data.
   * @param {Object=} opt_config Optional message payload.
   * @return {Promise}
   */
  lfr.WebChannel.prototype.get = function(message, opt_config) {
    return this.createDeferredRequest_(lfr.WebChannel.HttpVerbs.GET, message, opt_config);
  };

  /**
   * Gets timeout in milliseconds.
   * @return {number}
   */
  lfr.WebChannel.prototype.getTimeoutMs = function() {
    return this.timeoutMs_;
  };

  /**
   * Gets the transport used to send messages to the server.
   * @return {lfr.Transport} The transport used to send messages to the
   *   server.
   */
  lfr.WebChannel.prototype.getTransport = function() {
    return this.transport_;
  };

  /**
   * Sends message with HEAD http verb.
   * @param {*=} message The value which will be used to send as request data.
   * @param {Object=} opt_config Optional message payload.
   * @return {Promise}
   */
  lfr.WebChannel.prototype.head = function(message, opt_config) {
    return this.createDeferredRequest_(lfr.WebChannel.HttpVerbs.HEAD, message, opt_config);
  };

  /**
   * Event listener to transport `close` event.
   * @protected
   */
  lfr.WebChannel.prototype.onTransportClose_ = function() {
    for (var i = 0; i < this.pendingRequests_.length; ++i) {
      this.pendingRequests_[i].status = lfr.WebChannel.MessageStatus.PENDING;
    }
  };

  /**
   * Event listener to transport `error` event.
   * @protected
   */
  lfr.WebChannel.prototype.onTransportError_ = function() {
    for (var i = 0; i < this.pendingRequests_.length; ++i) {
      this.pendingRequests_[i].reject(new lfr.Promise.CancellationError('Transport error'));
    }
  };

  /**
   * Event listener to transport `open` event.
   * @protected
   */
  lfr.WebChannel.prototype.onTransportOpen_ = function() {
    this.processPendingRequests_();
  };

  /**
   * Sends message with PATCH http verb.
   * @param {*=} message The value which will be used to send as request data.
   * @param {Object=} opt_config Optional message payload.
   * @return {Promise}
   */
  lfr.WebChannel.prototype.patch = function(message, opt_config) {
    return this.createDeferredRequest_(lfr.WebChannel.HttpVerbs.PATCH, message, opt_config);
  };

  /**
   * Sends message with POST http verb.
   * @param {*=} message The value which will be used to send as request data.
   * @param {Object=} opt_config Optional message payload.
   * @return {Promise}
   */
  lfr.WebChannel.prototype.post = function(message, opt_config) {
    return this.createDeferredRequest_(lfr.WebChannel.HttpVerbs.POST, message, opt_config);
  };

  /**
   * Processes pending requests.
   * @protected
   */
  lfr.WebChannel.prototype.processPendingRequests_ = function() {
    for (var i = 0; i < this.pendingRequests_.length; ++i) {
      var pendingRequest = this.pendingRequests_[i];
      if (pendingRequest.status === lfr.WebChannel.MessageStatus.PENDING) {
        pendingRequest.status = lfr.WebChannel.MessageStatus.SENT;
        this.transport_.send(
          pendingRequest.message,
          pendingRequest.config,
          pendingRequest.resolve,
          pendingRequest.reject
        );
      }
    }
  };

  /**
   * Sends message with PUT http verb.
   * @param {*=} message The value which will be used to send as request data.
   * @param {Object=} opt_config Optional message payload.
   * @return {Promise}
   */
  lfr.WebChannel.prototype.put = function(message, opt_config) {
    return this.createDeferredRequest_(lfr.WebChannel.HttpVerbs.PUT, message, opt_config);
  };

  /**
   * Sets timeout in milliseconds.
   * @param {number} timeoutMs
   */
  lfr.WebChannel.prototype.setTimeoutMs = function(timeoutMs) {
    this.timeoutMs_ = timeoutMs;
  };

  /**
   * Sets the transport used to send pending requests to the server.
   * @param {lfr.Transport} transport
   * @protected
   */
  lfr.WebChannel.prototype.setTransport_ = function(transport) {
    this.eventEmitterProxy_ = new lfr.EventEmitterProxy(transport, this);

    this.transport_ = transport;
    this.transport_.on('close', lfr.bind(this.onTransportClose_, this));
    this.transport_.on('error', lfr.bind(this.onTransportError_, this));
    this.transport_.on('open', lfr.bind(this.onTransportOpen_, this));
    this.transport_.open();
  };

  /**
   * Starts the timer for the given request's timeout.
   * @param {!Promise} requestPromise The promise object for the request.
   */
  lfr.WebChannel.prototype.startRequestTimer_ = function(requestPromise) {
    var timer = setTimeout(function() {
      requestPromise.cancel(new lfr.Promise.CancellationError('Timeout'));
    }, this.getTimeoutMs());

    requestPromise.thenAlways(function() {
      clearTimeout(timer);
    });
  };

}());

(function() {
  'use strict';

  /**
   * Component collects common behaviors to be followed by UI components, such
   * as Lifecycle, bounding box element creation, CSS classes management,
   * events encapsulation and surfaces support. Surfaces are an area of the
   * component that can have information rendered into it. A component
   * manages multiple surfaces. Surfaces are only rendered when its content is
   * modified, representing render performance gains. For each surface, render
   * attributes could be associated, when the render context of a surface gets
   * modified the component Lifecycle re-paints the modified surface
   * automatically.
   *
   * Example:
   *
   * <code>
   * function CustomComponent(opt_config) {
   *   CustomComponent.base(this, 'constructor', opt_config);
   * }
   * lfr.inherits(CustomComponent, lfr.Component);
   *
   * CustomComponent.ATTRS = {
   *   title: { value: 'Title' },
   *   fontSize: { value: '10px' }
   * };
   *
   * CustomComponent.SURFACES = {
   *   header: { renderAttrs: ['title', 'fontSize'] },
   *   bottom: { renderAttrs: ['fontSize'] }
   * };
   *
   * CustomComponent.prototype.created = function() {};
   * CustomComponent.prototype.decorateInternal = function() {};
   * CustomComponent.prototype.renderInternal = function() {
   *   this.element.appendChild(this.getSurfaceElement('header'));
   *   this.element.appendChild(this.getSurfaceElement('bottom'));
   * };
   * CustomComponent.prototype.getSurfaceContent = function() {};
   * CustomComponent.prototype.attached = function() {};
   * CustomComponent.prototype.detached = function() {};
   * </code>
   *
   * @param {!Object} opt_config An object with the initial values for this component's
   *   attributes.
   * @constructor
   */
  lfr.Component = function(opt_config) {
    lfr.Component.base(this, 'constructor', opt_config);
    lfr.mergeSuperClassesProperty(this.constructor, 'ATTRS_SYNC', this.mergeAttrsSync_);
    lfr.mergeSuperClassesProperty(this.constructor, 'ELEMENT_CLASSES', this.mergeElementClasses_);
    lfr.mergeSuperClassesProperty(this.constructor, 'ELEMENT_TAG_NAME', lfr.array.firstDefinedValue);
    lfr.mergeSuperClassesProperty(this.constructor, 'SURFACE_TAG_NAME', lfr.array.firstDefinedValue);

    this.elementEventProxy_ = new lfr.EventEmitterProxy(this.element, this);
    this.delegateEventHandler_ = new lfr.EventHandler();

    this.addSurfacesFromStaticHint_();
    this.created_();
  };
  lfr.inherits(lfr.Component, lfr.Attribute);

  /**
   * Component attributes definition.
   * @type {Object}
   * @static
   */
  lfr.Component.ATTRS = {
    /**
     * Component element bounding box.
     * @type {Element}
     * @initOnly
     */
    element: {
      initOnly: true,
      setter: 'setterElementFn_',
      validator: 'validatorElementFn_',
      valueFn: 'valueElementFn_'
    },

    /**
     * CSS classes to be applied to the element.
     * @type {Array.<string>}
     */
    elementClasses: {
      validator: 'validatorElementClassesFn_'
    },

    /**
     * Component element id. If not specified will be generated.
     * @type {string}
     * @initOnly
     */
    id: {
      initOnly: true,
      validator: 'validatorIdFn_',
      valueFn: 'valueIdFn_'
    }
  };

  /**
   * Defines component attributes that automatically invokes synchronization
   * logic when the component render or the attribute value change. For
   * instance, if attribute `foo` gets modified, the synchronization method
   * `syncFoo(newVal, prevVal)` is called. Synchronization methods are bound
   * to `attrsChanged` batch event, therefore they wait for all possible
   * attributes mutations to happen, and consecutively fire once for the last
   * attribute state.
   * @type {Array}
   * @static
   */
  lfr.Component.ATTRS_SYNC = ['elementClasses'];

  /**
   * CSS classes to be applied to the element.
   * @type {Array.<string>}
   * @protected
   * @static
   */
  lfr.Component.ELEMENT_CLASSES = ['component'];

  /**
   * Element tag name is a string that specifies the type of element to be
   * created. The nodeName of the created element is initialized with the
   * value of tag name.
   * @type {string}
   * @default div
   * @protected
   * @static
   */
  lfr.Component.ELEMENT_TAG_NAME = 'div';

  /**
   * Surface tag name is a string that specifies the type of element to be
   * created for the surfaces. The nodeName of the created element is
   * initialized with the value of tag name.
   * @type {string}
   * @default div
   * @protected
   * @static
   */
  lfr.Component.SURFACE_TAG_NAME = 'div';

  /**
   * Cache states for the component.
   * @enum {string}
   */
  lfr.Component.Cache = {
    /**
     * Cache is not allowed for this state.
     */
    NOT_CACHEABLE: -1,

    /**
     * Cache not initialized.
     */
    NOT_INITIALIZED: -2
  };

  /**
   * Errors thrown by the component.
   * @enum {string}
   */
  lfr.Component.Error = {
    /**
     * Error when the component is already rendered and another render attempt
     * is made.
     */
    ALREADY_RENDERED: 'Component already rendered'
  };

  /**
   * Holds events that were listened through the `delegate` Component function.
   * @type {lfr.EventHandler}
   */
  lfr.Component.prototype.delegateEventHandler_ = null;

  /**
   * Instance of `lfr.EventEmitterProxy` which proxies events from the component's
   * element to the component itself.
   * @type {lfr.EventEmitterProxy}
   */
  lfr.Component.prototype.elementEventProxy_ = null;

  /**
   * Whether the element is in document.
   * @type {Boolean}
   */
  lfr.Component.prototype.inDocument = false;

  /**
   * Maps that index the surfaces instances by the surface id.
   * @type {Object}
   * @default null
   * @protected
   */
  lfr.Component.prototype.surfaces_ = null;

  /**
   * Registers a surface to the component. Surface elements are not
   * automatically appended to the component element.
   * @param {string} surfaceId The surface id to be registered.
   * @param {Object=} opt_config Optional surface configuration.
   * @chainable
   */
  lfr.Component.prototype.addSurface = function(surfaceId, opt_config) {
    this.surfaces_[surfaceId] = opt_config || {
      cacheState: lfr.Component.Cache.NOT_INITIALIZED
    };
    this.cacheSurfaceRenderAttrs_(surfaceId);
    return this;
  };

  /**
   * Registers surfaces to the component. Surface elements are not
   * automatically appended to the component element.
   * @param {!Object.<string, Object=>} configs An object that maps the names
   *     of all the surfaces to be added to their configuration objects.
   * @chainable
   */
  lfr.Component.prototype.addSurfaces = function(configs) {
    for (var surfaceId in configs) {
      this.addSurface(surfaceId, configs[surfaceId]);
    }
    return this;
  };

  /**
   * Adds surfaces from super classes static hint.
   * @protected
   */
  lfr.Component.prototype.addSurfacesFromStaticHint_ = function() {
    lfr.mergeSuperClassesProperty(this.constructor, 'SURFACES', this.mergeSurfaces_);
    this.surfaces_ = {};
    this.surfacesRenderAttrs_ = {};
    this.addSurfaces(this.constructor.SURFACES_MERGED);
  };

  /**
   * Invokes the attached Lifecycle. When attached, the component element is
   * appended to the DOM and any other action to be performed must be
   * implemented in this method, such as, binding DOM events. A component can
   * be re-attached multiple times.
   * @param {(string|Element)=} opt_parentElement Optional parent element
   *     to render the component.
   * @param {(string|Element)=} opt_siblingElement Optional sibling element
   *     to render the component before it. Relevant when the component needs
   *     to be rendered before an existing element in the DOM, e.g.
   *     `component.render(null, existingElement)`.
   * @protected
   * @chainable
   */
  lfr.Component.prototype.attach = function(opt_parentElement, opt_siblingElement) {
    this.renderElement_(opt_parentElement, opt_siblingElement);
    this.inDocument = true;
    this.attached();
    return this;
  };

  /**
   * Lifecycle. When attached, the component element is appended to the DOM
   * and any other action to be performed must be implemented in this method,
   * such as, binding DOM events. A component can be re-attached multiple
   * times, therefore the undo behavior for any action performed in this phase
   * must be implemented on the detach phase.
   */
  lfr.Component.prototype.attached = lfr.nullFunction;

  /**
   * Caches surface render attributes into a O(k) flat map representation.
   * Relevant for performance to calculate the surfaces group that were
   * modified by attributes mutation.
   * @param {string} surfaceId The surface id to be cached into the flat map.
   * @protected
   */
  lfr.Component.prototype.cacheSurfaceRenderAttrs_ = function(surfaceId) {
    var attrs = this.getSurface(surfaceId).renderAttrs;
    for (var i in attrs) {
      this.surfacesRenderAttrs_[attrs[i]] = this.surfacesRenderAttrs_[attrs[i]] || {};
      this.surfacesRenderAttrs_[attrs[i]][surfaceId] = true;
    }
  };

  /**
   * Clears the surfaces content cache.
   * @protected
   */
  lfr.Component.prototype.clearSurfacesCache_ = function() {
    for (var surfaceId in this.surfaces_) {
      this.getSurface(surfaceId).cacheState = lfr.Component.Cache.NOT_INITIALIZED;
    }
  };

  /**
   * Computes the cache state for the surface content. If value is string, the
   * cache state is represented by its hashcode.
   * @param {Object} value The value to calculate the cache state.
   * @return {Object} The computed cache state.
   * @protected
   */
  lfr.Component.prototype.computeSurfaceCacheState_ = function(value) {
    if (lfr.isString(value)) {
      return lfr.string.hashCode(value);
    }
    return lfr.Component.Cache.NOT_CACHEABLE;
  };

  /**
   * Computes the cache state for the surface content based on the decorated
   * DOM element. The innerHTML of the surface element is read and compressed
   * in order to minimize mismatches caused by breaking spaces or HTML
   * formatting differences that does not affect the content structure.
   * @protected
   */
  lfr.Component.prototype.computeSurfacesCacheStateFromDom_ = function() {
    for (var surfaceId in this.surfaces_) {
      var surface = this.getSurface(surfaceId);
      surface.cacheState = this.computeSurfaceCacheState_(lfr.html.compress(this.getSurfaceElement(surfaceId).innerHTML));
    }
  };

  /**
   * Creates the surface element with its id namespaced to the component id.
   * @param {string} surfaceElementId The id of the element for the surface to be
   *   created.
   * @return {Element} The surface element.
   * @protected
   */
  lfr.Component.prototype.createSurfaceElement_ = function(surfaceElementId) {
    var el = document.createElement(this.constructor.SURFACE_TAG_NAME_MERGED);
    el.id = surfaceElementId;
    return el;
  };

  /**
   * Listens to a delegate event on the component's element.
   * @param {string} eventName The name of the event to listen to.
   * @param {string} selector The selector that matches the child elements that
   *   the event should be triggered for.
   * @param {!function(!Object)} callback Function to be called when the event is
   *   triggered. It will receive the normalized event object.
   * @return {!lfr.DomEventHandle} Can be used to remove the listener.
   */
  lfr.Component.prototype.delegate = function(eventName, selector, callback) {
    var handle = lfr.dom.delegate(this.element, eventName, selector, callback);
    this.delegateEventHandler_.add(handle);
    return handle;
  };

  /**
   * Invokes the detached Lifecycle. When detached, the component element is
   * removed from the DOM and any other action to be performed must be
   * implemented in this method, such as, unbinding DOM events. A component
   * can be detached multiple times.
   * @chainable
   */
  lfr.Component.prototype.detach = function() {
    this.element.parentNode.removeChild(this.element);
    this.inDocument = false;
    this.detached();
    return this;
  };

  /**
   * Lifecycle. When detached, the component element is removed from the DOM
   * and any other action to be performed must be implemented in this method,
   * such as, unbinding DOM events. A component can be detached multiple
   * times, therefore the undo behavior for any action performed in this phase
   * must be implemented on the attach phase.
   */
  lfr.Component.prototype.detached = lfr.nullFunction;

  /**
   * Lifecycle. Creation phase of the component happens once after the
   * component is instantiated, therefore its the initial phase of the
   * component Lifecycle. Be conscious about actions performed in this phase
   * to not compromise instantiation time with operations that can be
   * postponed to further phases. It's recommended to bind component custom
   * events in this phase, in contrast to DOM events that must be bind on
   * attach phase.
   */
  lfr.Component.prototype.created = lfr.nullFunction;

  /**
   * Internal implementation for the creation phase of the component.
   * @protected
   */
  lfr.Component.prototype.created_ = function() {
    this.on('attrsChanged', this.handleAttributesChanges_);
    this.created();
  };

  /**
   * Lifecycle. Creates the component using existing DOM elements. Often the
   * component can be created using existing elements in the DOM to leverage
   * progressive enhancement. Any extra operation necessary to prepare the
   * component DOM must be implemented in this phase. Decorate phase replaces
   * render phase.
   *
   * Decoration Lifecycle:
   *   decorate - Decorate is manually called.
   *   decorateInternal - Internal implementation for decoration happens.
   *   render surfaces - All surfaces content are rendered.
   *   attribute synchronization - All synchronization methods are called.
   *   attach - Attach Lifecycle is called.
   * @chainable
   */
  lfr.Component.prototype.decorate = function() {
    if (this.inDocument) {
      throw new Error(lfr.Component.Error.ALREADY_RENDERED);
    }

    this.decorateInternal();
    this.computeSurfacesCacheStateFromDom_(); // TODO(edu): This optimization seems worth it, analyze it.
    this.renderSurfacesContent_(this.surfaces_); // TODO(edu): Sync surfaces on decorate?

    this.fireAttrsChanges_(this.constructor.ATTRS_SYNC_MERGED);

    this.attach();
    return this;
  };

  /**
   * Lifecycle. Internal implementation for decoration. Any extra operation
   * necessary to prepare the component DOM must be implemented in this phase.
   */
  lfr.Component.prototype.decorateInternal = lfr.nullFunction;

  /**
   * @inheritDoc
   */
  lfr.Component.prototype.disposeInternal = function() {
    this.detach();

    this.elementEventProxy_.dispose();
    this.elementEventProxy_ = null;

    this.delegateEventHandler_.removeAllListeners();
    this.delegateEventHandler_ = null;

    this.surfaces_ = null;
    this.surfacesRenderAttrs_ = null;
    lfr.Component.base(this, 'disposeInternal');
  };

  /**
   * Fires attributes synchronization changes for attributes registered on
   * `ATTRS_SYNC` static hint.
   * @param {Object.<string, Object>} changes Object containing the attribute
   *     name as key and an object with newVal and prevVal as value.
   * @protected
   */
  lfr.Component.prototype.fireAttrsChanges_ = function(changes) {
    for (var attr in changes) {
      if (attr in this.constructor.ATTRS_SYNC_MERGED) {
        this.fireAttrChange_(attr, changes[attr]);
      }
    }
  };

  /**
   * Fires attribute synchronization change for the attribute.
   * @param {Object.<string, Object>} change Object containing newVal and
   *     prevVal keys.
   * @protected
   */
  lfr.Component.prototype.fireAttrChange_ = function(attr, opt_change) {
    var fn = this['sync' + attr.charAt(0).toUpperCase() + attr.slice(1)];
    if (lfr.isFunction(fn)) {
      if (!opt_change) {
        opt_change = {
          newVal: this[attr],
          prevVal: undefined
        };
      }
      fn.call(this, opt_change.newVal, opt_change.prevVal);
    }
  };

  /**
   * Gets surfaces that got modified by the specified attributes changes.
   * @param {Object.<string, Object>} changes Object containing the attribute
   *     name as key and an object with newVal and prevVal as value.
   * @return {Object.<string, boolean>} Object containing modified surface ids
   *     as key and true as value.
   */
  lfr.Component.prototype.getModifiedSurfacesFromChanges_ = function(changes) {
    var surfaces = [];
    for (var attr in changes) {
      surfaces.push(this.surfacesRenderAttrs_[attr]);
    }
    return lfr.object.mixin.apply(null, surfaces);
  };

  /**
   * Gets surface configuration object. If surface is not registered returns
   * null.
   * @param {string} surfaceId The surface id.
   * @return {?Object} The surface configuration object.
   */
  lfr.Component.prototype.getSurface = function(surfaceId) {
    return this.surfaces_[surfaceId] || null;
  };

  /**
   * Gets the content for the requested surface. By default this just calls
   * `getSurfaceContent`, but can be overriden to add more behavior (check
   * `lfr.SoyComponent` for an example).
   * @param {string} surfaceId The surface id.
   * @return {Object|string} The content to be rendered.
   * @protected
   */
  lfr.Component.prototype.getSurfaceContent_ = function(surfaceId) {
    return this.getSurfaceContent(surfaceId);
  };

  /**
   * Gets the content for the requested surface. Should be implemented by subclasses.
   * @param {string} surfaceId The surface id.
   * @return {Object|string} The content to be rendered.
   */
  lfr.Component.prototype.getSurfaceContent = lfr.nullFunction;

  /**
   * Queries from the document or creates an element for the surface. Surface
   * elements have its surface id namespaced to the component id, e.g. for a
   * component with id `gallery` and a surface with id `pictures` the surface
   * element will be represented by the id `gallery-pictures`. Surface
   * elements must also be appended to the component element.
   * @param {string} surfaceId The surface id.
   * @return {Element} The surface element or null if surface not registered.
   */
  lfr.Component.prototype.getSurfaceElement = function(surfaceId) {
    var surface = this.getSurface(surfaceId);
    if (!surface) {
      return null;
    }
    if (!surface.element) {
      var surfaceElementId = this.makeSurfaceId_(surfaceId);
      surface.element = document.getElementById(surfaceElementId) ||
      this.element.querySelector('#' + surfaceElementId) ||
      this.createSurfaceElement_(surfaceElementId);
    }
    return surface.element;
  };

  /**
   * A map of surface ids to the respective surface object.
   * @return {!Object}
   */
  lfr.Component.prototype.getSurfaces = function() {
    return this.surfaces_;
  };

  /**
   * Handles attributes batch changes. Responsible for surface mutations and
   * attributes synchronization.
   * @param {Event} event
   * @protected
   */
  lfr.Component.prototype.handleAttributesChanges_ = function(event) {
    if (this.inDocument) {
      this.renderSurfacesContent_(this.getModifiedSurfacesFromChanges_(event.changes));
    }
    this.fireAttrsChanges_(event.changes);
  };

  /**
   * Makes an unique id for the component.
   * @return {string} Unique id.
   * @protected
   */
  lfr.Component.prototype.makeId_ = function() {
    return 'lfr_c_' + lfr.getUid(this);
  };

  /**
   * Makes the id for the surface scoped by the component.
   * @param {string} surfaceId The surface id.
   * @return {string}
   * @protected
   */
  lfr.Component.prototype.makeSurfaceId_ = function(surfaceId) {
    return this.id + '-' + surfaceId;
  };

  /**
   * Merges an array of values for the ATTRS_SYNC property into a single object.
   * The final object's keys are the names of the attributes to be synchronized.
   * @param {!Array} values The values to be merged.
   * @return {!Object} The merged value.
   * @protected
   */
  lfr.Component.prototype.mergeAttrsSync_ = function(values) {
    var merged = {};
    values = lfr.array.flatten(values);
    for (var i = 0; i < values.length; i++) {
      if (values[i]) {
        merged[values[i]] = undefined;
      }
    }
    return merged;
  };

  /**
   * Merges an array of values for the ELEMENT_CLASSES property into a single object.
   * @param {!Array} values The values to be merged.
   * @return {!Object} The merged value.
   * @protected
   */
  lfr.Component.prototype.mergeElementClasses_ = function(values) {
    return lfr.array.flatten(values.filter(function(val) {
      return val;
    }));
  };

  /**
   * Merges an array of values for the SURFACES property into a single object.
   * @param {!Array} values The values to be merged.
   * @return {!Object} The merged value.
   * @protected
   */
  lfr.Component.prototype.mergeSurfaces_ = function(values) {
    return lfr.object.mixin.apply(null, [{}].concat(values.reverse()));
  };

  /**
   * Unregisters a surface and removes its element from the DOM.
   * @param {string} surfaceId The surface id.
   * @chainable
   */
  lfr.Component.prototype.removeSurface = function(surfaceId) {
    var el = this.getSurfaceElement(surfaceId);
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
    delete this.surfaces_[surfaceId];
    return this;
  };

  /**
   * Lifecycle. Renders the component into the DOM. Render phase replaces
   * decorate phase, without progressive enhancement support.
   *
   * Render Lifecycle:
   *   render - Decorate is manually called.
   *   renderInternal - Internal implementation for rendering happens.
   *   render surfaces - All surfaces content are rendered.
   *   attribute synchronization - All synchronization methods are called.
   *   attach - Attach Lifecycle is called.
   *
   * @param {(string|Element)=} opt_parentElement Optional parent element
   *     to render the component.
   * @param {(string|Element)=} opt_siblingElement Optional sibling element
   *     to render the component before it. Relevant when the component needs
   *     to be rendered before an existing element in the DOM, e.g.
   *     `component.render(null, existingElement)`.
   * @chainable
   */
  lfr.Component.prototype.render = function(opt_parentElement, opt_siblingElement) {
    if (this.inDocument) {
      throw new Error(lfr.Component.Error.ALREADY_RENDERED);
    }

    this.renderInternal();
    this.clearSurfacesCache_();
    this.renderSurfacesContent_(this.surfaces_);

    this.fireAttrsChanges_(this.constructor.ATTRS_SYNC_MERGED);

    this.attach(opt_parentElement, opt_siblingElement);
    return this;
  };

  /**
   * Renders the component element into the DOM.
   * @param {(string|Element)=} opt_parentElement Optional parent element
   *     to render the component.
   * @param {(string|Element)=} opt_siblingElement Optional sibling element
   *     to render the component before it. Relevant when the component needs
   *     to be rendered before an existing element in the DOM, e.g.
   *     `component.render(null, existingElement)`.
   * @protected
   */
  lfr.Component.prototype.renderElement_ = function(opt_parentElement, opt_siblingElement) {
    this.element.id = this.id;
    if (opt_siblingElement || !this.element.parentNode) {
      var parent = lfr.dom.toElement(opt_parentElement) || document.body;
      parent.insertBefore(this.element, lfr.dom.toElement(opt_siblingElement));
    }
  };

  /**
   * Lifecycle. Internal implementation for rendering. Any extra operation
   * necessary to prepare the component DOM must be implemented in this phase.
   */
  lfr.Component.prototype.renderInternal = lfr.nullFunction;

  /**
   * Render content into a surface. If the specified content is the same of
   * the current surface content, nothing happens. If the surface cache state
   * is not initialized or the content is not eligible for cache or content is
   * different, the surfaces re-renders. It's not recommended to use this
   * method directly since surface content can be provided by
   * `getSurfaceContent(surfaceId)`.
   * @param {string} surfaceId The surface id.
   * @param {Object|string} content The content to be rendered.
   */
  lfr.Component.prototype.renderSurfaceContent = function(surfaceId, content) {
    if (lfr.isDefAndNotNull(content)) {
      var surface = this.getSurface(surfaceId);
      var cacheState = this.computeSurfaceCacheState_(content);

      if (cacheState === lfr.Component.Cache.NOT_INITIALIZED ||
        cacheState === lfr.Component.Cache.NOT_CACHEABLE ||
        cacheState !== surface.cacheState) {

        var el = this.getSurfaceElement(surfaceId);
        lfr.dom.removeChildren(el);
        lfr.dom.append(el, content);
      }
      surface.cacheState = cacheState;
    }
  };

  /**
   * Renders all surfaces contents ignoring the cache.
   * @param {Object.<string, Object=>} surfaces Object map where the key is
   *     the surface id and value the optional surface configuration.
   * @protected
   */
  lfr.Component.prototype.renderSurfacesContent_ = function(surfaces) {
    for (var surfaceId in surfaces) {
      this.renderSurfaceContent(surfaceId, this.getSurfaceContent_(surfaceId));
    }
  };

  /**
   * Setter logic for element attribute.
   * @param {string|Element} val
   * @return {Element}
   * @protected
   */
  lfr.Component.prototype.setterElementFn_ = function(val) {
    return lfr.dom.toElement(val);
  };

  /**
   * Attribute synchronization logic for elementClasses attribute.
   * @param {Array.<string>} newVal
   * @param {Array.<string>} prevVal
   */
  lfr.Component.prototype.syncElementClasses = function(newVal, prevVal) {
    var classList = this.element.classList;
    var classesToAdd = this.constructor.ELEMENT_CLASSES_MERGED;
    if (newVal) {
      classesToAdd = classesToAdd.concat(newVal);
    }
    classList.remove.apply(classList, prevVal);
    classList.add.apply(classList, classesToAdd);
  };

  /**
   * Validator logic for element attribute.
   * @param {string|Element} val
   * @return {Boolean} True if val is a valid element.
   * @protected
   */
  lfr.Component.prototype.validatorElementFn_ = function(val) {
    return lfr.isElement(val) || lfr.isString(val);
  };

  /**
   * Validator logic for elementClasses attribute.
   * @param {Array.<string>} val
   * @return {Boolean} True if val is a valid element classes.
   * @protected
   */
  lfr.Component.prototype.validatorElementClassesFn_ = function(val) {
    return Array.isArray(val);
  };

  /**
   * Validator logic for id attribute.
   * @param {string} val
   * @return {Boolean} True if val is a valid id.
   * @protected
   */
  lfr.Component.prototype.validatorIdFn_ = function(val) {
    return lfr.isString(val);
  };

  /**
   * Provides the default value for element attribute.
   * @return {Element} The element.
   * @protected
   */
  lfr.Component.prototype.valueElementFn_ = function() {
    return document.createElement(this.constructor.ELEMENT_TAG_NAME_MERGED);
  };

  /**
   * Provides the default value for id attribute.
   * @return {string} The id.
   * @protected
   */
  lfr.Component.prototype.valueIdFn_ = function() {
    return this.element.id || this.makeId_();
  };

}());

(function() {
  'use strict';

  /**
   * Special Component class that handles a better integration between soy templates
   * and the components. It allows for automatic rendering of surfaces that have soy
   * templates defined with their names, skipping the call to `getSurfaceContent`.
   * @param {Object} opt_config An object with the initial values for this component's
   *   attributes.
   * @constructor
   */
  lfr.SoyComponent = function(opt_config) {
    lfr.SoyComponent.base(this, 'constructor', opt_config);
    lfr.mergeSuperClassesProperty(this.constructor, 'TEMPLATES', this.mergeTemplates_);
  };
  lfr.inherits(lfr.SoyComponent, lfr.Component);

  /**
   * The soy templates for this component. Templates that have the same
   * name of a registered surface will be used for automatically rendering
   * it.
   * @type {Object<string, !function(Object):Object>}
   * @protected
   * @static
   */
  lfr.SoyComponent.TEMPLATES = {};

  /**
   * Overrides the default behavior so that this can automatically render
   * the appropriate soy template when one exists.
   * @param {string} surfaceId The surface id.
   * @return {Object|string} The content to be rendered.
   * @protected
   * @override
   */
  lfr.SoyComponent.prototype.getSurfaceContent_ = function(surfaceId) {
    var surfaceTemplate = this.constructor.TEMPLATES_MERGED[surfaceId];
    if (lfr.isFunction(surfaceTemplate)) {
      return surfaceTemplate(this).content;
    } else {
      return lfr.SoyComponent.base(this, 'getSurfaceContent_', surfaceId);
    }
  };

  /**
   * Merges an array of values for the `TEMPLATES` property into a single object.
   * @param {!Array} values The values to be merged.
   * @return {!Object} The merged value.
   * @protected
   */
  lfr.SoyComponent.prototype.mergeTemplates_ = function(values) {
    return lfr.object.mixin.apply(null, [{}].concat(values.reverse()));
  };

  /**
   * Overrides the behavior of this method to automatically render the element
   * template if it's defined.
   * @override
   */
  lfr.SoyComponent.prototype.renderInternal = function() {
    var elementTemplate = this.constructor.TEMPLATES_MERGED.element;
    if (lfr.isFunction(elementTemplate)) {
      lfr.dom.append(this.element, elementTemplate(this).content);
    }
  };
}());
