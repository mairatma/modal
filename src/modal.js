'use strict';

import ComponentRegistry from 'aui/component/ComponentRegistry';
import SoyComponent from 'aui/component/SoyComponent';
import Tooltip from 'aui-tooltip/tooltip';

import './modal.soy';
import './button/Button';

class Modal extends SoyComponent {
  constructor(opt_config) {
    super(opt_config);
  }

  attached() {
    var instance = this;
    this.delegate('click', 'button', function(event) {
      instance.emit('buttonClicked', {
        button: event.delegateTarget
      });
    });
    this.tooltip_ = new Tooltip({
      content: 'Modal',
      trigger: this.element.querySelector('.modal-header')
    }).render();
  }

  syncVisible() {
    this.element.style.display = this.visible ? 'block' : 'none';
  }
}

ComponentRegistry.register('Modal', Modal);

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

Modal.TEMPLATES = ComponentRegistry.Templates.Modal;

export default Modal;
