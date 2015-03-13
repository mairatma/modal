/* jshint ignore:start */
import ComponentRegistry from 'aui/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from button.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Button.
 * @hassoydeltemplate {Button}
 * @hassoydeltemplate {ComponentElement}
 * @hassoydeltemplate {ComponentTemplate}
 * @hassoydelcall {Component}
 * @hassoydelcall {ComponentElement}
 */

if (typeof Templates.Button == 'undefined') { Templates.Button = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Button.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.label));
};
if (goog.DEBUG) {
  Templates.Button.content.soyTemplateName = 'Templates.Button.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Button.contentElement = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<button id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="btn ' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? opt_data.elementClasses : '') + '" data-component>' + ((opt_data.elementContent) ? soy.$$escapeHtml(opt_data.elementContent) : '') + '</button>');
};
if (goog.DEBUG) {
  Templates.Button.contentElement.soyTemplateName = 'Templates.Button.contentElement';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Button.__deltemplate_s91_e4ba703e = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Component'), '', true)(soy.$$augmentMap(opt_data, {componentName: 'Button'}), null, opt_ijData)));
};
if (goog.DEBUG) {
  Templates.Button.__deltemplate_s91_e4ba703e.soyTemplateName = 'Templates.Button.__deltemplate_s91_e4ba703e';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Button'), '', 0, Templates.Button.__deltemplate_s91_e4ba703e);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Button.__deltemplate_s94_ab5d3c02 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('ComponentElement'), 'Button', true)(soy.$$augmentMap(opt_data, {elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Button.content(opt_data, null, opt_ijData))}), null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Button.__deltemplate_s94_ab5d3c02.soyTemplateName = 'Templates.Button.__deltemplate_s94_ab5d3c02';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('ComponentTemplate'), 'Button', 0, Templates.Button.__deltemplate_s94_ab5d3c02);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Button.__deltemplate_s98_cebdcd27 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(Templates.Button.contentElement(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Button.__deltemplate_s98_cebdcd27.soyTemplateName = 'Templates.Button.__deltemplate_s98_cebdcd27';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('ComponentElement'), 'Button', 0, Templates.Button.__deltemplate_s98_cebdcd27);

Templates.Button.content.params = ["label"];
Templates.Button.contentElement.params = ["id"];
/* jshint ignore:end */
