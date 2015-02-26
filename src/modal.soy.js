/* jshint ignore:start */
import ComponentRegistry from 'aui/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from modal.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Modal.
 * @hassoydelcall {Component}
 */

if (typeof Templates.Modal == 'undefined') { Templates.Modal = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.element = function(opt_data, opt_ignored) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="modal-dialog"><div class="modal-content"><div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-header" class="modal-header"></div><div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-body" class="modal-body"></div><div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-footer" class="modal-footer"></div></div></div>');
};
if (goog.DEBUG) {
  Templates.Modal.element.soyTemplateName = 'Templates.Modal.element';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.body = function(opt_data, opt_ignored) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<p>' + soy.$$escapeHtml(opt_data.bodyContent) + '</p>');
};
if (goog.DEBUG) {
  Templates.Modal.body.soyTemplateName = 'Templates.Modal.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.header = function(opt_data, opt_ignored) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<h4 class="modal-title">' + soy.$$escapeHtml(opt_data.headerContent) + '</h4>');
};
if (goog.DEBUG) {
  Templates.Modal.header.soyTemplateName = 'Templates.Modal.header';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.footer = function(opt_data, opt_ignored) {
  var output = '';
  var buttonList19 = opt_data.footerButtons;
  var buttonListLen19 = buttonList19.length;
  for (var buttonIndex19 = 0; buttonIndex19 < buttonListLen19; buttonIndex19++) {
    var buttonData19 = buttonList19[buttonIndex19];
    output += soy.$$escapeHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Component'), '', true)({data: buttonData19, name: 'Button', ref: 'button' + buttonIndex19}));
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Modal.footer.soyTemplateName = 'Templates.Modal.footer';
}
/* jshint ignore:end */
