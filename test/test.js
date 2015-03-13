'use strict';

import dom from 'aui/dom/dom';
import Modal from '../src/modal';

var modal;

describe('Modal', function() {
  afterEach(function() {
    if (modal) {
      modal.dispose();
    }
  });

  describe('Rendering', function() {
    it('should render requested header content', function() {
      modal = new Modal({
        headerContent: 'My Title'
      }).render();

      var header = modal.element.querySelector('.modal-header').textContent;
      assert.strictEqual('My Title', header);
    });

    it('should render requested body content', function() {
      modal = new Modal({
        bodyContent: 'My Body'
      }).render();

      var body = modal.element.querySelector('.modal-body').textContent;
      assert.strictEqual('My Body', body);
    });

    it('should render requested footer buttons', function() {
      modal = new Modal({
        footerButtons: [
          {
            elementClasses: 'btn-default',
            label: 'Cancel'
          },
          {
            elementClasses: 'btn-primary',
            label: 'OK'
          }
        ]
      }).render();

      var buttons = modal.element.querySelectorAll('.modal-footer button');
      assert.strictEqual(2, buttons.length);
      assert.strictEqual('Cancel', buttons[0].textContent);
      assert.ok(dom.hasClass(buttons[0], 'btn'));
      assert.ok(dom.hasClass(buttons[0], 'btn-default'));
      assert.strictEqual('OK', buttons[1].textContent);
      assert.ok(dom.hasClass(buttons[1], 'btn'));
      assert.ok(dom.hasClass(buttons[1], 'btn-primary'));
    });
  });

  describe('Visibility', function() {
    it('should be hidden by default', function() {
      modal = new Modal().render();

      assert.strictEqual('none', modal.element.style.display);
    });

    it('should be visible when requested', function() {
      modal = new Modal({
        visible: true
      }).render();

      assert.strictEqual('block', modal.element.style.display);
    });

    it('should be hidden/shown when "visible" attribute changes', function(done) {
      modal = new Modal().render();

      assert.strictEqual('none', modal.element.style.display);

      modal.once('attrsChanged', function() {
        assert.strictEqual('block', modal.element.style.display);
        modal.once('attrsChanged', function() {
          assert.strictEqual('none', modal.element.style.display);
          done();
        });
        modal.visible = false;
      });
      modal.visible = true;
    });
  });

  describe('Clicking Button', function() {
    it('should emit "buttonClicked" event when a button is clicked', function(done) {
      modal = new Modal({
        footerButtons: [
          {
            class: 'btn btn-primary',
            label: 'Ok'
          }
        ]
      }).render();

      var button = modal.element.querySelector('.modal-footer button');
      modal.on('buttonClicked', function(event) {
        assert.strictEqual(button, event.button);
        done();
      });
      dom.triggerEvent(button, 'click');
    });
  });
});
