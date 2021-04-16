<template>
    <div>
        <button class="btn btn-primary btn-large btn-rounded btn-soft" @click="previousSlide"><i class="fal fa-long-arrow-left"></i></button>
        <button class="btn btn-primary btn-large btn-rounded btn-soft" @click="nextSlide"><i class="fal fa-long-arrow-right"></i></button>

        <div class="slider">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Slider',

        data () {
            return {
                slider: false,
                items: false,
                activeItem: 0,
            }
        },

        props: {
            speed: {
                type: Number,
                default: 10,
            },
        },

        mounted() {
            this.slider = document.querySelector('.slider')
            this.items = this.slider.querySelectorAll('.slider-item')
        },

        methods: {
            previousSlide() {
                this.slideTo( this.activeItem - 1, 'left' );
            },
            nextSlide() {
                this.slideTo( this.activeItem + 1, 'right' );
            },
            slideTo( elementId, direction, speed ) {
                var slider = this.slider
                var element = this.items[ elementId ]

                if( this.items.length <= elementId ) {
                    return false
                }

                if( !document.body.contains( element ) ) {
                    return false
                }

                if( !document.body.contains( slider ) ) {
                    return false
                }

                var scrollTimer = setInterval(function() {
                    if( element.offsetLeft >= slider.scrollLeftMax ) {
                        window.clearInterval( scrollTimer )

                        return false
                    }

                    if( direction == 'left' ) {
                        slider.scrollLeft -= 15

                        if( slider.scrollLeft <= element.offsetLeft ) {
                            slider.scrollLeft = element.offsetLeft

                            window.clearInterval( scrollTimer )
                        }
                    }

                    if( direction == 'right' ) {
                        slider.scrollLeft += 15

                        if( slider.scrollLeft >= element.offsetLeft ) {
                            slider.scrollLeft = element.offsetLeft

                            window.clearInterval( scrollTimer )
                        }
                    }
                }, this.speed);

                if( !( element.offsetLeft >= slider.scrollLeftMax ) ) {
                    this.activeItem = elementId
                }
            },
        },
    }
</script>
