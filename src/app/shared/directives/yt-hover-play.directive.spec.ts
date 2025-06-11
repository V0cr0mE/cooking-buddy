import { ElementRef } from '@angular/core';
import { YtHoverPlayDirective } from './yt-hover-play.directive';

describe('YtHoverPlayDirective', () => {
  it('should create an instance', () => {
    const el = new ElementRef<HTMLIFrameElement>(document.createElement('iframe'));
    const directive = new YtHoverPlayDirective(el);
    expect(directive).toBeTruthy();
  });
});
