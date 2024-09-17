import { AfterContentInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import SignaturePad, { Options, PointGroup } from 'signature_pad';

export interface NgSignaturePadOptions extends Options {
  canvasHeight?: number;
  canvasWidth?: number;

  background?: string;
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

  constructor(private elementRef: ElementRef) {
    this.options = this.options || {} as NgSignaturePadOptions;
    this.drawStart = new EventEmitter<MouseEvent | Touch>();
    this.drawBeforeUpdate = new EventEmitter<MouseEvent | Touch>();
    this.drawAfterUpdate = new EventEmitter<MouseEvent | Touch>();
    this.drawEnd = new EventEmitter<MouseEvent | Touch>();
  }

  public ngAfterContentInit(): void {
    const canvas: HTMLCanvasElement = this.getCanvas();
    if (this.options.canvasHeight) {
      canvas.height = this.options.canvasHeight;
    }

    if (this.options.canvasWidth) {
      canvas.width = this.options.canvasWidth;
    }

    if (this.options.background) {
      canvas.style.background = this.options.background;
    }

    this.signaturePad = new SignaturePad(canvas, this.options);
    this.signaturePad.addEventListener('beginStroke', (event: CustomEvent) => this.beginStroke(event.detail));
    this.signaturePad.addEventListener('beforeUpdateStroke', (event: CustomEvent) => this.beforeUpdateStroke(event.detail));
    this.signaturePad.addEventListener('afterUpdateStroke', (event: CustomEvent) => this.afterUpdateStroke(event.detail));
    this.signaturePad.addEventListener('endStroke', (event: CustomEvent) => this.endStroke(event.detail));
  }

  public ngOnDestroy(): void {
    const canvas: HTMLCanvasElement = this.getCanvas();
    canvas.width = 0;
    canvas.height = 0;
  }

  /**
   * Redraw or Resize canvas, note this will clear data.
   */
  public redrawCanvas(): void {
    const canvas: HTMLCanvasElement = this.getCanvas();
    // when zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1, and only part of the canvas is cleared then.
    const ratio: number = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);
    this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
  }

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

  /**
   * Draws signature image from an array of point groups
   */
  public fromData(points: Array<PointGroup>): void {
    this.signaturePad.fromData(points);
  }

  /**
   * Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible parameters)
   */
  public toDataURL(imageType?: string, quality?: number): string {
    return this.signaturePad.toDataURL(imageType, quality); // save image as data URL
  }

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

  /**
   * Clears the canvas
   */
  public clear(): void {
    this.signaturePad.clear();
  }

  /**
   * Returns true if canvas is empty, otherwise returns false
   */
  public isEmpty(): boolean {
    return this.signaturePad.isEmpty();
  }

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
    const canvas: HTMLCanvasElement = this.getCanvas();
    switch (option) {
      case 'canvasHeight':
        canvas.height = value;
        break;
      case 'canvasWidth':
        canvas.width = value;
        break;
      default:
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

  public getSignaturePad(): SignaturePad {
    return this.signaturePad;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.elementRef.nativeElement.querySelector('canvas');
  }
}
