import {Component, ContentChildren, forwardRef, ViewChild, ContentChild, Renderer, ElementRef, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

import {Button} from '../button/button';
import {Form} from '../../util/form';
import {Icon} from '../icon/icon';
import {Label} from '../label/label';


@Component({
  selector: 'ion-list-header,ion-item,[ion-item]',
  template:
    '<ng-content select="[item-left],ion-checkbox:not([item-right])"></ng-content>' +
    '<div class="item-inner">' +
      '<div class="input-wrapper">' +
        '<ng-content select="ion-label"></ng-content>' +
        '<ion-label *ngIf="_viewLabel">' +
          '<ng-content></ng-content>' +
        '</ion-label>' +
        '<ng-content select="ion-select,ion-input,ion-textarea,ion-datetime,ion-range,[item-content]"></ng-content>' +
      '</div>' +
      '<ng-content select="[item-right],ion-radio,ion-toggle"></ng-content>' +
    '</div>' +
    '<ion-button-effect></ion-button-effect>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Item {
  private _ids: number = -1;
  private _inputs: Array<string> = [];
  private _label: Label;
  private _viewLabel: boolean = true;

  /**
   * @private
   */
  id: string;

  /**
   * @private
   */
  labelId: string = null;

  constructor(form: Form, private _renderer: Renderer, private _elementRef: ElementRef) {
    this.id = form.nextId().toString();
  }

  /**
   * @private
   */
  registerInput(type: string) {
    this._inputs.push(type);
    return this.id + '-' + (++this._ids);
  }

  /**
   * @private
   */
  ngAfterContentInit() {
    if (this._viewLabel && this._inputs.length) {
      let labelText = this.getLabelText().trim();
      this._viewLabel = (labelText.length > 0);
    }

    if (this._inputs.length > 1) {
      this.setCssClass('item-multiple-inputs', true);
    }
  }

  /**
   * @private
   */
  setCssClass(cssClass: string, shouldAdd: boolean) {
    this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, shouldAdd);
  }

  /**
   * @private
   */
  setCssStyle(property: string, value: string) {
    this._renderer.setElementStyle(this._elementRef.nativeElement, property, value);
  }

  /**
   * @private
   */
  getLabelText(): string {
    return this._label ? this._label.text : '';
  }

  /**
   * @private
   */
  @ContentChild(Label)
  private set contentLabel(label: Label) {
    if (label) {
      this._label = label;
      this.labelId = label.id = ('lbl-' + this.id);
      if (label.type) {
        this.setCssClass('item-label-' + label.type, true);
      }
      this._viewLabel = false;
    }
  }

  /**
   * @private
   */
  @ViewChild(Label)
  private set viewLabel(label: Label) {
    if (!this._label) {
      this._label = label;
    }
  }

  /**
   * @private
   */
  @ContentChildren(Button)
  private set _buttons(buttons: any) {
    buttons.toArray().forEach((button: any) => {
      // Don't add the item-button class if the user specifies
      // a different size button
      if (!button.isItem && !button._size) {
        button.addClass('item-button');
      }
    });
  }

  /**
   * @private
   */
  @ContentChildren(Icon)
  private set _icons(icons: any) {
    icons.toArray().forEach((icon: any) => {
      icon.addClass('item-icon');
    });
  }
}
