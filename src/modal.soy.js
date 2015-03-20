/* jshint ignore:start */
import ComponentRegistry from 'aui/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from modal.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Modal.
 * @hassoydeltemplate {ComponentElement}
 * @hassoydeltemplate {ComponentTemplate}
 * @hassoydeltemplate {Modal}
 * @hassoydeltemplate {Modal.body}
 * @hassoydeltemplate {Modal.footer}
 * @hassoydeltemplate {Modal.header}
 * @hassoydelcall {Button}
 * @hassoydelcall {Component}
 * @hassoydelcall {ComponentElement}
 * @hassoydelcall {Modal}
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
Templates.Modal.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="modal-dialog"><div class="modal-content">' + soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal.header'), '', true)(opt_data, null, opt_ijData) + soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal.body'), '', true)(opt_data, null, opt_ijData) + soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal.footer'), '', true)(opt_data, null, opt_ijData) + '</div></div>' + soy.$$escapeHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Tooltip'), '', true)({content: 'Modal', id: opt_data.id + '-tooltip'}, null, opt_ijData)));
};
if (goog.DEBUG) {
  Templates.Modal.content.soyTemplateName = 'Templates.Modal.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.body = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<p>' + soy.$$escapeHtml(opt_data.bodyContent) + '</p>');
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
Templates.Modal.__deltemplate_s15_65c2d4d4 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-body" class="modal-body">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>');
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s15_65c2d4d4.soyTemplateName = 'Templates.Modal.__deltemplate_s15_65c2d4d4';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal.body'), 'element', 0, Templates.Modal.__deltemplate_s15_65c2d4d4);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.header = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="modal-header" data-onmouseover="handleMouseOver" data-onmouseout="handleMouseOut"><h4 class="modal-title">' + soy.$$escapeHtml(opt_data.headerContent) + '</h4></div>');
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
  var output = '<div class="modal-footer" data-onclick="handleButtonClick">';
  var param27 = '';
  var buttonList28 = opt_data.footerButtons;
  var buttonListLen28 = buttonList28.length;
  for (var buttonIndex28 = 0; buttonIndex28 < buttonListLen28; buttonIndex28++) {
    var buttonData28 = buttonList28[buttonIndex28];
    param27 += soy.$$getDelegateFn(soy.$$getDelTemplateId('Button'), '', true)(soy.$$augmentMap(buttonData28, {id: opt_data.id + '-button' + buttonIndex28}), null, opt_ijData);
  }
  output += soy.$$getDelegateFn(soy.$$getDelTemplateId('Toolbar'), '', true)({children: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(param27), id: opt_data.id + '-toolbar'}, null, opt_ijData);
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
Templates.Modal.__deltemplate_s35_45b138fb = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Component'), '', true)(soy.$$augmentMap(opt_data, {componentName: 'Modal'}), null, opt_ijData)));
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s35_45b138fb.soyTemplateName = 'Templates.Modal.__deltemplate_s35_45b138fb';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal'), '', 0, Templates.Modal.__deltemplate_s35_45b138fb);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s38_29e4e741 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('ComponentElement'), 'Modal', true)(soy.$$augmentMap(opt_data, {elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Modal.content(opt_data, null, opt_ijData))}), null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s38_29e4e741.soyTemplateName = 'Templates.Modal.__deltemplate_s38_29e4e741';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('ComponentTemplate'), 'Modal', 0, Templates.Modal.__deltemplate_s38_29e4e741);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s42_df8ef55a = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="modal' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '" data-component="">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>');
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s42_df8ef55a.soyTemplateName = 'Templates.Modal.__deltemplate_s42_df8ef55a';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal'), 'element', 0, Templates.Modal.__deltemplate_s42_df8ef55a);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s50_31c78f9d = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal'), 'element', true)(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s50_31c78f9d.soyTemplateName = 'Templates.Modal.__deltemplate_s50_31c78f9d';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('ComponentElement'), 'Modal', 0, Templates.Modal.__deltemplate_s50_31c78f9d);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s52_90747620 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal.body'), 'element', true)(soy.$$augmentMap(opt_data, {elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + ((! opt_ijData.skipSurfaceContents) ? Templates.Modal.body(opt_data, null, opt_ijData) : ''))}), null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s52_90747620.soyTemplateName = 'Templates.Modal.__deltemplate_s52_90747620';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal.body'), '', 0, Templates.Modal.__deltemplate_s52_90747620);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s58_499dc9aa = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-header">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>');
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s58_499dc9aa.soyTemplateName = 'Templates.Modal.__deltemplate_s58_499dc9aa';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal.header'), 'element', 0, Templates.Modal.__deltemplate_s58_499dc9aa);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s64_b8354b7d = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal.header'), 'element', true)(soy.$$augmentMap(opt_data, {elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + ((! opt_ijData.skipSurfaceContents) ? Templates.Modal.header(opt_data, null, opt_ijData) : ''))}), null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s64_b8354b7d.soyTemplateName = 'Templates.Modal.__deltemplate_s64_b8354b7d';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal.header'), '', 0, Templates.Modal.__deltemplate_s64_b8354b7d);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s70_c9897a65 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-footer">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>');
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s70_c9897a65.soyTemplateName = 'Templates.Modal.__deltemplate_s70_c9897a65';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal.footer'), 'element', 0, Templates.Modal.__deltemplate_s70_c9897a65);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s76_231e36e7 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal.footer'), 'element', true)(soy.$$augmentMap(opt_data, {elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + ((! opt_ijData.skipSurfaceContents) ? Templates.Modal.footer(opt_data, null, opt_ijData) : ''))}), null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s76_231e36e7.soyTemplateName = 'Templates.Modal.__deltemplate_s76_231e36e7';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal.footer'), '', 0, Templates.Modal.__deltemplate_s76_231e36e7);

Templates.Modal.content.params = ["id"];
Templates.Modal.body.params = ["bodyContent"];
Templates.Modal.header.params = ["headerContent"];
Templates.Modal.footer.params = ["footerButtons","id"];
/* jshint ignore:end */
