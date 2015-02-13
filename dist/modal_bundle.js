(function() {
    "use strict";
    'use strict';

    /**
     * A collection of core utility functions.
     * @const
     */
    var jspm_packages$github$mairatma$core$es6$core$$core = {};

    /**
     * Unique id property prefix.
     * @type {String}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$core$$core.UID_PROPERTY = 'core_' + ((Math.random() * 1e9) >>> 0);

    /**
     * Counter for unique id.
     * @type {Number}
     * @private
     */
    jspm_packages$github$mairatma$core$es6$core$$core.uniqueIdCounter_ = 1;

    /**
     * When defining a class Foo with an abstract method bar(), you can do:
     * Foo.prototype.bar = core.abstractMethod
     *
     * Now if a subclass of Foo fails to override bar(), an error will be thrown
     * when bar() is invoked.
     *
     * @type {!Function}
     * @throws {Error} when invoked to indicate the method should be overridden.
     */
    jspm_packages$github$mairatma$core$es6$core$$core.abstractMethod = function() {
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
    jspm_packages$github$mairatma$core$es6$core$$core.bind = function(fn) {
      if (!fn) {
        throw new Error();
      }

      if (Function.prototype.bind) {
        return jspm_packages$github$mairatma$core$es6$core$$core.bindWithNative_.apply(jspm_packages$github$mairatma$core$es6$core$$core, arguments);
      } else {
        return jspm_packages$github$mairatma$core$es6$core$$core.bindWithoutNative_.apply(jspm_packages$github$mairatma$core$es6$core$$core, arguments);
      }
    };

    /**
     * Same as `core.bind`, but receives the arguments for the function as a single
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
    jspm_packages$github$mairatma$core$es6$core$$core.bindWithArgs_ = function(fn, context) {
      var args = Array.prototype.slice.call(arguments, 2);

      return function() {
        var newArgs = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(newArgs, args);
        return fn.apply(context, newArgs);
      };
    };

    /**
     * Same as `core.bind`, but uses the native javascript `bind` function instead
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
    jspm_packages$github$mairatma$core$es6$core$$core.bindWithNative_ = function(fn) {
      var bind = fn.call.apply(fn.bind, arguments);
      return function() {
        return bind.apply(null, arguments);
      };
    };

    /**
     * Same as `core.bind`, but it can't receive any arguments for the function.
     * @param {function} fn A function to partially apply.
     * @param {!Object} context Specifies the object which this should point to
     *     when the function is run.
     * @return {!Function} A partially-applied form of the function bind() was
     *     invoked as a method of.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$core$$core.bindWithoutArgs_ = function(fn, context) {
      return function() {
        return fn.apply(context, arguments);
      };
    };

    /**
     * Same as `core.bind`, but doesn't try to use the native javascript `bind`
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
    jspm_packages$github$mairatma$core$es6$core$$core.bindWithoutNative_ = function(fn, context) {
      if (arguments.length > 2) {
        return jspm_packages$github$mairatma$core$es6$core$$core.bindWithArgs_.apply(jspm_packages$github$mairatma$core$es6$core$$core, arguments);
      } else {
        return jspm_packages$github$mairatma$core$es6$core$$core.bindWithoutArgs_(fn, context);
      }
    };

    /**
     * Loops constructor super classes collecting its properties values. If
     * property is not available on the super class `undefined` will be
     * collected as value for the class hierarchy position. Must be used with
     * classes created using `core.inherits`.
     * @param {!function()} constructor Class constructor.
     * @param {string} propertyName Property name to be collected.
     * @return {Array.<*>} Array of collected values.
     */
    jspm_packages$github$mairatma$core$es6$core$$core.collectSuperClassesProperty = function(constructor, propertyName) {
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
     * returns. See {@link core.UID_PROPERTY}.
     * @type {opt_object} Optional object to be mutated with the uid. If not
     *     specified this method only returns the uid.
     * @throws {Error} when invoked to indicate the method should be overridden.
     */
    jspm_packages$github$mairatma$core$es6$core$$core.getUid = function(opt_object) {
      if (opt_object) {
        return opt_object[jspm_packages$github$mairatma$core$es6$core$$core.UID_PROPERTY] ||
          (opt_object[jspm_packages$github$mairatma$core$es6$core$$core.UID_PROPERTY] = jspm_packages$github$mairatma$core$es6$core$$core.uniqueIdCounter_++);
      }
      return jspm_packages$github$mairatma$core$es6$core$$core.uniqueIdCounter_++;
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
     *   core.base(this, a, b);
     * }
     * core.inherits(ChildClass, ParentClass);
     *
     * var child = new ChildClass('a', 'b', 'c');
     * child.foo();
     * </pre>
     *
     * @param {Function} childCtor Child class.
     * @param {Function} parentCtor Parent class.
     */
    jspm_packages$github$mairatma$core$es6$core$$core.inherits = function(childCtor, parentCtor) {
      function TempCtor() {
      }
      TempCtor.prototype = parentCtor.prototype;
      childCtor.superClass_ = parentCtor.prototype;
      childCtor.prototype = new TempCtor();
      childCtor.prototype.constructor = childCtor;

      /**
       * Calls superclass constructor/method.
       *
       * This function is only available if you use core.inherits to express
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
    jspm_packages$github$mairatma$core$es6$core$$core.identityFunction = function(opt_returnValue) {
      return opt_returnValue;
    };

    /**
     * Returns true if the specified value is a boolean.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is boolean.
     */
    jspm_packages$github$mairatma$core$es6$core$$core.isBoolean = function(val) {
      return typeof val === 'boolean';
    };

    /**
     * Returns true if the specified value is not undefined.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is defined.
     */
    jspm_packages$github$mairatma$core$es6$core$$core.isDef = function(val) {
      return val !== undefined;
    };

    /**
     * Returns true if value is not undefined or null.
     * @param {*} val
     * @return {Boolean}
     */
    jspm_packages$github$mairatma$core$es6$core$$core.isDefAndNotNull = function(val) {
      return jspm_packages$github$mairatma$core$es6$core$$core.isDef(val) && !jspm_packages$github$mairatma$core$es6$core$$core.isNull(val);
    };

    /**
     * Returns true if value is a dom element.
     * @param {*} val
     * @return {Boolean}
     */
    jspm_packages$github$mairatma$core$es6$core$$core.isElement = function(val) {
      return val && typeof val === 'object' && val.nodeType === 1;
    };

    /**
     * Returns true if the specified value is a function.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is a function.
     */
    jspm_packages$github$mairatma$core$es6$core$$core.isFunction = function(val) {
      return typeof val === 'function';
    };

    /**
     * Returns true if value is null.
     * @param {*} val
     * @return {Boolean}
     */
    jspm_packages$github$mairatma$core$es6$core$$core.isNull = function(val) {
      return val === null;
    };

    /**
     * Returns true if the specified value is an object. This includes arrays
     * and functions.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is an object.
     */
    jspm_packages$github$mairatma$core$es6$core$$core.isObject = function(val) {
      var type = typeof val;
      return type === 'object' && val !== null || type === 'function';
    };

    /**
     * Returns true if value is a string.
     * @param {*} val
     * @return {Boolean}
     */
    jspm_packages$github$mairatma$core$es6$core$$core.isString = function(val) {
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
    jspm_packages$github$mairatma$core$es6$core$$core.mergeSuperClassesProperty = function(constructor, propertyName, opt_mergeFn) {
      var mergedName = propertyName + '_MERGED';
      if (constructor[mergedName]) {
        return constructor[mergedName];
      }

      var merged = jspm_packages$github$mairatma$core$es6$core$$core.collectSuperClassesProperty(constructor, propertyName);
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
    jspm_packages$github$mairatma$core$es6$core$$core.nullFunction = function() {};

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
    jspm_packages$github$mairatma$core$es6$core$$core.rbind = function(fn, context) {
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

    var jspm_packages$github$mairatma$core$es6$core$$default = jspm_packages$github$mairatma$core$es6$core$$core;

    if (typeof dist$modal$soy$$templates == 'undefined') { var dist$modal$soy$$templates = {}; }


    /**
     * @param {Object.<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @return {!soydata.SanitizedHtml}
     * @suppress {checkTypes}
     */
    dist$modal$soy$$templates.element = function(opt_data, opt_ignored) {
      return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="modal-dialog"><div class="modal-content"><div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-header" class="modal-header"></div><div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-body" class="modal-body"></div><div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-footer" class="modal-footer"></div></div></div>');
    };
    if (goog.DEBUG) {
      dist$modal$soy$$templates.element.soyTemplateName = 'templates.element';
    }


    /**
     * @param {Object.<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @return {!soydata.SanitizedHtml}
     * @suppress {checkTypes}
     */
    dist$modal$soy$$templates.body = function(opt_data, opt_ignored) {
      return soydata.VERY_UNSAFE.ordainSanitizedHtml('<p>' + soy.$$escapeHtml(opt_data.bodyContent) + '</p>');
    };
    if (goog.DEBUG) {
      dist$modal$soy$$templates.body.soyTemplateName = 'templates.body';
    }


    /**
     * @param {Object.<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @return {!soydata.SanitizedHtml}
     * @suppress {checkTypes}
     */
    dist$modal$soy$$templates.header = function(opt_data, opt_ignored) {
      return soydata.VERY_UNSAFE.ordainSanitizedHtml('<h4 class="modal-title">' + soy.$$escapeHtml(opt_data.headerContent) + '</h4>');
    };
    if (goog.DEBUG) {
      dist$modal$soy$$templates.header.soyTemplateName = 'templates.header';
    }


    /**
     * @param {Object.<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @return {!soydata.SanitizedHtml}
     * @suppress {checkTypes}
     */
    dist$modal$soy$$templates.footer = function(opt_data, opt_ignored) {
      var output = '';
      var buttonList19 = opt_data.footerButtons;
      var buttonListLen19 = buttonList19.length;
      for (var buttonIndex19 = 0; buttonIndex19 < buttonListLen19; buttonIndex19++) {
        var buttonData19 = buttonList19[buttonIndex19];
        output += '<button type="button" class="modal-button ' + soy.$$escapeHtmlAttribute(buttonData19['class']) + '">' + soy.$$escapeHtml(buttonData19.label) + '</button>';
      }
      return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
    };
    if (goog.DEBUG) {
      dist$modal$soy$$templates.footer.soyTemplateName = 'templates.footer';
    }
    var dist$modal$soy$$default = dist$modal$soy$$templates;
    'use strict';

    var jspm_packages$github$mairatma$core$es6$object$object$$object = {};

    /**
     * Copies all the members of a source object to a target object.
     * @param {Object} target Target object.
     * @param {...Object} var_args The objects from which values will be copied.
     * @return {Object} Returns the target object reference.
     */
    jspm_packages$github$mairatma$core$es6$object$object$$object.mixin = function(target) {
      var key, source;
      for (var i = 1; i < arguments.length; i++) {
        source = arguments[i];
        for (key in source) {
          target[key] = source[key];
        }
      }
      return target;
    };

    var jspm_packages$github$mairatma$core$es6$object$object$$default = jspm_packages$github$mairatma$core$es6$object$object$$object;
    'use strict';

    /**
     * Disposable utility. When inherited provides the `dispose` function to its
     * subclass, which is responsible for disposing of any object references
     * when an instance won't be used anymore. Subclasses should override
     * `disposeInternal` to implement any specific disposing logic.
     * @constructor
     */
    var jspm_packages$github$mairatma$core$es6$disposable$Disposable$$Disposable = function() {};

    /**
     * Flag indicating if this instance has already been disposed.
     * @type {boolean}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$disposable$Disposable$$Disposable.prototype.disposed_ = false;

    /**
     * Disposes of this instance's object references. Calls `disposeInternal`.
     */
    jspm_packages$github$mairatma$core$es6$disposable$Disposable$$Disposable.prototype.dispose = function() {
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
    jspm_packages$github$mairatma$core$es6$disposable$Disposable$$Disposable.prototype.disposeInternal = jspm_packages$github$mairatma$core$es6$core$$default.nullFunction;

    /**
     * Checks if this instance has already been disposed.
     * @return {boolean}
     */
    jspm_packages$github$mairatma$core$es6$disposable$Disposable$$Disposable.prototype.isDisposed = function() {
      return this.disposed_;
    };

    var jspm_packages$github$mairatma$core$es6$disposable$Disposable$$default = jspm_packages$github$mairatma$core$es6$disposable$Disposable$$Disposable;
    'use strict';

    /**
     * EventHandle utility. Holds information about an event subscription, and
     * allows removing them easily.
     * EventHandle is a Disposable, but it's important to note that the
     * EventEmitter that created it is not the one responsible for disposing it.
     * That responsibility is for the code that holds a reference to it.
     * @param {!EventEmitter} emitter Emitter the event was subscribed to.
     * @param {string} event The name of the event that was subscribed to.
     * @param {!Function} listener The listener subscribed to the event.
     * @constructor
     */
    var jspm_packages$github$mairatma$core$es6$events$EventHandle$$EventHandle = function(emitter, event, listener) {
      this.emitter_ = emitter;
      this.event_ = event;
      this.listener_ = listener;
    };
    jspm_packages$github$mairatma$core$es6$core$$default.inherits(jspm_packages$github$mairatma$core$es6$events$EventHandle$$EventHandle, jspm_packages$github$mairatma$core$es6$disposable$Disposable$$default);

    /**
     * The EventEmitter instance that the event was subscribed to.
     * @type {EventEmitter}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventHandle$$EventHandle.prototype.emitter_ = null;

    /**
     * The name of the event that was subscribed to.
     * @type {string}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventHandle$$EventHandle.prototype.event_ = null;

    /**
     * The listener subscribed to the event.
     * @type {Function}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventHandle$$EventHandle.prototype.listener_ = null;

    /**
     * Disposes of this instance's object references.
     * @override
     */
    jspm_packages$github$mairatma$core$es6$events$EventHandle$$EventHandle.prototype.disposeInternal = function() {
      this.emitter_ = null;
      this.listener_ = null;
    };

    /**
     * Removes the listener subscription from the emitter.
     */
    jspm_packages$github$mairatma$core$es6$events$EventHandle$$EventHandle.prototype.removeListener = function() {
      if (!this.emitter_.isDisposed()) {
        this.emitter_.removeListener(this.event_, this.listener_);
      }
    };

    var jspm_packages$github$mairatma$core$es6$events$EventHandle$$default = jspm_packages$github$mairatma$core$es6$events$EventHandle$$EventHandle;
    'use strict';

    /**
     * This is a special EventHandle, that is responsible for dom events, instead
     * of EventEmitter events.
     * @param {!EventEmitter} emitter Emitter the event was subscribed to.
     * @param {string} event The name of the event that was subscribed to.
     * @param {!Function} listener The listener subscribed to the event.
     * @constructor
     */
    var jspm_packages$github$mairatma$core$es6$events$DomEventHandle$$DomEventHandle = function(emitter, event, listener) {
      jspm_packages$github$mairatma$core$es6$events$DomEventHandle$$DomEventHandle.base(this, 'constructor', emitter, event, listener);
    };
    jspm_packages$github$mairatma$core$es6$core$$default.inherits(jspm_packages$github$mairatma$core$es6$events$DomEventHandle$$DomEventHandle, jspm_packages$github$mairatma$core$es6$events$EventHandle$$default);

    /**
     * @inheritDoc
     */
    jspm_packages$github$mairatma$core$es6$events$DomEventHandle$$DomEventHandle.prototype.removeListener = function() {
      this.emitter_.removeEventListener(this.event_, this.listener_);
    };

    var jspm_packages$github$mairatma$core$es6$events$DomEventHandle$$default = jspm_packages$github$mairatma$core$es6$events$DomEventHandle$$DomEventHandle;
    'use strict';

    var jspm_packages$github$mairatma$core$es6$dom$dom$$dom = {};

    /**
     * Adds the requested CSS classes to an element.
     * @param {!Element} element The element to add CSS classes to.
     * @param {!Array<string>} classes CSS classes to add.
     */
    jspm_packages$github$mairatma$core$es6$dom$dom$$dom.addClasses = function(element, classes) {
      classes.forEach(function(className) {
        element.classList.add(className);
      });
    };

    /**
     * Appends a child node with text or other nodes to a parent node. If
     * child is a HTML string it will be automatically converted to a document
     * fragment before appending it to the parent.
     * @param {!Element} parent The node to append nodes to.
     * @param {!Element|String} child The thing to append to the parent.
     * @return {!Element} The appended child.
     */
    jspm_packages$github$mairatma$core$es6$dom$dom$$dom.append = function(parent, child) {
      if (jspm_packages$github$mairatma$core$es6$core$$default.isString(child)) {
        child = jspm_packages$github$mairatma$core$es6$dom$dom$$dom.buildFragment(child);
      }
      return parent.appendChild(child);
    };

    /**
     * Helper for converting a HTML string into a document fragment.
     * @param {string} htmlString The HTML string to convert.
     * @return {!Element} The resulting document fragment.
     */
    jspm_packages$github$mairatma$core$es6$dom$dom$$dom.buildFragment = function(htmlString) {
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
     * @return {!DomEventHandle} Can be used to remove the listener.
     */
    jspm_packages$github$mairatma$core$es6$dom$dom$$dom.delegate = function(element, eventName, selector, callback) {
      return jspm_packages$github$mairatma$core$es6$dom$dom$$dom.on(
        element,
        eventName,
        jspm_packages$github$mairatma$core$es6$core$$default.bind(jspm_packages$github$mairatma$core$es6$dom$dom$$dom.handleDelegateEvent_, null, selector, callback)
      );
    };

    /**
     * This is called when an event is triggered by a delegate listener (see
     * `dom.delegate` for more details).
     * @param {string} selector The selector that matches the child elements that
     *   the event should be triggered for.
     * @param {!function(!Object)} callback Function to be called when the event is
     *   triggered. It will receive the normalized event object.
     * @param {!Event} event The event payload.
     * @return {boolean} False if at least one of the triggered callbacks returns false,
     *   or true otherwise.
     */
    jspm_packages$github$mairatma$core$es6$dom$dom$$dom.handleDelegateEvent_ = function(selector, callback, event) {
      jspm_packages$github$mairatma$core$es6$dom$dom$$dom.normalizeDelegateEvent_(event);

      var currentElement = event.target;
      var returnValue = true;

      while (currentElement && !event.stopped) {
        if (jspm_packages$github$mairatma$core$es6$dom$dom$$dom.match(currentElement, selector)) {
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
    jspm_packages$github$mairatma$core$es6$dom$dom$$dom.match = function(element, selector) {
      if (!element || element.nodeType !== 1) {
        return false;
      }

      var p = Element.prototype;
      var m = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector;
      if (m) {
        return m.call(element, selector);
      }

      return jspm_packages$github$mairatma$core$es6$dom$dom$$dom.matchFallback_(element, selector);
    };

    /**
     * Check if an element matches a given selector, using an internal implementation
     * instead of calling existing javascript functions.
     * @param {Element} element
     * @param {string} selector
     * @return {boolean}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$dom$dom$$dom.matchFallback_ = function(element, selector) {
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
    jspm_packages$github$mairatma$core$es6$dom$dom$$dom.normalizeDelegateEvent_ = function(event) {
      event.stopPropagation = jspm_packages$github$mairatma$core$es6$dom$dom$$dom.stopPropagation_;
      event.stopImmediatePropagation = jspm_packages$github$mairatma$core$es6$dom$dom$$dom.stopImmediatePropagation_;
    };

    /**
     * Listens to the specified event on the given DOM element. This function normalizes
     * DOM event payloads and functions so they'll work the same way on all supported
     * browsers.
     * @param {!Element} element The DOM element to listen to the event on.
     * @param {string} eventName The name of the event to listen to.
     * @param {!function(!Object)} callback Function to be called when the event is
     *   triggered. It will receive the normalized event object.
     * @return {!DomEventHandle} Can be used to remove the listener.
     */
    jspm_packages$github$mairatma$core$es6$dom$dom$$dom.on = function(element, eventName, callback) {
      element.addEventListener(eventName, callback);
      return new jspm_packages$github$mairatma$core$es6$events$DomEventHandle$$default(element, eventName, callback);
    };

    /**
     * Removes all the child nodes on a DOM node.
     * @param {Element} node Element to remove children from.
     */
    jspm_packages$github$mairatma$core$es6$dom$dom$$dom.removeChildren = function(node) {
      var child;
      while ((child = node.firstChild)) {
        node.removeChild(child);
      }
    };

    /**
     * Removes the requested CSS classes from an element.
     * @param {!Element} element The element to remove CSS classes from.
     * @param {!Array<string>} classes CSS classes to remove.
     */
    jspm_packages$github$mairatma$core$es6$dom$dom$$dom.removeClasses = function(element, classes) {
      classes.forEach(function(className) {
        element.classList.remove(className);
      });
    };

    /**
     * The function that replaces `stopImmediatePropagation_` for events.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$dom$dom$$dom.stopImmediatePropagation_ = function() {
      this.stopped = true;
      Event.prototype.stopImmediatePropagation.call(this);
    };

    /**
     * The function that replaces `stopPropagation` for events.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$dom$dom$$dom.stopPropagation_ = function() {
      this.stopped = true;
      Event.prototype.stopPropagation.call(this);
    };

    /**
     * Checks if the given element supports the given event type.
     * @param {!Element} element The DOM element to check.
     * @param {string} eventName The name of the event to check.
     * @return {boolean}
     */
    jspm_packages$github$mairatma$core$es6$dom$dom$$dom.supportsEvent = function(element, eventName) {
      return 'on' + eventName in element;
    };

    /**
     * Converts the given argument to a DOM element. Strings are assumed to
     * be selectors, and so a matched element will be returned. If the arg
     * is already a DOM element it will be the return value.
     * @param {string|Element} selectorOrElement
     * @return {Element} The converted element, or null if none was found.
     */
    jspm_packages$github$mairatma$core$es6$dom$dom$$dom.toElement = function(selectorOrElement) {
      if (jspm_packages$github$mairatma$core$es6$core$$default.isElement(selectorOrElement)) {
        return selectorOrElement;
      } else if (jspm_packages$github$mairatma$core$es6$core$$default.isString(selectorOrElement)) {
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
    jspm_packages$github$mairatma$core$es6$dom$dom$$dom.triggerEvent = function(element, eventName, opt_eventObj) {
      var eventObj = document.createEvent('HTMLEvents');
      eventObj.initEvent(eventName, true, true);
      jspm_packages$github$mairatma$core$es6$object$object$$default.mixin(eventObj, opt_eventObj);
      element.dispatchEvent(eventObj);
    };

    var jspm_packages$github$mairatma$core$es6$dom$dom$$default = jspm_packages$github$mairatma$core$es6$dom$dom$$dom;
    'use strict';

    var jspm_packages$github$mairatma$core$es6$array$array$$array = {};

    /**
     * Returns the first value in the given array that isn't undefined.
     * @param {!Array} arr
     * @return {*}
     */
    jspm_packages$github$mairatma$core$es6$array$array$$array.firstDefinedValue = function(arr) {
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
    jspm_packages$github$mairatma$core$es6$array$array$$array.flatten = function(arr, opt_output) {
      var output = opt_output || [];
      for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
          jspm_packages$github$mairatma$core$es6$array$array$$array.flatten(arr[i], output);
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
    jspm_packages$github$mairatma$core$es6$array$array$$array.remove = function(arr, obj) {
      var i = arr.indexOf(obj);
      var rv;
      if ( (rv = i >= 0) ) {
        jspm_packages$github$mairatma$core$es6$array$array$$array.removeAt(arr, i);
      }
      return rv;
    };

    /**
     * Removes from an array the element at index i
     * @param {Array} arr Array or array like object from which to remove value.
     * @param {number} i The index to remove.
     * @return {boolean} True if an element was removed.
     */
    jspm_packages$github$mairatma$core$es6$array$array$$array.removeAt = function(arr, i) {
      return Array.prototype.splice.call(arr, i, 1).length === 1;
    };

    var jspm_packages$github$mairatma$core$es6$array$array$$default = jspm_packages$github$mairatma$core$es6$array$array$$array;
    'use strict';

    var jspm_packages$github$mairatma$core$es6$string$string$$string = {};

    /**
     * Removes the breaking spaces from the left and right of the string and
     * collapses the sequences of breaking spaces in the middle into single spaces.
     * The original and the result strings render the same way in HTML.
     * @param {string} str A string in which to collapse spaces.
     * @return {string} Copy of the string with normalized breaking spaces.
     */
    jspm_packages$github$mairatma$core$es6$string$string$$string.collapseBreakingSpaces = function(str) {
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
    jspm_packages$github$mairatma$core$es6$string$string$$string.hashCode = function(val) {
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
    jspm_packages$github$mairatma$core$es6$string$string$$string.replaceInterval = function(str, start, end, value) {
      return str.substring(0, start) + value + str.substring(end);
    };

    var jspm_packages$github$mairatma$core$es6$string$string$$default = jspm_packages$github$mairatma$core$es6$string$string$$string;
    'use strict';

    var jspm_packages$github$mairatma$core$es6$html$html$$html = {};

    /**
     * HTML regex patterns.
     * @enum {RegExp}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$html$html$$html.Patterns = {
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
     * @param {string} htmlString Input HTML to be compressed.
     * @return {string} Compressed version of the HTML.
     */
    jspm_packages$github$mairatma$core$es6$html$html$$html.compress = function(htmlString) {
      var preserved = {};
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.preserveBlocks_(htmlString, preserved);
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.simplifyDoctype_(htmlString);
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.removeComments_(htmlString);
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.removeIntertagSpaces_(htmlString);
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.collapseBreakingSpaces_(htmlString);
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.removeSpacesInsideTags_(htmlString);
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.removeSurroundingSpaces_(htmlString);
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.returnBlocks_(htmlString, preserved);
      return htmlString.trim();
    };

    /**
     * Collapses breaking spaces into a single space.
     * @param {string} htmlString
     * @return {string}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$html$html$$html.collapseBreakingSpaces_ = function(htmlString) {
      return jspm_packages$github$mairatma$core$es6$string$string$$default.collapseBreakingSpaces(htmlString);
    };

    /**
     * Searches for first occurrence of the specified open tag string pattern
     * and from that point finds next ">" position, identified as possible tag
     * end position.
     * @param {string} htmlString
     * @param {string} openTag Open tag string pattern without open tag ending
     *     character, e.g. "<textarea" or "<code".
     * @return {string}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$html$html$$html.lookupPossibleTagEnd_ = function(htmlString, openTag) {
      var tagPos = htmlString.indexOf(openTag);
      if (tagPos > -1) {
        tagPos += htmlString.substring(tagPos).indexOf('>') + 1;
      }
      return tagPos;
    };

    /**
     * Preserves contents inside any <code>, <pre>, <script>, <style>,
     * <textarea> and conditional comment tags. When preserved, original content
     * are replaced with an unique generated block id and stored into
     * `preserved` map.
     * @param {string} htmlString
     * @param {Object} preserved Object to preserve the content indexed by an
     *     unique generated block id.
     * @return {html} The preserved HTML.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$html$html$$html.preserveBlocks_ = function(htmlString, preserved) {
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.preserveOuterHtml_(htmlString, '<!--[if', '<![endif]-->', preserved);
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.preserveInnerHtml_(htmlString, '<code', '</code', preserved);
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.preserveInnerHtml_(htmlString, '<pre', '</pre', preserved);
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.preserveInnerHtml_(htmlString, '<script', '</script', preserved);
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.preserveInnerHtml_(htmlString, '<style', '</style', preserved);
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.preserveInnerHtml_(htmlString, '<textarea', '</textarea', preserved);
      return htmlString;
    };

    /**
     * Preserves inner contents inside the specified tag. When preserved,
     * original content are replaced with an unique generated block id and
     * stored into `preserved` map.
     * @param {string} htmlString
     * @param {string} openTag Open tag string pattern without open tag ending
     *     character, e.g. "<textarea" or "<code".
     * @param {string} closeTag Close tag string pattern without close tag
     *     ending character, e.g. "</textarea" or "</code".
     * @param {Object} preserved Object to preserve the content indexed by an
     *     unique generated block id.
     * @return {html} The preserved HTML.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$html$html$$html.preserveInnerHtml_ = function(htmlString, openTag, closeTag, preserved) {
      var tagPosEnd = jspm_packages$github$mairatma$core$es6$html$html$$html.lookupPossibleTagEnd_(htmlString, openTag);
      while (tagPosEnd > -1) {
        var tagEndPos = htmlString.indexOf(closeTag);
        htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.preserveInterval_(htmlString, tagPosEnd, tagEndPos, preserved);
        htmlString = htmlString.replace(openTag, '%%%~1~%%%');
        htmlString = htmlString.replace(closeTag, '%%%~2~%%%');
        tagPosEnd = jspm_packages$github$mairatma$core$es6$html$html$$html.lookupPossibleTagEnd_(htmlString, openTag);
      }
      htmlString = htmlString.replace(/%%%~1~%%%/g, openTag);
      htmlString = htmlString.replace(/%%%~2~%%%/g, closeTag);
      return htmlString;
    };

    /**
     * Preserves interval of the specified HTML into the preserved map replacing
     * original contents with an unique generated id.
     * @param {string} htmlString
     * @param {Number} start Start interval position to be replaced.
     * @param {Number} end End interval position to be replaced.
     * @param {Object} preserved Object to preserve the content indexed by an
     *     unique generated block id.
     * @return {string} The HTML with replaced interval.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$html$html$$html.preserveInterval_ = function(htmlString, start, end, preserved) {
      var blockId = '%%%~BLOCK~' + jspm_packages$github$mairatma$core$es6$core$$default.getUid() + '~%%%';
      preserved[blockId] = htmlString.substring(start, end);
      return jspm_packages$github$mairatma$core$es6$string$string$$default.replaceInterval(htmlString, start, end, blockId);
    };

    /**
     * Preserves outer contents inside the specified tag. When preserved,
     * original content are replaced with an unique generated block id and
     * stored into `preserved` map.
     * @param {string} htmlString
     * @param {string} openTag Open tag string pattern without open tag ending
     *     character, e.g. "<textarea" or "<code".
     * @param {string} closeTag Close tag string pattern without close tag
     *     ending character, e.g. "</textarea" or "</code".
     * @param {Object} preserved Object to preserve the content indexed by an
     *     unique generated block id.
     * @return {html} The preserved HTML.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$html$html$$html.preserveOuterHtml_ = function(htmlString, openTag, closeTag, preserved) {
      var tagPos = htmlString.indexOf(openTag);
      while (tagPos > -1) {
        var tagEndPos = htmlString.indexOf(closeTag) + closeTag.length;
        htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.preserveInterval_(htmlString, tagPos, tagEndPos, preserved);
        tagPos = htmlString.indexOf(openTag);
      }
      return htmlString;
    };

    /**
     * Removes all comments of the HTML. Including conditional comments and
     * "<![CDATA[" blocks.
     * @param {string} htmlString
     * @return {string} The HTML without comments.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$html$html$$html.removeComments_ = function(htmlString) {
      var preserved = {};
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.preserveOuterHtml_(htmlString, '<![CDATA[', ']]>', preserved);
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.preserveOuterHtml_(htmlString, '<!--', '-->', preserved);
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.replacePreservedBlocks_(htmlString, preserved, '');
      return htmlString;
    };

    /**
     * Removes spaces between tags, even from inline-block elements.
     * @param {string} htmlString
     * @return {string} The HTML without spaces between tags.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$html$html$$html.removeIntertagSpaces_ = function(htmlString) {
      htmlString = htmlString.replace(jspm_packages$github$mairatma$core$es6$html$html$$html.Patterns.INTERTAG_CUSTOM_CUSTOM, '~%%%%%%~');
      htmlString = htmlString.replace(jspm_packages$github$mairatma$core$es6$html$html$$html.Patterns.INTERTAG_CUSTOM_TAG, '~%%%<');
      htmlString = htmlString.replace(jspm_packages$github$mairatma$core$es6$html$html$$html.Patterns.INTERTAG_TAG, '><');
      htmlString = htmlString.replace(jspm_packages$github$mairatma$core$es6$html$html$$html.Patterns.INTERTAG_TAG_CUSTOM, '>%%%~');
      return htmlString;
    };

    /**
     * Removes spaces inside tags.
     * @param {string} htmlString
     * @return {string} The HTML without spaces inside tags.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$html$html$$html.removeSpacesInsideTags_ = function(htmlString) {
      htmlString = htmlString.replace(jspm_packages$github$mairatma$core$es6$html$html$$html.Patterns.TAG_END_SPACES, '$1$2');
      htmlString = htmlString.replace(jspm_packages$github$mairatma$core$es6$html$html$$html.Patterns.TAG_QUOTE_SPACES, '=$1$2$3');
      return htmlString;
    };

    /**
     * Removes spaces surrounding tags.
     * @param {string} htmlString
     * @return {string} The HTML without spaces surrounding tags.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$html$html$$html.removeSurroundingSpaces_ = function(htmlString) {
      return htmlString.replace(jspm_packages$github$mairatma$core$es6$html$html$$html.Patterns.SURROUNDING_SPACES, '$1');
    };

    /**
     * Restores preserved map keys inside the HTML. Note that the passed HTML
     * should contain the unique generated block ids to be replaced.
     * @param {string} htmlString
     * @param {Object} preserved Object to preserve the content indexed by an
     *     unique generated block id.
     * @param {string} replaceValue The value to replace any block id inside the
     * HTML.
     * @return {string}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$html$html$$html.replacePreservedBlocks_ = function(htmlString, preserved, replaceValue) {
      for (var blockId in preserved) {
        htmlString = htmlString.replace(blockId, replaceValue);
      }
      return htmlString;
    };

    /**
     * Simplifies DOCTYPE declaration to <!DOCTYPE html>.
     * @param {string} htmlString
     * @return {string}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$html$html$$html.simplifyDoctype_ = function(htmlString) {
      var preserved = {};
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.preserveOuterHtml_(htmlString, '<!DOCTYPE', '>', preserved);
      htmlString = jspm_packages$github$mairatma$core$es6$html$html$$html.replacePreservedBlocks_(htmlString, preserved, '<!DOCTYPE html>');
      return htmlString;
    };

    /**
     * Restores preserved map original contents inside the HTML. Note that the
     * passed HTML should contain the unique generated block ids to be restored.
     * @param {string} htmlString
     * @param {Object} preserved Object to preserve the content indexed by an
     *     unique generated block id.
     * @return {string}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$html$html$$html.returnBlocks_ = function(htmlString, preserved) {
      for (var blockId in preserved) {
        htmlString = htmlString.replace(blockId, preserved[blockId]);
      }
      return htmlString;
    };

    var jspm_packages$github$mairatma$core$es6$html$html$$default = jspm_packages$github$mairatma$core$es6$html$html$$html;
    'use strict';

    /**
     * Trie data structure. It's useful for quickly storing and finding
     * information related to strings and their prefixes. See
     * http://en.wikipedia.org/wiki/Trie.
     * @constructor
     */
    var jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie = function(value) {
      this.value_ = value;
      this.children_ = {};
    };
    jspm_packages$github$mairatma$core$es6$core$$default.inherits(jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie, jspm_packages$github$mairatma$core$es6$disposable$Disposable$$default);

    /**
     * The list of children for this tree.
     * @type {Object.<string, Trie>}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie.prototype.children_ = null;

    /**
     * The value associated with this tree.
     * @type {*}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie.prototype.value_ = null;

    /**
     * Empties the trie of all keys and values.
     */
    jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie.prototype.clear = function() {
      this.children_ = {};
      this.value_ = null;
    };

    /**
     * Creates a new trie node.
     * @return {Trie}
     */
    jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie.prototype.createNewTrieNode = function() {
      return new jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie();
    };

    /**
     * Disposes of this instance's object references.
     * @override
     */
    jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie.prototype.disposeInternal = function() {
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
    jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie.prototype.findKeyNode_ = function(key, createIfMissing) {
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
    jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie.prototype.getAllChildren = function() {
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
     * @return {Trie}
     */
    jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie.prototype.getChild = function(keyPart, createIfMissing) {
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
    jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie.prototype.getKeyValue = function(key) {
      var node = this.findKeyNode_(key);

      return node ? node.getValue() : null;
    };

    /**
     * Gets this tree's value.
     * @return {*}
     */
    jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie.prototype.getValue = function() {
      return this.value_;
    };

    /**
     * Returns a normalized key, to be used by a Trie.
     * @param  {!(Array|string)} key The key to be normalized.
     * @return {!Array} The normalized key.
     */
    jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie.prototype.normalizeKey = function(key) {
      return jspm_packages$github$mairatma$core$es6$core$$default.isString(key) ? key.split('') : key;
    };

    /**
     * Sets the child node for the given key part.
     * @param {string} keyPart String that can directly access a child of this
     *   Trie.
     * @param {Trie} child
     */
    jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie.prototype.setChild = function(keyPart, child) {
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
    jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie.prototype.setKeyValue = function(key, value, opt_mergeFn) {
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
    jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie.prototype.setValue = function(value) {
      this.value_ = value;
    };

    var jspm_packages$github$mairatma$core$es6$structs$Trie$$default = jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie;
    'use strict';

    /**
     * A trie that can handle wildcards.
     * @param {*} value
     * @constructor
     */
    var jspm_packages$github$mairatma$core$es6$structs$WildcardTrie$$WildcardTrie = function(value) {
      jspm_packages$github$mairatma$core$es6$structs$WildcardTrie$$WildcardTrie.base(this, 'constructor', value);
    };
    jspm_packages$github$mairatma$core$es6$core$$default.inherits(jspm_packages$github$mairatma$core$es6$structs$WildcardTrie$$WildcardTrie, jspm_packages$github$mairatma$core$es6$structs$Trie$$default);

    /**
     * A token representing any single namespace.
     * @type {string}
     * @static
     */
    jspm_packages$github$mairatma$core$es6$structs$WildcardTrie$$WildcardTrie.TOKEN_SKIP_SINGLE = '*';

    /**
     * Creates a new trie node.
     * @return {Trie}
     * @override
     */
    jspm_packages$github$mairatma$core$es6$structs$WildcardTrie$$WildcardTrie.prototype.createNewTrieNode = function() {
      return new jspm_packages$github$mairatma$core$es6$structs$WildcardTrie$$WildcardTrie();
    };

    /**
     * Gets all the children that match any of the given list of key parts.
     * @param {!Array} keyParts
     * @return {!Array}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$structs$WildcardTrie$$WildcardTrie.prototype.getChildrenMatchingKeyParts_ = function(keyParts) {
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
    jspm_packages$github$mairatma$core$es6$structs$WildcardTrie$$WildcardTrie.prototype.getKeyValue = function(key) {
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
    jspm_packages$github$mairatma$core$es6$structs$WildcardTrie$$WildcardTrie.prototype.getKeyValueForChildren_ = function(key, keyPart) {
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
    jspm_packages$github$mairatma$core$es6$structs$WildcardTrie$$WildcardTrie.prototype.getMatchingChildren_ = function(keyPart) {
      var matchingChildren = [];

      if (keyPart === jspm_packages$github$mairatma$core$es6$structs$WildcardTrie$$WildcardTrie.TOKEN_SKIP_SINGLE) {
        matchingChildren = this.getAllChildren();
      } else {
        matchingChildren = this.getChildrenMatchingKeyParts_(
          [keyPart, jspm_packages$github$mairatma$core$es6$structs$WildcardTrie$$WildcardTrie.TOKEN_SKIP_SINGLE]
        );
      }

      return matchingChildren;
    };

    var jspm_packages$github$mairatma$core$es6$structs$WildcardTrie$$default = jspm_packages$github$mairatma$core$es6$structs$WildcardTrie$$WildcardTrie;
    'use strict';

    /**
     * EventEmitter utility.
     * @constructor
     */
    var jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter = function() {
      this.listenersTree_ = new jspm_packages$github$mairatma$core$es6$structs$WildcardTrie$$default();
    };
    jspm_packages$github$mairatma$core$es6$core$$default.inherits(jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter, jspm_packages$github$mairatma$core$es6$disposable$Disposable$$default);

    /**
     * The delimiter being used for namespaces.
     * @type {string}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.delimiter_ = '.';

    /**
     * Holds event listeners scoped by event type.
     * @type {Trie}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.listenersTree_ = null;

    /**
     * The maximum number of listeners allowed for each event type. If the number
     * becomes higher than the max, a warning will be issued.
     * @type {number}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.maxListeners_ = 10;

    /**
     * The id that will be assigned to the next listener added to this event
     * emitter.
     * @type {number}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.nextId_ = 1;

    /**
     * Configuration option which determines if an event facade should be sent
     * as a param of listeners when emitting events. If set to true, the facade
     * will be passed as the first argument of the listener.
     * @type {boolean}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.shouldUseFacade_ = false;

    /**
     * Adds a listener to the end of the listeners array for the specified events.
     * @param {!(Array|string)} events
     * @param {!Function} listener
     * @return {!EventHandle} Can be used to remove the listener.
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.addListener = function(events, listener) {
      this.validateListener_(listener);

      events = this.normalizeEvents_(events);
      for (var i = 0; i < events.length; i++) {
        this.addSingleListener_(events[i], listener);
      }

      return new jspm_packages$github$mairatma$core$es6$events$EventHandle$$default(this, events, listener);
    };

    /**
     * Adds a listener to the end of the listeners array for a single event.
     * @param {string} event
     * @param {!Function} listener
     * @param {Function=} opt_origin The original function that was added as a
     *   listener, if there is any.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.addSingleListener_ = function(event, listener, opt_origin) {
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
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.compareListenerObjs_ = function(obj1, obj2) {
      return obj1.id - obj2.id;
    };

    /**
     * Disposes of this instance's object references.
     * @override
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.disposeInternal = function() {
      this.listenersTree_.dispose();
      this.listenersTree_ = null;
    };

    /**
     * Execute each of the listeners in order with the supplied arguments.
     * @param {string} event
     * @param {*} opt_args [arg1], [arg2], [...]
     * @return {boolean} Returns true if event had listeners, false otherwise.
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.emit = function(event) {
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
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.getDelimiter = function() {
      return this.delimiter_;
    };

    /**
     * Gets the configuration option which determines if an event facade should
     * be sent as a param of listeners when emitting events. If set to true, the
     * facade will be passed as the first argument of the listener.
     * @return {boolean}
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.getShouldUseFacade = function() {
      return this.shouldUseFacade_;
    };

    /**
     * Returns an array of listeners for the specified event.
     * @param {string} event
     * @return {Array} Array of listeners.
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.listeners = function(event) {
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
     * @return {!EventHandle} Can be used to remove the listener.
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.many = function(events, amount, listener) {
      events = this.normalizeEvents_(events);
      for (var i = 0; i < events.length; i++) {
        this.many_(events[i], amount, listener);
      }

      return new jspm_packages$github$mairatma$core$es6$events$EventHandle$$default(this, events, listener);
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
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.many_ = function(event, amount, listener) {
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
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.matchesListener_ = function(listenerObj, listener) {
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
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.mergeListenerArrays_ = function(arr1, arr2) {
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
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.normalizeEvents_ = function(events) {
      return jspm_packages$github$mairatma$core$es6$core$$default.isString(events) ? [events] : events;
    };

    /**
     * Removes a listener for the specified events.
     * Caution: changes array indices in the listener array behind the listener.
     * @param {!(Array|string)} events
     * @param {!Function} listener
     * @return {!Object} Returns emitter, so calls can be chained.
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.off = function(events, listener) {
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
     * @return {!EventHandle} Can be used to remove the listener.
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.on = jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.addListener;

    /**
     * Adds a one time listener for the events. This listener is invoked only the
     * next time each event is fired, after which it is removed.
     * @param {!(Array|string)} events
     * @param {!Function} listener
     * @return {!EventHandle} Can be used to remove the listener.
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.once = function(events, listener) {
      return this.many(events, 1, listener);
    };

    /**
     * Removes all listeners, or those of the specified events. It's not a good
     * idea to remove listeners that were added elsewhere in the code,
     * especially when it's on an emitter that you didn't create.
     * @param {(Array|string)=} opt_events
     * @return {!Object} Returns emitter, so calls can be chained.
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.removeAllListeners = function(opt_events) {
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
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.removeAllListenersForEvents_ = function(events) {
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
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.removeListener = jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.off;

    /**
     * Removes all listener objects from the given array that match the given
     * listener function.
     * @param {!Array.<Object>} listenerObjects
     * @param {!Function} listener
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.removeMatchingListenerObjs_ = function(listenerObjects, listener) {
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
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.searchListenerTree_ = function(events) {
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
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.setDelimiter = function(delimiter) {
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
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.setMaxListeners = function(max) {
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
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.setShouldUseFacade = function(shouldUseFacade) {
      this.shouldUseFacade_ = shouldUseFacade;
      return this;
    };

    /**
     * Splits the event, using the current delimiter.
     * @param {string} event
     * @return {!Array}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.splitNamespaces_ = function(event) {
      return event.split(this.getDelimiter());
    };

    /**
     * Checks if the given listener is valid, throwing an exception when it's not.
     * @param  {*} listener
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter.prototype.validateListener_ = function(listener) {
      if (!jspm_packages$github$mairatma$core$es6$core$$default.isFunction(listener)) {
        throw new TypeError('Listener must be a function');
      }
    };

    var jspm_packages$github$mairatma$core$es6$events$EventEmitter$$default = jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter;

    'use strict';

    /**
     * Provides a more strict interface for Thenables in terms of
     * http://promisesaplus.com for interop with {@see CancellablePromise}.
     *
     * @interface
     * @extends {IThenable.<TYPE>}
     * @template TYPE
     */
    var jspm_packages$github$mairatma$core$es6$promise$Promise$$Thenable = function() {};

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
     * @return {!CancellablePromise.<RESULT>} A new Promise that will receive the
     *     result of the fulfillment or rejection callback.
     * @template RESULT,THIS
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$Thenable.prototype.then = function() {};


    /**
     * An expando property to indicate that an object implements
     * {@code Thenable}.
     *
     * {@see addImplementation}.
     *
     * @const
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$Thenable.IMPLEMENTED_BY_PROP = '$goog_Thenable';


    /**
     * Marks a given class (constructor) as an implementation of Thenable, so
     * that we can query that fact at runtime. The class must have already
     * implemented the interface.
     * Exports a 'then' method on the constructor prototype, so that the objects
     * also implement the extern {@see Thenable} interface for interop with
     * other Promise implementations.
     * @param {function(new:Thenable,...[?])} ctor The class constructor. The
     *     corresponding class must have already implemented the interface.
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$Thenable.addImplementation = function(ctor) {
      ctor.prototype.then = ctor.prototype.then;
      ctor.prototype.$goog_Thenable = true;
    };


    /**
     * @param {*} object
     * @return {boolean} Whether a given instance implements {@code Thenable}.
     *     The class/superclass of the instance must call {@code addImplementation}.
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$Thenable.isImplementedBy = function(object) {
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
    var jspm_packages$github$mairatma$core$es6$promise$Promise$$partial = function(fn) {
      var args = Array.prototype.slice.call(arguments, 1);
      return function() {
        // Clone the array (with slice()) and append additional arguments
        // to the existing arguments.
        var newArgs = args.slice();
        newArgs.push.apply(newArgs, arguments);
        return fn.apply(this, newArgs);
      };
    };


    var jspm_packages$github$mairatma$core$es6$promise$Promise$$async = {};


    /**
     * Throw an item without interrupting the current execution context.  For
     * example, if processing a group of items in a loop, sometimes it is useful
     * to report an error while still allowing the rest of the batch to be
     * processed.
     * @param {*} exception
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$async.throwException = function(exception) {
      // Each throw needs to be in its own context.
      jspm_packages$github$mairatma$core$es6$promise$Promise$$async.nextTick(function() {
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
    jspm_packages$github$mairatma$core$es6$promise$Promise$$async.run = function(callback, opt_context) {
      if (!jspm_packages$github$mairatma$core$es6$promise$Promise$$async.run.workQueueScheduled_) {
        // Nothing is currently scheduled, schedule it now.
        jspm_packages$github$mairatma$core$es6$promise$Promise$$async.nextTick(jspm_packages$github$mairatma$core$es6$promise$Promise$$async.run.processWorkQueue);
        jspm_packages$github$mairatma$core$es6$promise$Promise$$async.run.workQueueScheduled_ = true;
      }

      jspm_packages$github$mairatma$core$es6$promise$Promise$$async.run.workQueue_.push(
        new jspm_packages$github$mairatma$core$es6$promise$Promise$$async.run.WorkItem_(callback, opt_context));
    };


    /** @private {boolean} */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$async.run.workQueueScheduled_ = false;


    /** @private {!Array.<!async.run.WorkItem_>} */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$async.run.workQueue_ = [];

    /**
     * Run any pending async.run work items. This function is not intended
     * for general use, but for use by entry point handlers to run items ahead of
     * async.nextTick.
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$async.run.processWorkQueue = function() {
      // NOTE: additional work queue items may be pushed while processing.
      while (jspm_packages$github$mairatma$core$es6$promise$Promise$$async.run.workQueue_.length) {
        // Don't let the work queue grow indefinitely.
        var workItems = jspm_packages$github$mairatma$core$es6$promise$Promise$$async.run.workQueue_;
        jspm_packages$github$mairatma$core$es6$promise$Promise$$async.run.workQueue_ = [];
        for (var i = 0; i < workItems.length; i++) {
          var workItem = workItems[i];
          try {
            workItem.fn.call(workItem.scope);
          } catch (e) {
            jspm_packages$github$mairatma$core$es6$promise$Promise$$async.throwException(e);
          }
        }
      }

      // There are no more work items, reset the work queue.
      jspm_packages$github$mairatma$core$es6$promise$Promise$$async.run.workQueueScheduled_ = false;
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
    jspm_packages$github$mairatma$core$es6$promise$Promise$$async.run.WorkItem_ = function(fn, scope) {
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
    jspm_packages$github$mairatma$core$es6$promise$Promise$$async.nextTick = function(callback, opt_context) {
      var cb = callback;
      if (opt_context) {
        cb = jspm_packages$github$mairatma$core$es6$core$$default.bind(callback, opt_context);
      }
      cb = jspm_packages$github$mairatma$core$es6$promise$Promise$$async.nextTick.wrapCallback_(cb);
      // Introduced and currently only supported by IE10.
      if (jspm_packages$github$mairatma$core$es6$core$$default.isFunction(window.setImmediate)) {
        window.setImmediate(cb);
        return;
      }
      // Look for and cache the custom fallback version of setImmediate.
      if (!jspm_packages$github$mairatma$core$es6$promise$Promise$$async.nextTick.setImmediate_) {
        jspm_packages$github$mairatma$core$es6$promise$Promise$$async.nextTick.setImmediate_ = jspm_packages$github$mairatma$core$es6$promise$Promise$$async.nextTick.getSetImmediateEmulator_();
      }
      jspm_packages$github$mairatma$core$es6$promise$Promise$$async.nextTick.setImmediate_(cb);
    };


    /**
     * Cache for the setImmediate implementation.
     * @type {function(function())}
     * @private
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$async.nextTick.setImmediate_ = null;


    /**
     * Determines the best possible implementation to run a function as soon as
     * the JS event loop is idle.
     * @return {function(function())} The "setImmediate" implementation.
     * @private
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$async.nextTick.getSetImmediateEmulator_ = function() {
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
          var onmessage = jspm_packages$github$mairatma$core$es6$core$$default.bind(function(e) {
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
    jspm_packages$github$mairatma$core$es6$promise$Promise$$async.nextTick.wrapCallback_ = function(opt_returnValue) {
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
     * @implements {Thenable.<TYPE>}
     * @template TYPE,RESOLVER_CONTEXT
     */
    var jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise = function(resolver, opt_context) {
      /**
       * The internal state of this Promise. Either PENDING, FULFILLED, REJECTED, or
       * BLOCKED.
       * @private {CancellablePromise.State_}
       */
      this.state_ = jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.PENDING;

      /**
       * The resolved result of the Promise. Immutable once set with either a
       * fulfillment value or rejection reason.
       * @private {*}
       */
      this.result_ = undefined;

      /**
       * For Promises created by calling {@code then()}, the originating parent.
       * @private {CancellablePromise}
       */
      this.parent_ = null;

      /**
       * The list of {@code onFulfilled} and {@code onRejected} callbacks added to
       * this Promise by calls to {@code then()}.
       * @private {Array.<CancellablePromise.CallbackEntry_>}
       */
      this.callbackEntries_ = null;

      /**
       * Whether the Promise is in the queue of Promises to execute.
       * @private {boolean}
       */
      this.executing_ = false;

      if (jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
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
      } else if (jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
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
            self.resolve_(jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.FULFILLED, value);
          }, function(reason) {
            self.resolve_(jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.REJECTED, reason);
          });
      } catch (e) {
        this.resolve_(jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.REJECTED, e);
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
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.UNHANDLED_REJECTION_DELAY = 0;


    /**
     * The possible internal states for a Promise. These states are not directly
     * observable to external callers.
     * @enum {number}
     * @private
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_ = {
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
     *   child: CancellablePromise,
     *   onFulfilled: function(*),
     *   onRejected: function(*)
     * }}
     * @private
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.CallbackEntry_ = null;


    /**
     * @param {(TYPE|Thenable.<TYPE>|Thenable)=} opt_value
     * @return {!CancellablePromise.<TYPE>} A new Promise that is immediately resolved
     *     with the given value.
     * @template TYPE
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.resolve = function(opt_value) {
      return new jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise(function(resolve) {
          resolve(opt_value);
        });
    };


    /**
     * @param {*=} opt_reason
     * @return {!CancellablePromise} A new Promise that is immediately rejected with the
     *     given reason.
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.reject = function(opt_reason) {
      return new jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise(function(resolve, reject) {
          reject(opt_reason);
        });
    };


    /**
     * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
     * @return {!CancellablePromise.<TYPE>} A Promise that receives the result of the
     *     first Promise (or Promise-like) input to complete.
     * @template TYPE
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.race = function(promises) {
      return new jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise(function(resolve, reject) {
          if (!promises.length) {
            resolve(undefined);
          }
          for (var i = 0, promise; (promise = promises[i]); i++) {
            promise.then(resolve, reject);
          }
        });
    };


    /**
     * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
     * @return {!CancellablePromise.<!Array.<TYPE>>} A Promise that receives a list of
     *     every fulfilled value once every input Promise (or Promise-like) is
     *     successfully fulfilled, or is rejected by the first rejection result.
     * @template TYPE
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.all = function(promises) {
      return new jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise(function(resolve, reject) {
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
            promise.then(jspm_packages$github$mairatma$core$es6$promise$Promise$$partial(onFulfill, i), onReject);
          }
        });
    };


    /**
     * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
     * @return {!CancellablePromise.<TYPE>} A Promise that receives the value of
     *     the first input to be fulfilled, or is rejected with a list of every
     *     rejection reason if all inputs are rejected.
     * @template TYPE
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.firstFulfilled = function(promises) {
      return new jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise(function(resolve, reject) {
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
            promise.then(onFulfill, jspm_packages$github$mairatma$core$es6$promise$Promise$$partial(onReject, i));
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
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.prototype.then = function(opt_onFulfilled, opt_onRejected, opt_context) {
      return this.addChildPromise_(
        jspm_packages$github$mairatma$core$es6$core$$default.isFunction(opt_onFulfilled) ? opt_onFulfilled : null,
        jspm_packages$github$mairatma$core$es6$core$$default.isFunction(opt_onRejected) ? opt_onRejected : null,
        opt_context);
    };
    jspm_packages$github$mairatma$core$es6$promise$Promise$$Thenable.addImplementation(jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise);


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
     * @return {!CancellablePromise.<TYPE>} This Promise, for chaining additional calls.
     * @template THIS
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.prototype.thenAlways = function(onResolved, opt_context) {
      var callback = function() {
        try {
          // Ensure that no arguments are passed to onResolved.
          onResolved.call(opt_context);
        } catch (err) {
          jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.handleRejection_.call(null, err);
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
     * @return {!CancellablePromise} A new Promise that will receive the result of the
     *     callback.
     * @template THIS
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.prototype.thenCatch = function(onRejected, opt_context) {
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
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.prototype.cancel = function(opt_message) {
      if (this.state_ === jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.PENDING) {
        jspm_packages$github$mairatma$core$es6$promise$Promise$$async.run(function() {
          var err = new jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.CancellationError(opt_message);
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
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.prototype.cancelInternal_ = function(err) {
      if (this.state_ === jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.PENDING) {
        if (this.parent_) {
          // Cancel the Promise and remove it from the parent's child list.
          this.parent_.cancelChild_(this, err);
        } else {
          this.resolve_(jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.REJECTED, err);
        }
      }
    };


    /**
     * Cancels a child Promise from the list of callback entries. If the Promise has
     * not already been resolved, reject it with a cancel error. If there are no
     * other children in the list of callback entries, propagate the cancellation
     * by canceling this Promise as well.
     *
     * @param {!CancellablePromise} childPromise The Promise to cancel.
     * @param {!Error} err The cancel error to use for rejecting the Promise.
     * @private
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.prototype.cancelChild_ = function(childPromise, err) {
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
        if (this.state_ === jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.PENDING && childCount === 1) {
          this.cancelInternal_(err);
        } else {
          var callbackEntry = this.callbackEntries_.splice(childIndex, 1)[0];
          this.executeCallback_(
            callbackEntry, jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.REJECTED, err);
        }
      }
    };


    /**
     * Adds a callback entry to the current Promise, and schedules callback
     * execution if the Promise has already been resolved.
     *
     * @param {CancellablePromise.CallbackEntry_} callbackEntry Record containing
     *     {@code onFulfilled} and {@code onRejected} callbacks to execute after
     *     the Promise is resolved.
     * @private
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.prototype.addCallbackEntry_ = function(callbackEntry) {
      if ((!this.callbackEntries_ || !this.callbackEntries_.length) &&
        (this.state_ === jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.FULFILLED ||
        this.state_ === jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.REJECTED)) {
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
     *          (RESULT|CancellablePromise.<RESULT>|Thenable)} onFulfilled A callback that
     *     will be invoked if the Promise is fullfilled, or null.
     * @param {?function(this:THIS, *): *} onRejected A callback that will be
     *     invoked if the Promise is rejected, or null.
     * @param {THIS=} opt_context An optional execution context for the callbacks.
     *     in the default calling context.
     * @return {!CancellablePromise} The child Promise.
     * @template RESULT,THIS
     * @private
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.prototype.addChildPromise_ = function(
    onFulfilled, onRejected, opt_context) {

      var callbackEntry = {
        child: null,
        onFulfilled: null,
        onRejected: null
      };

      callbackEntry.child = new jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise(function(resolve, reject) {
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
            if (!jspm_packages$github$mairatma$core$es6$core$$default.isDef(result) &&
              reason instanceof jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.CancellationError) {
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
        /** @type {CancellablePromise.CallbackEntry_} */ (callbackEntry));
      return callbackEntry.child;
    };


    /**
     * Unblocks the Promise and fulfills it with the given value.
     *
     * @param {TYPE} value
     * @private
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.prototype.unblockAndFulfill_ = function(value) {
      if (this.state_ !== jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.BLOCKED) {
        throw new Error('CancellablePromise is not blocked.');
      }
      this.state_ = jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.PENDING;
      this.resolve_(jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.FULFILLED, value);
    };


    /**
     * Unblocks the Promise and rejects it with the given rejection reason.
     *
     * @param {*} reason
     * @private
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.prototype.unblockAndReject_ = function(reason) {
      if (this.state_ !== jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.BLOCKED) {
        throw new Error('CancellablePromise is not blocked.');
      }
      this.state_ = jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.PENDING;
      this.resolve_(jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.REJECTED, reason);
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
     * @param {CancellablePromise.State_} state
     * @param {*} x The result to apply to the Promise.
     * @private
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.prototype.resolve_ = function(state, x) {
      if (this.state_ !== jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.PENDING) {
        return;
      }

      if (this === x) {
        state = jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.REJECTED;
        x = new TypeError('CancellablePromise cannot resolve to itself');

      } else if (jspm_packages$github$mairatma$core$es6$promise$Promise$$Thenable.isImplementedBy(x)) {
        x = /** @type {!Thenable} */ (x);
        this.state_ = jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.BLOCKED;
        x.then(this.unblockAndFulfill_, this.unblockAndReject_, this);
        return;

      } else if (jspm_packages$github$mairatma$core$es6$core$$default.isObject(x)) {
        try {
          var then = x.then;
          if (jspm_packages$github$mairatma$core$es6$core$$default.isFunction(then)) {
            this.tryThen_(x, then);
            return;
          }
        } catch (e) {
          state = jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.REJECTED;
          x = e;
        }
      }

      this.result_ = x;
      this.state_ = state;
      this.scheduleCallbacks_();

      if (state === jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.REJECTED &&
        !(x instanceof jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.CancellationError)) {
        jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.addUnhandledRejection_(this, x);
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
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.prototype.tryThen_ = function(thenable, then) {
      this.state_ = jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.BLOCKED;
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
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.prototype.scheduleCallbacks_ = function() {
      if (!this.executing_) {
        this.executing_ = true;
        jspm_packages$github$mairatma$core$es6$promise$Promise$$async.run(this.executeCallbacks_, this);
      }
    };


    /**
     * Executes all pending callbacks for this Promise.
     *
     * @private
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.prototype.executeCallbacks_ = function() {
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
     * @param {!CancellablePromise.CallbackEntry_} callbackEntry An entry containing the
     *     onFulfilled and/or onRejected callbacks for this step.
     * @param {CancellablePromise.State_} state The resolution status of the Promise,
     *     either FULFILLED or REJECTED.
     * @param {*} result The resolved result of the Promise.
     * @private
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.prototype.executeCallback_ = function(
    callbackEntry, state, result) {
      if (state === jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.State_.FULFILLED) {
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
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.prototype.removeUnhandledRejection_ = function() {
      var p;
      if (jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
        for (p = this; p && p.unhandledRejectionId_; p = p.parent_) {
          clearTimeout(p.unhandledRejectionId_);
          p.unhandledRejectionId_ = 0;
        }
      } else if (jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
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
     * @param {!CancellablePromise} promise The rejected Promise.
     * @param {*} reason The Promise rejection reason.
     * @private
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.addUnhandledRejection_ = function(promise, reason) {
      if (jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
        promise.unhandledRejectionId_ = setTimeout(function() {
          jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.handleRejection_.call(null, reason);
        }, jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.UNHANDLED_REJECTION_DELAY);

      } else if (jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
        promise.hadUnhandledRejection_ = true;
        jspm_packages$github$mairatma$core$es6$promise$Promise$$async.run(function() {
          if (promise.hadUnhandledRejection_) {
            jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.handleRejection_.call(null, reason);
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
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.handleRejection_ = jspm_packages$github$mairatma$core$es6$promise$Promise$$async.throwException;


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
     *     rejected Promises. Defaults to {@code async.throwException}.
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.setUnhandledRejectionHandler = function(handler) {
      jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.handleRejection_ = handler;
    };



    /**
     * Error used as a rejection reason for canceled Promises.
     *
     * @param {string=} opt_message
     * @constructor
     * @extends {Error}
     * @final
     */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.CancellationError = function(opt_message) {
      jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.CancellationError.base(this, 'constructor', opt_message);

      if (opt_message) {
        this.message = opt_message;
      }
    };
    jspm_packages$github$mairatma$core$es6$core$$default.inherits(jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.CancellationError, Error);


    /** @override */
    jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise.CancellationError.prototype.name = 'cancel';

    'use strict';

    /**
     * Attribute adds support for having object properties that can be watched for
     * changes, as well as configured with validators, setters and other options.
     * See the `addAttr` method for a complete list of available attribute
     * configuration options.
     * @constructor
     */
    var jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute = function(opt_config) {
      jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.base(this, 'constructor');
      this.attrsInfo_ = {};
      this.addAttrsFromStaticHint_(opt_config);
    };
    jspm_packages$github$mairatma$core$es6$core$$default.inherits(jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute, jspm_packages$github$mairatma$core$es6$events$EventEmitter$$default);

    /**
     * Constants that represent the states that an attribute can be in.
     * @type {Object}
     */
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.States = {
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
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.attrsInfo_ = null;

    /**
     * Object with information about the batch event that is currently scheduled, or
     * null if none is.
     * @type {Object}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.scheduledBatchData_ = null;

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
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.addAttr = function(name, config, initialValue) {
      this.assertValidAttrName_(name);

      this.attrsInfo_[name] = {
        config: config || {},
        initialValue: initialValue,
        state: jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.States.UNINITIALIZED
      };

      Object.defineProperty(this, name, {
        configurable: true,
        get: jspm_packages$github$mairatma$core$es6$core$$default.bind(this.getAttrValue_, this, name),
        set: jspm_packages$github$mairatma$core$es6$core$$default.bind(this.setAttrValue_, this, name)
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
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.addAttrs = function(configs, initialValues) {
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
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.addAttrsFromStaticHint_ = function(config) {
      jspm_packages$github$mairatma$core$es6$core$$default.mergeSuperClassesProperty(this.constructor, 'ATTRS', this.mergeAttrs_);
      this.addAttrs(this.constructor.ATTRS_MERGED, config);
    };

    /**
     * Checks that the given name is a valid attribute name. If it's not, an error
     * will be thrown.
     * @param {string} name The name to be validated.
     * @throws {Error}
     */
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.assertValidAttrName_ = function(name) {
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
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.canWrite_ = function(name) {
      this.initAttr_(name);

      var info = this.attrsInfo_[name];
      return !info.config.initOnly || info.state !== jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.States.INITIALIZED;
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
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.callFunction_ = function(fn) {
      var args = Array.prototype.slice.call(arguments, 1);

      if (jspm_packages$github$mairatma$core$es6$core$$default.isString(fn)) {
        return this[fn].apply(this, args);
      } else if (jspm_packages$github$mairatma$core$es6$core$$default.isFunction(fn)) {
        return fn.apply(this, args);
      }
    };

    /**
     * Calls the attribute's setter, if there is one.
     * @param {string} name The name of the attribute.
     * @param {*} value The value to be set.
     * @return {*} The final value to be set.
     */
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.callSetter_ = function(name, value) {
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
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.callValidator_ = function(name, value) {
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
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.disposeInternal = function() {
      this.attrsInfo_ = null;
      this.scheduledBatchData_ = null;
    };

    /**
     * Emits the attribute change batch event.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.emitBatchEvent_ = function() {
      var data = this.scheduledBatchData_;
      this.scheduledBatchData_ = null;
      this.emit('attrsChanged', data);
    };

    /**
     * Returns an object that maps all attribute names to their values.
     * @return {Object.<string, *>}
     */
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.getAttrs = function() {
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
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.getAttrValue_ = function(name) {
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
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.informChange_ = function(name, prevVal) {
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
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.initAttr_ = function(name) {
      var info = this.attrsInfo_[name];
      if (info.state !== jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.States.UNINITIALIZED) {
        return;
      }

      info.state = jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.States.INITIALIZING;
      this.setInitialValue_(name);
      if (!info.written) {
        info.state = jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.States.INITIALIZING_DEFAULT;
        this.setDefaultValue_(name);
      }
      info.state = jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.States.INITIALIZED;
    };

    /**
     * Merges an array of values for the ATTRS property into a single object.
     * @param {!Array} values The values to be merged.
     * @return {!Object} The merged value.
     */
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.mergeAttrs_ = function(values) {
      return jspm_packages$github$mairatma$core$es6$object$object$$default.mixin.apply(null, [{}].concat(values.reverse()));
    };

    /**
     * Removes the requested attribute.
     * @param {string} name The name of the attribute.
     */
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.removeAttr = function(name) {
      this.attrsInfo_[name] = null;
      delete this[name];
    };

    /**
     * Schedules an attribute change batch event to be emitted asynchronously.
     * @param {!Object} attrChangeData Information about an attribute's update.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.scheduleBatchEvent_ = function(attrChangeData) {
      if (!this.scheduledBatchData_) {
        jspm_packages$github$mairatma$core$es6$promise$Promise$$async.nextTick(this.emitBatchEvent_, this);
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
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.setAttrs = function(values) {
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
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.setAttrValue_ = function(name, value) {
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
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.setDefaultValue_ = function(name) {
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
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.setInitialValue_ = function(name) {
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
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.shouldInformChange_ = function(name, prevVal) {
      var info = this.attrsInfo_[name];
      return (info.state === jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.States.INITIALIZED) &&
      (jspm_packages$github$mairatma$core$es6$core$$default.isObject(prevVal) || prevVal !== this[name]);
    };

    /**
     * Validates the attribute's value, which includes calling the validator defined
     * in the attribute's configuration object, if there is one.
     * @param {string} name The name of the attribute.
     * @param {*} value The value to be validated.
     * @return {Boolean} Flag indicating if value is valid or not.
     */
    jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.prototype.validateAttrValue_ = function(name, value) {
      var info = this.attrsInfo_[name];

      return info.state === jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute.States.INITIALIZING_DEFAULT ||
        this.callValidator_(name, value);
    };

    var jspm_packages$github$mairatma$core$es6$attribute$Attribute$$default = jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute;
    'use strict';

    /**
     * EventEmitterProxy utility. It's responsible for linking two EventEmitter
     * instances together, emitting events from the first emitter through the
     * second one. That means that listening to a supported event on the target
     * emitter will mean listening to it on the origin emitter as well.
     * @param {EventEmitter | Element} originEmitter Events originated on this emitter
     *   will be fired for the target emitter's listeners as well. Can be either a real
     *   EventEmitter instance or a DOM element.
     * @param {EventEmitter} targetEmitter Event listeners attached to this emitter
     *   will also be triggered when the event is fired by the origin emitter.
     * @param {Object} opt_blacklist Optional blacklist of events that should not be
     *   proxied.
     * @constructor
     */
    var jspm_packages$github$mairatma$core$es6$events$EventEmitterProxy$$EventEmitterProxy = function(originEmitter, targetEmitter, opt_blacklist) {
      this.originEmitter_ = originEmitter;
      this.targetEmitter_ = targetEmitter;
      this.blacklist_ = opt_blacklist || {};
      this.proxiedEvents_ = {};

      this.startProxy_();
    };
    jspm_packages$github$mairatma$core$es6$core$$default.inherits(jspm_packages$github$mairatma$core$es6$events$EventEmitterProxy$$EventEmitterProxy, jspm_packages$github$mairatma$core$es6$disposable$Disposable$$default);

    /**
     * Map of events that should not be proxied.
     * @type {Object}
     * @default null
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitterProxy$$EventEmitterProxy.prototype.blacklist_ = null;

    /**
     * The origin emitter. This emitter's events will be proxied through the
     * target emitter.
     * @type {EventEmitter}
     * @default null
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitterProxy$$EventEmitterProxy.prototype.originEmitter_ = null;

    /**
     * Holds a map of events from the origin emitter that are already being proxied.
     * @type {Object}
     * @default null
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitterProxy$$EventEmitterProxy.prototype.proxiedEvents_ = null;

    /**
     * The target emitter. This emitter will emit all events that come from
     * the origin emitter.
     * @type {EventEmitter}
     * @default null
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitterProxy$$EventEmitterProxy.prototype.targetEmitter_ = null;

    /**
     * @inheritDoc
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitterProxy$$EventEmitterProxy.prototype.disposeInternal = function() {
      var removeFnName = jspm_packages$github$mairatma$core$es6$core$$default.isElement(this.originEmitter_) ? 'removeEventListener' : 'removeListener';
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
    jspm_packages$github$mairatma$core$es6$events$EventEmitterProxy$$EventEmitterProxy.prototype.proxyEvent_ = function(event) {
      if (!this.shouldProxyEvent_(event)) {
        return;
      }

      var self = this;
      this.proxiedEvents_[event] = function() {
        var args = [event].concat(Array.prototype.slice.call(arguments, 0));
        self.targetEmitter_.emit.apply(self.targetEmitter_, args);
      };

      var addFnName = jspm_packages$github$mairatma$core$es6$core$$default.isElement(this.originEmitter_) ? 'addEventListener' : 'on';
      this.originEmitter_[addFnName](event, this.proxiedEvents_[event]);
    };

    /**
     * Checks if the given event should be proxied.
     * @param {string} event
     * @return {boolean}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitterProxy$$EventEmitterProxy.prototype.shouldProxyEvent_ = function(event) {
      return !this.proxiedEvents_[event] && !this.blacklist_[event] &&
        (!jspm_packages$github$mairatma$core$es6$core$$default.isElement(this.originEmitter_) || jspm_packages$github$mairatma$core$es6$dom$dom$$default.supportsEvent(this.originEmitter_, event));
    };

    /**
     * Starts proxying all events from the origin to the target emitter.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventEmitterProxy$$EventEmitterProxy.prototype.startProxy_ = function() {
      this.targetEmitter_.on('newListener', jspm_packages$github$mairatma$core$es6$core$$default.bind(this.proxyEvent_, this));
    };

    var jspm_packages$github$mairatma$core$es6$events$EventEmitterProxy$$default = jspm_packages$github$mairatma$core$es6$events$EventEmitterProxy$$EventEmitterProxy;
    'use strict';

    /**
     * EventHandler utility. It's useful for easily removing a group of
     * listeners from different EventEmitter instances.
     * @constructor
     */
    var jspm_packages$github$mairatma$core$es6$events$EventHandler$$EventHandler = function() {
      this.eventHandles_ = [];
    };
    jspm_packages$github$mairatma$core$es6$core$$default.inherits(jspm_packages$github$mairatma$core$es6$events$EventHandler$$EventHandler, jspm_packages$github$mairatma$core$es6$disposable$Disposable$$default);

    /**
     * An array that holds the added event handles, so the listeners can be
     * removed later.
     * @type {Array.<EventHandle>}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$events$EventHandler$$EventHandler.prototype.eventHandles_ = null;

    /**
     * Adds event handles to be removed later through the `removeAllListeners`
     * method.
     * @param {...(!EventHandle)} var_args
     */
    jspm_packages$github$mairatma$core$es6$events$EventHandler$$EventHandler.prototype.add = function() {
      for (var i = 0; i < arguments.length; i++) {
        this.eventHandles_.push(arguments[i]);
      }
    };

    /**
     * Disposes of this instance's object references.
     * @override
     */
    jspm_packages$github$mairatma$core$es6$events$EventHandler$$EventHandler.prototype.disposeInternal = function() {
      this.eventHandles_ = null;
    };

    /**
     * Removes all listeners that have been added through the `add` method.
     */
    jspm_packages$github$mairatma$core$es6$events$EventHandler$$EventHandler.prototype.removeAllListeners = function() {
      for (var i = 0; i < this.eventHandles_.length; i++) {
        this.eventHandles_[i].removeListener();
      }

      this.eventHandles_ = [];
    };

    var jspm_packages$github$mairatma$core$es6$events$EventHandler$$default = jspm_packages$github$mairatma$core$es6$events$EventHandler$$EventHandler;
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
     * core.inherits(CustomComponent, Component);
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
    var jspm_packages$github$mairatma$core$es6$component$Component$$Component = function(opt_config) {
      jspm_packages$github$mairatma$core$es6$component$Component$$Component.base(this, 'constructor', opt_config);
      jspm_packages$github$mairatma$core$es6$core$$default.mergeSuperClassesProperty(this.constructor, 'ATTRS_SYNC', this.mergeAttrsSync_);
      jspm_packages$github$mairatma$core$es6$core$$default.mergeSuperClassesProperty(this.constructor, 'ELEMENT_CLASSES', this.mergeElementClasses_);
      jspm_packages$github$mairatma$core$es6$core$$default.mergeSuperClassesProperty(this.constructor, 'ELEMENT_TAG_NAME', jspm_packages$github$mairatma$core$es6$array$array$$default.firstDefinedValue);
      jspm_packages$github$mairatma$core$es6$core$$default.mergeSuperClassesProperty(this.constructor, 'SURFACE_TAG_NAME', jspm_packages$github$mairatma$core$es6$array$array$$default.firstDefinedValue);

      this.elementEventProxy_ = new jspm_packages$github$mairatma$core$es6$events$EventEmitterProxy$$default(this.element, this);
      this.delegateEventHandler_ = new jspm_packages$github$mairatma$core$es6$events$EventHandler$$default();

      this.addSurfacesFromStaticHint_();
      this.created_();
    };
    jspm_packages$github$mairatma$core$es6$core$$default.inherits(jspm_packages$github$mairatma$core$es6$component$Component$$Component, jspm_packages$github$mairatma$core$es6$attribute$Attribute$$default);

    /**
     * Component attributes definition.
     * @type {Object}
     * @static
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.ATTRS = {
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.ATTRS_SYNC = ['elementClasses'];

    /**
     * CSS classes to be applied to the element.
     * @type {Array.<string>}
     * @protected
     * @static
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.ELEMENT_CLASSES = ['component'];

    /**
     * Element tag name is a string that specifies the type of element to be
     * created. The nodeName of the created element is initialized with the
     * value of tag name.
     * @type {string}
     * @default div
     * @protected
     * @static
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.ELEMENT_TAG_NAME = 'div';

    /**
     * Surface tag name is a string that specifies the type of element to be
     * created for the surfaces. The nodeName of the created element is
     * initialized with the value of tag name.
     * @type {string}
     * @default div
     * @protected
     * @static
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.SURFACE_TAG_NAME = 'div';

    /**
     * Cache states for the component.
     * @enum {string}
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.Cache = {
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.Error = {
      /**
       * Error when the component is already rendered and another render attempt
       * is made.
       */
      ALREADY_RENDERED: 'Component already rendered'
    };

    /**
     * Holds events that were listened through the `delegate` Component function.
     * @type {EventHandler}
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.delegateEventHandler_ = null;

    /**
     * Instance of `EventEmitterProxy` which proxies events from the component's
     * element to the component itself.
     * @type {EventEmitterProxy}
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.elementEventProxy_ = null;

    /**
     * Whether the element is in document.
     * @type {Boolean}
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.inDocument = false;

    /**
     * Maps that index the surfaces instances by the surface id.
     * @type {Object}
     * @default null
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.surfaces_ = null;

    /**
     * Registers a surface to the component. Surface elements are not
     * automatically appended to the component element.
     * @param {string} surfaceId The surface id to be registered.
     * @param {Object=} opt_config Optional surface configuration.
     * @chainable
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.addSurface = function(surfaceId, opt_config) {
      this.surfaces_[surfaceId] = opt_config || {
        cacheState: jspm_packages$github$mairatma$core$es6$component$Component$$Component.Cache.NOT_INITIALIZED
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.addSurfaces = function(configs) {
      for (var surfaceId in configs) {
        this.addSurface(surfaceId, configs[surfaceId]);
      }
      return this;
    };

    /**
     * Adds surfaces from super classes static hint.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.addSurfacesFromStaticHint_ = function() {
      jspm_packages$github$mairatma$core$es6$core$$default.mergeSuperClassesProperty(this.constructor, 'SURFACES', this.mergeSurfaces_);
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.attach = function(opt_parentElement, opt_siblingElement) {
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.attached = jspm_packages$github$mairatma$core$es6$core$$default.nullFunction;

    /**
     * Caches surface render attributes into a O(k) flat map representation.
     * Relevant for performance to calculate the surfaces group that were
     * modified by attributes mutation.
     * @param {string} surfaceId The surface id to be cached into the flat map.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.cacheSurfaceRenderAttrs_ = function(surfaceId) {
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.clearSurfacesCache_ = function() {
      for (var surfaceId in this.surfaces_) {
        this.getSurface(surfaceId).cacheState = jspm_packages$github$mairatma$core$es6$component$Component$$Component.Cache.NOT_INITIALIZED;
      }
    };

    /**
     * Computes the cache state for the surface content. If value is string, the
     * cache state is represented by its hashcode.
     * @param {Object} value The value to calculate the cache state.
     * @return {Object} The computed cache state.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.computeSurfaceCacheState_ = function(value) {
      if (jspm_packages$github$mairatma$core$es6$core$$default.isString(value)) {
        return jspm_packages$github$mairatma$core$es6$string$string$$default.hashCode(value);
      }
      return jspm_packages$github$mairatma$core$es6$component$Component$$Component.Cache.NOT_CACHEABLE;
    };

    /**
     * Computes the cache state for the surface content based on the decorated
     * DOM element. The innerHTML of the surface element is read and compressed
     * in order to minimize mismatches caused by breaking spaces or HTML
     * formatting differences that does not affect the content structure.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.computeSurfacesCacheStateFromDom_ = function() {
      for (var surfaceId in this.surfaces_) {
        var surface = this.getSurface(surfaceId);
        surface.cacheState = this.computeSurfaceCacheState_(jspm_packages$github$mairatma$core$es6$html$html$$default.compress(this.getSurfaceElement(surfaceId).innerHTML));
      }
    };

    /**
     * Creates the surface element with its id namespaced to the component id.
     * @param {string} surfaceElementId The id of the element for the surface to be
     *   created.
     * @return {Element} The surface element.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.createSurfaceElement_ = function(surfaceElementId) {
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
     * @return {!DomEventHandle} Can be used to remove the listener.
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.delegate = function(eventName, selector, callback) {
      var handle = jspm_packages$github$mairatma$core$es6$dom$dom$$default.delegate(this.element, eventName, selector, callback);
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.detach = function() {
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.detached = jspm_packages$github$mairatma$core$es6$core$$default.nullFunction;

    /**
     * Lifecycle. Creation phase of the component happens once after the
     * component is instantiated, therefore its the initial phase of the
     * component Lifecycle. Be conscious about actions performed in this phase
     * to not compromise instantiation time with operations that can be
     * postponed to further phases. It's recommended to bind component custom
     * events in this phase, in contrast to DOM events that must be bind on
     * attach phase.
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.created = jspm_packages$github$mairatma$core$es6$core$$default.nullFunction;

    /**
     * Internal implementation for the creation phase of the component.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.created_ = function() {
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.decorate = function() {
      if (this.inDocument) {
        throw new Error(jspm_packages$github$mairatma$core$es6$component$Component$$Component.Error.ALREADY_RENDERED);
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.decorateInternal = jspm_packages$github$mairatma$core$es6$core$$default.nullFunction;

    /**
     * @inheritDoc
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.disposeInternal = function() {
      this.detach();

      this.elementEventProxy_.dispose();
      this.elementEventProxy_ = null;

      this.delegateEventHandler_.removeAllListeners();
      this.delegateEventHandler_ = null;

      this.surfaces_ = null;
      this.surfacesRenderAttrs_ = null;
      jspm_packages$github$mairatma$core$es6$component$Component$$Component.base(this, 'disposeInternal');
    };

    /**
     * Fires attributes synchronization changes for attributes registered on
     * `ATTRS_SYNC` static hint.
     * @param {Object.<string, Object>} changes Object containing the attribute
     *     name as key and an object with newVal and prevVal as value.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.fireAttrsChanges_ = function(changes) {
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.fireAttrChange_ = function(attr, opt_change) {
      var fn = this['sync' + attr.charAt(0).toUpperCase() + attr.slice(1)];
      if (jspm_packages$github$mairatma$core$es6$core$$default.isFunction(fn)) {
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.getModifiedSurfacesFromChanges_ = function(changes) {
      var surfaces = [];
      for (var attr in changes) {
        surfaces.push(this.surfacesRenderAttrs_[attr]);
      }
      return jspm_packages$github$mairatma$core$es6$object$object$$default.mixin.apply(null, surfaces);
    };

    /**
     * Gets surface configuration object. If surface is not registered returns
     * null.
     * @param {string} surfaceId The surface id.
     * @return {?Object} The surface configuration object.
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.getSurface = function(surfaceId) {
      return this.surfaces_[surfaceId] || null;
    };

    /**
     * Gets the content for the requested surface. By default this just calls
     * `getSurfaceContent`, but can be overriden to add more behavior (check
     * `SoyComponent` for an example).
     * @param {string} surfaceId The surface id.
     * @return {Object|string} The content to be rendered.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.getSurfaceContent_ = function(surfaceId) {
      return this.getSurfaceContent(surfaceId);
    };

    /**
     * Gets the content for the requested surface. Should be implemented by subclasses.
     * @param {string} surfaceId The surface id.
     * @return {Object|string} The content to be rendered.
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.getSurfaceContent = jspm_packages$github$mairatma$core$es6$core$$default.nullFunction;

    /**
     * Queries from the document or creates an element for the surface. Surface
     * elements have its surface id namespaced to the component id, e.g. for a
     * component with id `gallery` and a surface with id `pictures` the surface
     * element will be represented by the id `gallery-pictures`. Surface
     * elements must also be appended to the component element.
     * @param {string} surfaceId The surface id.
     * @return {Element} The surface element or null if surface not registered.
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.getSurfaceElement = function(surfaceId) {
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.getSurfaces = function() {
      return this.surfaces_;
    };

    /**
     * Handles attributes batch changes. Responsible for surface mutations and
     * attributes synchronization.
     * @param {Event} event
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.handleAttributesChanges_ = function(event) {
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.makeId_ = function() {
      return 'lfr_c_' + jspm_packages$github$mairatma$core$es6$core$$default.getUid(this);
    };

    /**
     * Makes the id for the surface scoped by the component.
     * @param {string} surfaceId The surface id.
     * @return {string}
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.makeSurfaceId_ = function(surfaceId) {
      return this.id + '-' + surfaceId;
    };

    /**
     * Merges an array of values for the ATTRS_SYNC property into a single object.
     * The final object's keys are the names of the attributes to be synchronized.
     * @param {!Array} values The values to be merged.
     * @return {!Object} The merged value.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.mergeAttrsSync_ = function(values) {
      var merged = {};
      values = jspm_packages$github$mairatma$core$es6$array$array$$default.flatten(values);
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.mergeElementClasses_ = function(values) {
      return jspm_packages$github$mairatma$core$es6$array$array$$default.flatten(values.filter(function(val) {
        return val;
      }));
    };

    /**
     * Merges an array of values for the SURFACES property into a single object.
     * @param {!Array} values The values to be merged.
     * @return {!Object} The merged value.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.mergeSurfaces_ = function(values) {
      return jspm_packages$github$mairatma$core$es6$object$object$$default.mixin.apply(null, [{}].concat(values.reverse()));
    };

    /**
     * Unregisters a surface and removes its element from the DOM.
     * @param {string} surfaceId The surface id.
     * @chainable
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.removeSurface = function(surfaceId) {
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.render = function(opt_parentElement, opt_siblingElement) {
      if (this.inDocument) {
        throw new Error(jspm_packages$github$mairatma$core$es6$component$Component$$Component.Error.ALREADY_RENDERED);
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.renderElement_ = function(opt_parentElement, opt_siblingElement) {
      this.element.id = this.id;
      if (opt_siblingElement || !this.element.parentNode) {
        var parent = jspm_packages$github$mairatma$core$es6$dom$dom$$default.toElement(opt_parentElement) || document.body;
        parent.insertBefore(this.element, jspm_packages$github$mairatma$core$es6$dom$dom$$default.toElement(opt_siblingElement));
      }
    };

    /**
     * Lifecycle. Internal implementation for rendering. Any extra operation
     * necessary to prepare the component DOM must be implemented in this phase.
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.renderInternal = jspm_packages$github$mairatma$core$es6$core$$default.nullFunction;

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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.renderSurfaceContent = function(surfaceId, content) {
      if (jspm_packages$github$mairatma$core$es6$core$$default.isDefAndNotNull(content)) {
        var surface = this.getSurface(surfaceId);
        var cacheState = this.computeSurfaceCacheState_(content);

        if (cacheState === jspm_packages$github$mairatma$core$es6$component$Component$$Component.Cache.NOT_INITIALIZED ||
          cacheState === jspm_packages$github$mairatma$core$es6$component$Component$$Component.Cache.NOT_CACHEABLE ||
          cacheState !== surface.cacheState) {

          var el = this.getSurfaceElement(surfaceId);
          jspm_packages$github$mairatma$core$es6$dom$dom$$default.removeChildren(el);
          jspm_packages$github$mairatma$core$es6$dom$dom$$default.append(el, content);
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.renderSurfacesContent_ = function(surfaces) {
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
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.setterElementFn_ = function(val) {
      return jspm_packages$github$mairatma$core$es6$dom$dom$$default.toElement(val);
    };

    /**
     * Attribute synchronization logic for elementClasses attribute.
     * @param {Array.<string>} newVal
     * @param {Array.<string>} prevVal
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.syncElementClasses = function(newVal, prevVal) {
      var classesToAdd = this.constructor.ELEMENT_CLASSES_MERGED;
      if (newVal) {
        classesToAdd = classesToAdd.concat(newVal);
      }

      jspm_packages$github$mairatma$core$es6$dom$dom$$default.removeClasses(this.element, prevVal || []);
      jspm_packages$github$mairatma$core$es6$dom$dom$$default.addClasses(this.element, classesToAdd);
    };

    /**
     * Validator logic for element attribute.
     * @param {string|Element} val
     * @return {Boolean} True if val is a valid element.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.validatorElementFn_ = function(val) {
      return jspm_packages$github$mairatma$core$es6$core$$default.isElement(val) || jspm_packages$github$mairatma$core$es6$core$$default.isString(val);
    };

    /**
     * Validator logic for elementClasses attribute.
     * @param {Array.<string>} val
     * @return {Boolean} True if val is a valid element classes.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.validatorElementClassesFn_ = function(val) {
      return Array.isArray(val);
    };

    /**
     * Validator logic for id attribute.
     * @param {string} val
     * @return {Boolean} True if val is a valid id.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.validatorIdFn_ = function(val) {
      return jspm_packages$github$mairatma$core$es6$core$$default.isString(val);
    };

    /**
     * Provides the default value for element attribute.
     * @return {Element} The element.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.valueElementFn_ = function() {
      return document.createElement(this.constructor.ELEMENT_TAG_NAME_MERGED);
    };

    /**
     * Provides the default value for id attribute.
     * @return {string} The id.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$Component$$Component.prototype.valueIdFn_ = function() {
      return this.element.id || this.makeId_();
    };

    var jspm_packages$github$mairatma$core$es6$component$Component$$default = jspm_packages$github$mairatma$core$es6$component$Component$$Component;
    'use strict';

    /**
     * Special Component class that handles a better integration between soy templates
     * and the components. It allows for automatic rendering of surfaces that have soy
     * templates defined with their names, skipping the call to `getSurfaceContent`.
     * @param {Object} opt_config An object with the initial values for this component's
     *   attributes.
     * @extends {Component}
     * @constructor
     */
    var jspm_packages$github$mairatma$core$es6$component$SoyComponent$$SoyComponent = function(opt_config) {
      jspm_packages$github$mairatma$core$es6$component$SoyComponent$$SoyComponent.base(this, 'constructor', opt_config);
      jspm_packages$github$mairatma$core$es6$core$$default.mergeSuperClassesProperty(this.constructor, 'TEMPLATES', this.mergeTemplates_);
    };
    jspm_packages$github$mairatma$core$es6$core$$default.inherits(jspm_packages$github$mairatma$core$es6$component$SoyComponent$$SoyComponent, jspm_packages$github$mairatma$core$es6$component$Component$$default);

    /**
     * The soy templates for this component. Templates that have the same
     * name of a registered surface will be used for automatically rendering
     * it.
     * @type {Object<string, !function(Object):Object>}
     * @protected
     * @static
     */
    jspm_packages$github$mairatma$core$es6$component$SoyComponent$$SoyComponent.TEMPLATES = {};

    /**
     * Overrides the default behavior so that this can automatically render
     * the appropriate soy template when one exists.
     * @param {string} surfaceId The surface id.
     * @return {Object|string} The content to be rendered.
     * @protected
     * @override
     */
    jspm_packages$github$mairatma$core$es6$component$SoyComponent$$SoyComponent.prototype.getSurfaceContent_ = function(surfaceId) {
      var surfaceTemplate = this.constructor.TEMPLATES_MERGED[surfaceId];
      if (jspm_packages$github$mairatma$core$es6$core$$default.isFunction(surfaceTemplate)) {
        return surfaceTemplate(this).content;
      } else {
        return jspm_packages$github$mairatma$core$es6$component$SoyComponent$$SoyComponent.base(this, 'getSurfaceContent_', surfaceId);
      }
    };

    /**
     * Merges an array of values for the `TEMPLATES` property into a single object.
     * @param {!Array} values The values to be merged.
     * @return {!Object} The merged value.
     * @protected
     */
    jspm_packages$github$mairatma$core$es6$component$SoyComponent$$SoyComponent.prototype.mergeTemplates_ = function(values) {
      return jspm_packages$github$mairatma$core$es6$object$object$$default.mixin.apply(null, [{}].concat(values.reverse()));
    };

    /**
     * Overrides the behavior of this method to automatically render the element
     * template if it's defined.
     * @override
     */
    jspm_packages$github$mairatma$core$es6$component$SoyComponent$$SoyComponent.prototype.renderInternal = function() {
      var elementTemplate = this.constructor.TEMPLATES_MERGED.element;
      if (jspm_packages$github$mairatma$core$es6$core$$default.isFunction(elementTemplate)) {
        jspm_packages$github$mairatma$core$es6$dom$dom$$default.append(this.element, elementTemplate(this).content);
      }
    };

    var jspm_packages$github$mairatma$core$es6$component$SoyComponent$$default = jspm_packages$github$mairatma$core$es6$component$SoyComponent$$SoyComponent;

    if (typeof jspm_packages$github$alloyui$tooltip$master$tooltip$soy$$templates == 'undefined') { var jspm_packages$github$alloyui$tooltip$master$tooltip$soy$$templates = {}; }


    /**
     * @param {Object.<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @return {!soydata.SanitizedHtml}
     * @suppress {checkTypes}
     */
    jspm_packages$github$alloyui$tooltip$master$tooltip$soy$$templates.element = function(opt_data, opt_ignored) {
      return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="tooltip-arrow"></div><div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-content" class="tooltip-inner"></div>');
    };
    if (goog.DEBUG) {
      jspm_packages$github$alloyui$tooltip$master$tooltip$soy$$templates.element.soyTemplateName = 'templates.element';
    }


    /**
     * @param {Object.<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @return {!soydata.SanitizedHtml}
     * @suppress {checkTypes}
     */
    jspm_packages$github$alloyui$tooltip$master$tooltip$soy$$templates.content = function(opt_data, opt_ignored) {
      return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.content));
    };
    if (goog.DEBUG) {
      jspm_packages$github$alloyui$tooltip$master$tooltip$soy$$templates.content.soyTemplateName = 'templates.content';
    }
    var jspm_packages$github$alloyui$tooltip$master$tooltip$soy$$default = jspm_packages$github$alloyui$tooltip$master$tooltip$soy$$templates;

    function jspm_packages$github$alloyui$tooltip$master$tooltip$$Tooltip(opt_config) {
      jspm_packages$github$alloyui$tooltip$master$tooltip$$Tooltip.base(this, 'constructor', opt_config);
    }
    jspm_packages$github$mairatma$core$es6$core$$default.inherits(jspm_packages$github$alloyui$tooltip$master$tooltip$$Tooltip, jspm_packages$github$mairatma$core$es6$component$SoyComponent$$default);

    jspm_packages$github$alloyui$tooltip$master$tooltip$$Tooltip.ATTRS = {
      content: {
        value: ''
      },
      trigger: {
        setter: 'setterTriggerFn_'
      },
      visible: {
        value: false
      }
    };

    jspm_packages$github$alloyui$tooltip$master$tooltip$$Tooltip.ATTRS_SYNC = ['visible'];

    jspm_packages$github$alloyui$tooltip$master$tooltip$$Tooltip.ELEMENT_CLASSES = ['tooltip', 'right'];

    jspm_packages$github$alloyui$tooltip$master$tooltip$$Tooltip.SURFACES = {
      content: {
        renderAttrs: ['content']
      }
    };

    jspm_packages$github$alloyui$tooltip$master$tooltip$$Tooltip.TEMPLATES = jspm_packages$github$alloyui$tooltip$master$tooltip$soy$$default;

    jspm_packages$github$alloyui$tooltip$master$tooltip$$Tooltip.prototype.attached = function() {
      var self = this;

      this.eventHandler_ = new jspm_packages$github$mairatma$core$es6$events$EventHandler$$default();
      this.eventHandler_.add(
        jspm_packages$github$mairatma$core$es6$dom$dom$$default.on(this.trigger, 'mouseover', jspm_packages$github$mairatma$core$es6$core$$default.bind(this.onTriggerMouseOver_, this)),
        jspm_packages$github$mairatma$core$es6$dom$dom$$default.on(this.trigger, 'mouseout', jspm_packages$github$mairatma$core$es6$core$$default.bind(this.onTriggerMouseOut_, this))
      );
    };

    jspm_packages$github$alloyui$tooltip$master$tooltip$$Tooltip.prototype.dettached = function() {
      this.eventHandler_.removeAllListeners();
    };

    jspm_packages$github$alloyui$tooltip$master$tooltip$$Tooltip.prototype.onTriggerMouseOver_ = function() {
      this.visible = true;

      var rect = this.trigger.getBoundingClientRect();
      this.element.style.left = rect.left + rect.width + 'px';
      this.element.style.top = rect.top + 'px';
    };

    jspm_packages$github$alloyui$tooltip$master$tooltip$$Tooltip.prototype.onTriggerMouseOut_ = function() {
      this.visible = false;
    };

    jspm_packages$github$alloyui$tooltip$master$tooltip$$Tooltip.prototype.setterTriggerFn_ = function(val) {
      return jspm_packages$github$mairatma$core$es6$dom$dom$$default.toElement(val);
    };

    jspm_packages$github$alloyui$tooltip$master$tooltip$$Tooltip.prototype.syncVisible = function() {
      this.element.style.opacity = this.visible ? '1' : '0';
    };

    var jspm_packages$github$alloyui$tooltip$master$tooltip$$default = jspm_packages$github$alloyui$tooltip$master$tooltip$$Tooltip;

    function dist$modal$$Modal(opt_config) {
      dist$modal$$Modal.base(this, 'constructor', opt_config);
    }
    jspm_packages$github$mairatma$core$es6$core$$default.inherits(dist$modal$$Modal, jspm_packages$github$mairatma$core$es6$component$SoyComponent$$default);

    dist$modal$$Modal.ATTRS = {
      bodyContent: {
        value: ''
      },
      elementClasses: {
        value: ['modal']
      },
      footerButtons: {
        valueFn: function() {
          return [];
        }
      },
      headerContent: {
        value: ''
      },
      visible: {
        value: false
      }
    };

    dist$modal$$Modal.ATTRS_SYNC = ['visible'];

    dist$modal$$Modal.SURFACES = {
      body: {
        renderAttrs: ['bodyContent']
      },
      footer: {
        renderAttrs: ['footerButtons']
      },
      header: {
        renderAttrs: ['headerContent']
      }
    };

    dist$modal$$Modal.TEMPLATES = dist$modal$soy$$default;

    dist$modal$$Modal.prototype.attached = function() {
      var instance = this;

      this.delegate('click', '.modal-button', function(event) {
        instance.emit('buttonClicked', {button: event.delegateTarget});
      });

      this.tooltip_ = new jspm_packages$github$alloyui$tooltip$master$tooltip$$default({
        content: 'Modal',
        trigger: this.element.querySelector('.modal-header')
      }).render();
    };

    dist$modal$$Modal.prototype.syncVisible = function() {
      this.element.style.display = this.visible ? 'block' : 'none';
    };

    var dist$modal$$default = dist$modal$$Modal;
    this.alloyui = this.alloyui || {};
    this.alloyui.Modal = dist$modal$$Modal;
    this.alloyui.templates = dist$modal$soy$$templates;
    this.alloyui.core = jspm_packages$github$mairatma$core$es6$core$$core;
    this.alloyui.SoyComponent = jspm_packages$github$mairatma$core$es6$component$SoyComponent$$SoyComponent;
    this.alloyui.Tooltip = jspm_packages$github$alloyui$tooltip$master$tooltip$$Tooltip;
    this.alloyui.dom = jspm_packages$github$mairatma$core$es6$dom$dom$$dom;
    this.alloyui.object = jspm_packages$github$mairatma$core$es6$object$object$$object;
    this.alloyui.Component = jspm_packages$github$mairatma$core$es6$component$Component$$Component;
    this.alloyui.EventHandler = jspm_packages$github$mairatma$core$es6$events$EventHandler$$EventHandler;
    this.alloyui.templates = jspm_packages$github$alloyui$tooltip$master$tooltip$soy$$templates;
    this.alloyui.DomEventHandle = jspm_packages$github$mairatma$core$es6$events$DomEventHandle$$DomEventHandle;
    this.alloyui.array = jspm_packages$github$mairatma$core$es6$array$array$$array;
    this.alloyui.html = jspm_packages$github$mairatma$core$es6$html$html$$html;
    this.alloyui.string = jspm_packages$github$mairatma$core$es6$string$string$$string;
    this.alloyui.Attribute = jspm_packages$github$mairatma$core$es6$attribute$Attribute$$Attribute;
    this.alloyui.EventEmitterProxy = jspm_packages$github$mairatma$core$es6$events$EventEmitterProxy$$EventEmitterProxy;
    this.alloyui.Disposable = jspm_packages$github$mairatma$core$es6$disposable$Disposable$$Disposable;
    this.alloyui.EventHandle = jspm_packages$github$mairatma$core$es6$events$EventHandle$$EventHandle;
    this.alloyui.EventEmitter = jspm_packages$github$mairatma$core$es6$events$EventEmitter$$EventEmitter;
    this.alloyui.CancellablePromise = jspm_packages$github$mairatma$core$es6$promise$Promise$$CancellablePromise;
    this.alloyui.async = jspm_packages$github$mairatma$core$es6$promise$Promise$$async;
    this.alloyui.WildcardTrie = jspm_packages$github$mairatma$core$es6$structs$WildcardTrie$$WildcardTrie;
    this.alloyui.Trie = jspm_packages$github$mairatma$core$es6$structs$Trie$$Trie;
}).call(this);