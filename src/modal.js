import core from 'alloyui/core';
import templates from 'alloyui-modal/modal.soy';
import SoyComponent from 'alloyui/component/SoyComponent';
import Tooltip from 'alloyui-tooltip';

function Modal(opt_config) {
  Modal.base(this, 'constructor', opt_config);
}
core.inherits(Modal, SoyComponent);

Modal.ATTRS = {
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

Modal.ATTRS_SYNC = ['visible'];

Modal.SURFACES = {
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

Modal.TEMPLATES = templates;

Modal.prototype.attached = function() {
  var instance = this;

  this.delegate('click', '.modal-button', function(event) {
    instance.emit('buttonClicked', {button: event.delegateTarget});
  });

  this.tooltip_ = new Tooltip({
    content: 'Modal',
    trigger: this.element.querySelector('.modal-header')
  }).render();
};

Modal.prototype.syncVisible = function() {
  this.element.style.display = this.visible ? 'block' : 'none';
};

export default Modal;
