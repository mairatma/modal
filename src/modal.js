'use strict';

import templates from './modal.soy';
import SoyComponent from 'aui/component/SoyComponent';
import Tooltip from 'aui-tooltip/tooltip';

class Modal extends SoyComponent {
  constructor(opt_config) {
    super(opt_config);
  }

  attached() {
    var instance = this;
    this.delegate('click', '.modal-button', function(event) {
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

export default Modal;