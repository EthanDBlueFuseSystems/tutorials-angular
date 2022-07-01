import { Directive, OnInit, Renderer2, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})

export class BetterHighlightDirective implements OnInit{
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';

  //can bind to a DOM propery and then on change it will update the host elemenet
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
      // this.renderer.setStyle(this.element.nativeElement, 'background-color', 'blue');
      // this.renderer.setStyle(this.element.nativeElement, 'color', 'white');
      this.backgroundColor = this.defaultColor;
  }
  //DOM event to listen for and then using a handler to run when even is triggered
  @HostListener('mouseenter') mouseOver(eventData: Event){
    // this.renderer.setStyle(this.element.nativeElement, 'background-color', 'blue'); 
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event){
    this.backgroundColor = this.defaultColor;
    // this.renderer.setStyle(this.element.nativeElement, 'background-color', 'transparent'); 
  }

}
