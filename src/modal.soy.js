/* jshint ignore:start */
import ComponentRegistry from 'aui/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from modal.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Modal.
 * @hassoydeltemplate {Modal}
 * @hassoydeltemplate {Modal.body}
 * @hassoydeltemplate {Modal.footer}
 * @hassoydeltemplate {Modal.header}
 * @hassoydelcall {Button}
 * @hassoydelcall {Component}
 * @hassoydelcall {Modal.body}
 * @hassoydelcall {Modal.footer}
 * @hassoydelcall {Modal.header}
 * @hassoydelcall {Toolbar}
 * @hassoydelcall {Tooltip}
 */

if (typeof Templates.Modal == 'undefined') { Templates.Modal = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.element = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="modal-dialog"><div class="modal-content">' + soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal.header'), '', true)(opt_data, null, opt_ijData) + soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal.body'), '', true)(opt_data, null, opt_ijData) + soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal.footer'), '', true)(opt_data, null, opt_ijData) + '</div></div>' + soy.$$escapeHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Tooltip'), '', true)({content: 'Modal', ref: 'tooltip'}, null, opt_ijData)));
};
if (goog.DEBUG) {
  Templates.Modal.element.soyTemplateName = 'Templates.Modal.element';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.body = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="modal-body"><p>' + soy.$$escapeHtml(opt_data.bodyContent) + '</p></div>');
};
if (goog.DEBUG) {
  Templates.Modal.body.soyTemplateName = 'Templates.Modal.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.header = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="modal-header" onmouseover="handleMouseOver" onmouseout="handleMouseOut"><h4 class="modal-title">' + soy.$$escapeHtml(opt_data.headerContent) + '</h4></div>');
};
if (goog.DEBUG) {
  Templates.Modal.header.soyTemplateName = 'Templates.Modal.header';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.footer = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="modal-footer" onclick="handleButtonClick">';
  var param21 = '';
  var buttonList22 = opt_data.footerButtons;
  var buttonListLen22 = buttonList22.length;
  for (var buttonIndex22 = 0; buttonIndex22 < buttonListLen22; buttonIndex22++) {
    var buttonData22 = buttonList22[buttonIndex22];
    param21 += soy.$$getDelegateFn(soy.$$getDelTemplateId('Button'), '', true)(soy.$$augmentMap(buttonData22, {ref: 'button' + buttonIndex22}), null, opt_ijData);
  }
  output += soy.$$getDelegateFn(soy.$$getDelTemplateId('Toolbar'), '', true)({children: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(param21), ref: 'toolbar'}, null, opt_ijData);
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Modal.footer.soyTemplateName = 'Templates.Modal.footer';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s29_45b138fb = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Component'), '', true)(soy.$$augmentMap(opt_data, {componentName: 'Modal'}), null, opt_ijData)));
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s29_45b138fb.soyTemplateName = 'Templates.Modal.__deltemplate_s29_45b138fb';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal'), '', 0, Templates.Modal.__deltemplate_s29_45b138fb);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s32_90747620 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-body">' + ((opt_ijData.renderChildComponents) ? Templates.Modal.body(opt_data, null, opt_ijData) : '') + '</div>');
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s32_90747620.soyTemplateName = 'Templates.Modal.__deltemplate_s32_90747620';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal.body'), '', 0, Templates.Modal.__deltemplate_s32_90747620);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s40_b8354b7d = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-header">' + ((opt_ijData.renderChildComponents) ? Templates.Modal.header(opt_data, null, opt_ijData) : '') + '</div>');
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s40_b8354b7d.soyTemplateName = 'Templates.Modal.__deltemplate_s40_b8354b7d';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal.header'), '', 0, Templates.Modal.__deltemplate_s40_b8354b7d);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s48_231e36e7 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-footer">' + ((opt_ijData.renderChildComponents) ? Templates.Modal.footer(opt_data, null, opt_ijData) : '') + '</div>');
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s48_231e36e7.soyTemplateName = 'Templates.Modal.__deltemplate_s48_231e36e7';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal.footer'), '', 0, Templates.Modal.__deltemplate_s48_231e36e7);

Templates.Modal.body.params = ["bodyContent"];
Templates.Modal.header.params = ["headerContent"];
Templates.Modal.footer.params = ["footerButtons"];
/* jshint ignore:end */
