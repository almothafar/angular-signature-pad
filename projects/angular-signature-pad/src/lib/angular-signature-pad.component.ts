import {AfterContentInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import SignaturePad, {Options, PointGroup} from 'signature_pad';

export interface NgSignaturePadOptions extends Options {
  canvasBackground?: string;
  canvasHeight?: number;
  canvasWidth?: number;
}

@Component({
  template: '<canvas class="signature-pad-canvas"></canvas>',
  selector: 'signature-pad',
  styleUrls: ['./angular-signature-pad.component.scss'],
})
export class SignaturePadComponent implements AfterContentInit, OnDestroy {
  @Input() public options: NgSignaturePadOptions;

  @Output() public drawStart: EventEmitter<MouseEvent | Touch>;
  @Output() public drawBeforeUpdate: EventEmitter<MouseEvent | Touch>;
  @Output() public drawAfterUpdate: EventEmitter<MouseEvent | Touch>;
  @Output() public drawEnd: EventEmitter<MouseEvent | Touch>;

  private signaturePad: SignaturePad;
  private extraWidth: number;

  constructor(private _elementRef: ElementRef) {
    this.options = this.options || {} as NgSignaturePadOptions;
    this.drawStart = new EventEmitter<MouseEvent | Touch>();
    this.drawBeforeUpdate = new EventEmitter<MouseEvent | Touch>();
    this.drawAfterUpdate = new EventEmitter<MouseEvent | Touch>();
    this.drawEnd = new EventEmitter<MouseEvent | Touch>();
  }

  public ngAfterContentInit(): void {
    const canvas: HTMLCanvasElement = this.initCanvas(this.options);
    this.initSignaturePad(canvas, this.options);
    this.redrawCanvas();
  }

  public ngOnDestroy(): void {
    const canvas: HTMLCanvasElement = this.getCanvas();
    canvas.width = 0;
    canvas.height = 0;
  }

  // noinspection JSUnusedGlobalSymbols
  public getSignaturePad(): SignaturePad {
    return this.signaturePad;
  }

  public getCanvas(): HTMLCanvasElement {
    return this._elementRef.nativeElement.querySelector('canvas');
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Redraw or Resize canvas, note this will clear data.
   */
  public redrawCanvas(): void {
    const canvas: HTMLCanvasElement = this.getCanvas();
    // when zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1, and only part of the canvas is cleared then.
    const ratio: number = Math.max(window.devicePixelRatio || 1, 1);

    // Use explicit dimensions from options if provided, otherwise calculate from DOM
    const baseWidth = this.options.canvasWidth
      ? this.options.canvasWidth - 2
      : this._getWidthFix(canvas);
    const baseHeight = this.options.canvasHeight
      ? this.options.canvasHeight - 2
      : this._getHeightFix(canvas);

    // Set internal canvas size (scaled for high DPI)
    canvas.width = baseWidth * ratio;
    canvas.height = baseHeight * ratio;

    // Set CSS size to match the base dimensions (without ratio scaling)
    canvas.style.width = baseWidth + 'px';
    canvas.style.height = baseHeight + 'px';

    canvas.getContext('2d').scale(ratio, ratio);
    this.changeBackgroundColor(this.signaturePad.backgroundColor);
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Change the color of the background dynamically.
   */
  public changeBackgroundColor(color: string): void {
    this.signaturePad.backgroundColor = color;
    const data = this.signaturePad.toData();
    this.signaturePad.clear();
    this.signaturePad.fromData(data);
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Returns signature image as an array of point groups
   */
  public toData(): PointGroup[] {
    if (this.signaturePad) {
      return this.signaturePad.toData();
    } else {
      return [];
    }
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Draws signature image from an array of point groups
   */
  public fromData(points: Array<PointGroup>): void {
    this.signaturePad.fromData(points);
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible parameters)
   */
  public toDataURL(imageType?: string, quality?: number): string {
    return this.signaturePad.toDataURL(imageType, quality); // save image as data URL
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Draws signature image from data URL
   */
  public fromDataURL(dataURL: string, options: { ratio?: number; width?: number; height?: number } = {}): Promise<void> {
    // set default height and width on read data from URL
    if (!options.hasOwnProperty('height') && this.options.canvasHeight) {
      options.height = this.options.canvasHeight;
    }
    if (!options.hasOwnProperty('width') && this.options.canvasWidth) {
      options.width = this.options.canvasWidth;
    }
    return this.signaturePad.fromDataURL(dataURL, options);
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Clears the canvas
   */
  public clear(redraw: boolean = true): void {
    if (redraw) {
      this.signaturePad.clear();
      this.redrawCanvas();
    } else {
      this.signaturePad.clear();
    }
    this.endStroke(null);
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Returns true if canvas is empty, otherwise returns false
   */
  public isEmpty(): boolean {
    return this.signaturePad.isEmpty();
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Unbinds all event handlers
   */
  public off(): void {
    this.signaturePad.off();
  }

  /**
   * Rebinds all event handlers
   */
  public on(): void {
    this.signaturePad.on();
  }

  /**
   * set an option on the signaturePad - e.g. set('minWidth', 50);
   * @param option one of SignaturePad to set with value, properties of NgSignaturePadOptions
   * @param value the value of option
   */
  public set(option: string, value: any): void {
    if (option === 'canvasHeight' || option === 'canvasWidth') {
      // Check if the value is the same in options
      if (this.options[option] === value) {
        // Same value, no need to change and redraw
        return;
      }
      // Update the options so redrawCanvas will use the new value
      this.options[option] = value;
      this.clear();
    } else {
      if (this.signaturePad[option] === value) {
        // Same value, no need to change and redraw
        return;
      }
      this.signaturePad[option] = value;
    }
  }

  /**
   * notify subscribers on signature begin
   */
  public beginStroke(event: MouseEvent | Touch): void {
    this.drawStart.emit(event);
  }

  public beforeUpdateStroke(event: MouseEvent | Touch): void {
    this.drawBeforeUpdate.emit(event);
  }

  public afterUpdateStroke(event: MouseEvent | Touch): void {
    this.drawAfterUpdate.emit(event);
  }

  /**
   * notify subscribers on signature end
   */
  public endStroke(event: MouseEvent | Touch): void {
    this.drawEnd.emit(event);
  }

  private initCanvas(options: NgSignaturePadOptions): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = this.getCanvas();
    if (this.options.canvasHeight) {
      canvas.height = options.canvasHeight - 2;
    }
    if (this.options.canvasWidth) {
      canvas.width = options.canvasWidth - 2;
    }
    if (this.options.canvasBackground) {
      canvas.style.background = options.canvasBackground;
    }
    return canvas;
  }

  private initSignaturePad(canvas: HTMLCanvasElement, options?: Options): void {
    this.signaturePad = new SignaturePad(canvas, options);
    this.signaturePad.addEventListener('beginStroke', (event: CustomEvent) => this.beginStroke(event.detail));
    this.signaturePad.addEventListener('beforeUpdateStroke', (event: CustomEvent) => this.beforeUpdateStroke(event.detail));
    this.signaturePad.addEventListener('afterUpdateStroke', (event: CustomEvent) => this.afterUpdateStroke(event.detail));
    this.signaturePad.addEventListener('endStroke', (event: CustomEvent) => this.endStroke(event.detail));
  }

  /**
   * To prevent the growing effect when the redrawCanvas is called for the width
   * @param canvas
   * @private
   */
  private _getWidthFix(canvas: HTMLCanvasElement) {
    const computedStyle = getComputedStyle(canvas);

    const extraPadding = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
    const extraBorder = parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth);
    this.extraWidth = extraPadding + extraBorder;
    return canvas.offsetWidth - (extraPadding + extraBorder);
  }

  /**
   * To prevent the growing effect when the redrawCanvas is called for the height
   * @param canvas
   * @private
   */
  private _getHeightFix(canvas: HTMLCanvasElement) {
    const computedStyle = getComputedStyle(canvas);

    const extraPadding = parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
    const extraBorder = parseFloat(computedStyle.borderTopWidth) + parseFloat(computedStyle.borderBottomWidth);

    return canvas.offsetHeight - (extraPadding + extraBorder);
  }
}
