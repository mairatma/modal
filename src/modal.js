'use strict';

import dom from 'aui/dom/dom';
import ComponentRegistry from 'aui/component/ComponentRegistry';
import SoyComponent from 'aui/soy/SoyComponent';

import './modal.soy';
import './button/Button';
import './toolbar/Toolbar';
import 'aui-tooltip/tooltip';

class Modal extends SoyComponent {
  constructor(opt_config) {
    super(opt_config);
  }

  handleButtonClick() {
    var target = event.target;
    if (dom.match(target, 'button')) {
      this.emit('buttonClicked', {
        button: target
      });
    }
  }

  handleMouseOver() {
    this.components[this.id + '-tooltip'].trigger = this.getSurfaceElement('header');
    this.components[this.id + '-tooltip'].visible = true;
  }

  handleMouseOut() {
    this.components[this.id + '-tooltip'].visible = false;
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
    value: 'modal'
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

export default Modal;
