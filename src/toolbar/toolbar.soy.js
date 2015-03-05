/* jshint ignore:start */
import ComponentRegistry from 'aui/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from toolbar.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Toolbar.
 * @hassoydeltemplate {Toolbar}
 * @hassoydelcall {Component}
 * @hassoydelcall {ComponentChildren}
 */

if (typeof Templates.Toolbar == 'undefined') { Templates.Toolbar = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Toolbar.element = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('ComponentChildren'), '', true)(opt_data, null, opt_ijData)));
};
if (goog.DEBUG) {
  Templates.Toolbar.element.soyTemplateName = 'Templates.Toolbar.element';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Toolbar.__deltemplate_s79_ef0c27aa = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Component'), '', true)({children: opt_data.children, data: opt_data.data, name: 'Toolbar', ref: opt_data.ref}, null, opt_ijData)));
};
if (goog.DEBUG) {
  Templates.Toolbar.__deltemplate_s79_ef0c27aa.soyTemplateName = 'Templates.Toolbar.__deltemplate_s79_ef0c27aa';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Toolbar'), '', 0, Templates.Toolbar.__deltemplate_s79_ef0c27aa);
/* jshint ignore:end */
