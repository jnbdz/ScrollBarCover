/*
---
description: It covers the scrollbar with a slider so it can be styled.

authors:
  - Jean-Nicolas Boulay Desjardins (http://jean-nicolas.name)
  - Garrick Cheung (http://www.twitter.com/garrickcheung)

license:
  - MIT-style license

requires:
 - core/1.3:   '*'
 - more/1.2.4.4 [Slider]
 - ScrollSpy/1.5

provides:
  - ScrollBarCover
...
*/

var ScrollBarCover = new Class({
        
        /* implements */
        Implements: [Events],
        
        /* initialization */
        initialize: function(container, namespace) {
            /* container exists? */
            this.container = document.id(container);

            this.container.setStyles({
                'float': 'left',
                'display': 'inline',
                'overflow': 'auto',
                'margin-right': -20,
                'padding-right': 20
            });
          
            this.containerSize = this.container.getSize();

	    this.sliderContainer = new Element('div', {
                id: namespace + '-scrollbarcover-slider-container',
		'class': 'scrollbarcover-slider-container',
                styles: {
                    'position': 'relative',
                    'width': 16,
                    'z-index': 999,
                    'float': 'right'
                }
            }).grab(new Element('div', {
                'id': namespace + '-scrollbarcover-slider-element',
		'class': 'scrollbarcover-slider-element'
            }).grab(new Element('div', {
                'id': namespace + '-scrollbarcover-slider-knob',
		'class': 'scrollbarcover-slider-knob'
            })));

            new Element('div', {
                id: namespace + '-scrollbarcover-cover-wraper',
		'class': 'scrollbarcover-cover-wraper',
                styles: {
                    width: this.containerSize.x,
                    height: this.containerSize.y
                }
            }).grab(this.sliderContainer.setStyle('height', this.containerSize.y)).wraps(this.container);	

            this.sliderSteps = this.container.getScrollSize().y - this.container.getStyle('height').toInt();

            var slider = new Slider(namespace + '-scrollbarcover-slider-element', namespace + '-scrollbarcover-slider-knob', {
                                mode: 'vertical',
                                steps: this.sliderSteps
                        }).addEvent('change', function(position){
                                this.container.scrollTo(0, position);
                        }.bind(this));

            new ScrollSpy({container: this.container}).addEvent('scroll', function(position){
                slider.set(position.y);
            });

        }
    
    });
