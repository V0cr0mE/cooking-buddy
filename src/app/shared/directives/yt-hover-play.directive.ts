import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'iframe[appYTHoverPlay]',
  standalone: true
})
export class YtHoverPlayDirective {
  constructor(private readonly el: ElementRef<HTMLIFrameElement>) {}

  @HostListener('mouseenter')
  play(): void {
    this.postMessage('playVideo');
  }

  @HostListener('mouseleave')
  pause(): void {
    this.postMessage('pauseVideo');
  }

  private postMessage(command: string): void {
    this.el.nativeElement.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: command, args: [] }),
      '*'
    );
  }
}
