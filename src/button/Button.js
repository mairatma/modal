'use strict';

import core from 'aui/core';
import ComponentRegistry from 'aui/component/ComponentRegistry';
import SoyComponent from 'aui/soy/SoyComponent';

class Button extends SoyComponent {
  constructor(opt_config) {
  	super(opt_config);
  }

  syncLabel() {
  	this.element.innerHTML = this.label;
  }
}
ComponentRegistry.register('Button', Button);

Button.ATTRS = {
  label: {
    value: ''
  }
};

Button.ELEMENT_CLASSES = ['btn'];

Button.ELEMENT_TAG_NAME = 'button';

export default Button;
