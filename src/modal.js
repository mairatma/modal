'use strict';

import ComponentRegistry from 'aui/component/ComponentRegistry';
import SoyComponent from 'aui/soy/SoyComponent';
import Tooltip from 'aui-tooltip/tooltip';

import './modal.soy';
import './button/Button';
import './toolbar/Toolbar';

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
  }

  handleMouseOver() {
    this.components.tooltip.trigger = this.getSurfaceElement('header');
    this.components.tooltip.visible = true;
  }

  handleMouseOut() {
    this.components.tooltip.visible = false;
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
