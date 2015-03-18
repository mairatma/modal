/* jshint ignore:start */
import ComponentRegistry from 'aui/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from toolbar.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Toolbar.
 * @hassoydeltemplate {ComponentElement}
 * @hassoydeltemplate {ComponentTemplate}
 * @hassoydeltemplate {Toolbar}
 * @hassoydelcall {Component}
 * @hassoydelcall {ComponentChildren}
 * @hassoydelcall {ComponentElement}
 * @hassoydelcall {Toolbar}
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
Templates.Toolbar.__deltemplate_s115_ef0c27aa = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Component'), '', true)(soy.$$augmentMap(opt_data, {componentName: 'Toolbar'}), null, opt_ijData)));
};
if (goog.DEBUG) {
  Templates.Toolbar.__deltemplate_s115_ef0c27aa.soyTemplateName = 'Templates.Toolbar.__deltemplate_s115_ef0c27aa';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Toolbar'), '', 0, Templates.Toolbar.__deltemplate_s115_ef0c27aa);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Toolbar.__deltemplate_s118_d3e7c2ff = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('ComponentElement'), 'Toolbar', true)(soy.$$augmentMap(opt_data, {elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Toolbar.content(opt_data, null, opt_ijData))}), null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Toolbar.__deltemplate_s118_d3e7c2ff.soyTemplateName = 'Templates.Toolbar.__deltemplate_s118_d3e7c2ff';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('ComponentTemplate'), 'Toolbar', 0, Templates.Toolbar.__deltemplate_s118_d3e7c2ff);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Toolbar.__deltemplate_s122_60a852f1 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="toolbar ' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? opt_data.elementClasses : '') + '" data-component>' + ((opt_data.elementContent) ? soy.$$escapeHtml(opt_data.elementContent) : '') + '</div>');
};
if (goog.DEBUG) {
  Templates.Toolbar.__deltemplate_s122_60a852f1.soyTemplateName = 'Templates.Toolbar.__deltemplate_s122_60a852f1';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Toolbar'), 'element', 0, Templates.Toolbar.__deltemplate_s122_60a852f1);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Toolbar.__deltemplate_s132_3dff4bfb = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Toolbar'), 'element', true)(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Toolbar.__deltemplate_s132_3dff4bfb.soyTemplateName = 'Templates.Toolbar.__deltemplate_s132_3dff4bfb';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('ComponentElement'), 'Toolbar', 0, Templates.Toolbar.__deltemplate_s132_3dff4bfb);

Templates.Toolbar.content.params = ["children","id"];
/* jshint ignore:end */
