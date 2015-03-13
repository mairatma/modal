/* jshint ignore:start */
import ComponentRegistry from 'aui/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from toolbar.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Toolbar.
 * @hassoydeltemplate {ComponentTemplate}
 * @hassoydeltemplate {Toolbar}
 * @hassoydelcall {Component}
 * @hassoydelcall {ComponentChildren}
 * @hassoydelcall {ComponentElement}
 */

if (typeof Templates.Toolbar == 'undefined') { Templates.Toolbar = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Toolbar.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('ComponentChildren'), '', true)(opt_data, null, opt_ijData)));
};
if (goog.DEBUG) {
  Templates.Toolbar.content.soyTemplateName = 'Templates.Toolbar.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Toolbar.__deltemplate_s103_ef0c27aa = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Component'), '', true)(soy.$$augmentMap(opt_data, {componentName: 'Toolbar'}), null, opt_ijData)));
};
if (goog.DEBUG) {
  Templates.Toolbar.__deltemplate_s103_ef0c27aa.soyTemplateName = 'Templates.Toolbar.__deltemplate_s103_ef0c27aa';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Toolbar'), '', 0, Templates.Toolbar.__deltemplate_s103_ef0c27aa);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Toolbar.__deltemplate_s106_d3e7c2ff = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('ComponentElement'), 'Toolbar', true)(soy.$$augmentMap(opt_data, {elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Toolbar.content(opt_data, null, opt_ijData))}), null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Toolbar.__deltemplate_s106_d3e7c2ff.soyTemplateName = 'Templates.Toolbar.__deltemplate_s106_d3e7c2ff';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('ComponentTemplate'), 'Toolbar', 0, Templates.Toolbar.__deltemplate_s106_d3e7c2ff);

Templates.Toolbar.content.params = ["children","id"];
/* jshint ignore:end */
