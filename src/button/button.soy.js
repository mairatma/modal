/* jshint ignore:start */
import ComponentRegistry from 'aui/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from button.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Button.
 * @hassoydeltemplate {Button}
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
Templates.Button.element = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.label));
};
if (goog.DEBUG) {
  Templates.Button.element.soyTemplateName = 'Templates.Button.element';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Button.__deltemplate_s63_e4ba703e = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Component'), '', true)(soy.$$augmentMap(opt_data, {componentName: 'Button'}), null, opt_ijData)));
};
if (goog.DEBUG) {
  Templates.Button.__deltemplate_s63_e4ba703e.soyTemplateName = 'Templates.Button.__deltemplate_s63_e4ba703e';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Button'), '', 0, Templates.Button.__deltemplate_s63_e4ba703e);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Button.__deltemplate_s66_ab5d3c02 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('ComponentElement'), 'Button', true)(soy.$$augmentMap(opt_data, {contents: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Button.element(opt_data, null, opt_ijData))}), null, opt_ijData)));
};
if (goog.DEBUG) {
  Templates.Button.__deltemplate_s66_ab5d3c02.soyTemplateName = 'Templates.Button.__deltemplate_s66_ab5d3c02';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('ComponentTemplate'), 'Button', 0, Templates.Button.__deltemplate_s66_ab5d3c02);

Templates.Button.element.params = ["label"];
/* jshint ignore:end */
