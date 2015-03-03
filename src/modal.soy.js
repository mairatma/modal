/* jshint ignore:start */// This file was automatically generated from modal.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace templates.
 */

if (typeof templates == 'undefined') { var templates = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
templates.element = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="modal-dialog"><div class="modal-content"><div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-header" class="modal-header"></div><div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-body" class="modal-body"></div><div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-footer" class="modal-footer"></div></div></div>');
};
if (goog.DEBUG) {
  templates.element.soyTemplateName = 'templates.element';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
templates.body = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<p>' + soy.$$escapeHtml(opt_data.bodyContent) + '</p>');
};
if (goog.DEBUG) {
  templates.body.soyTemplateName = 'templates.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
templates.header = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<h4 class="modal-title">' + soy.$$escapeHtml(opt_data.headerContent) + '</h4>');
};
if (goog.DEBUG) {
  templates.header.soyTemplateName = 'templates.header';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
templates.footer = function(opt_data, opt_ignored, opt_ijData) {
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
  templates.footer.soyTemplateName = 'templates.footer';
}
export default templates;
/* jshint ignore:end */