<template>
    <div class="dropdown" :class="{'active': isActive}">
        <span @click="toggleDropdown">
            <slot></slot>
        </span>

        <div class="dropdown-content" :class="directionClass">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Dropdown',

        data () {
            return {
                directionClass: false,
                isActive: false
            }
        },

        props: {
            direction: {
                type: String,
                default: 'center',
            },
            active: {
                type: Boolean,
                default: false,
            },
        },

        created: function() {
            let self = this;

            document.body.addEventListener('click', function(e) {
                // close dropdown when clicked outside
                if (!self.$el.contains(e.target)){
                    self.isActive = false
                }
            })
        },

        mounted() {
            this.isActive = this.active
            this.directionClass = 'dropdown-' + this.direction
        },

        watch: {
            '$route': function( to, from ) {
                this.close()
            },
        },

        methods: {
            toggleDropdown() {
                this.isActive = !this.isActive
            },
            close() {
                this.isActive = false
            },
            open() {
                this.isActive = true
            },
        },
    }
</script>
