'use strict';

import ComponentRegistry from 'aui/component/ComponentRegistry';
import SoyComponent from 'aui/soy/SoyComponent';

import './toolbar.soy';

class Toolbar extends SoyComponent {
  constructor(opt_config) {
  	super(opt_config);
  }
}
ComponentRegistry.register('Toolbar', Toolbar);

Toolbar.TEMPLATES = ComponentRegistry.Templates.Toolbar;

export default Toolbar;
