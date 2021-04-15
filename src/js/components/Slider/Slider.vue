<template>
    <div>
        <button @click="previousSlide">Previous</button>
        <button @click="nextSlide">Next</button>

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
                items: false,
                activeItem: 0,
            }
        },

        mounted() {
            this.slider = document.querySelector('.slider')
            this.items = this.slider.querySelectorAll('.slider-item')
        },

        methods: {
            previousSlide() {
                this.slideTo( this.activeItem - 1 )
            },
            nextSlide() {
                this.slideTo( this.activeItem + 1 )
            },
            slideTo( elementId ) {
                var element = this.items[ elementId ]

                if( !document.body.contains( element ) ) {
                    return false
                }

                this.slider.scrollLeft = element.offsetLeft

                this.activeItem = elementId
            },
        },
    }
</script>
