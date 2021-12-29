<template>
    <button :disabled="disabled" :class="buttonStyles" class="transition-colors rounded px-3 py-2 text-sm">
        <slot />
    </button>
</template>

<script>
export default {
    props: [ 'disabled', 'btnstyle' ],
    computed: {
        buttonStyles () {
            return {
                'opacity-50': this.disabled,
                'bg-primary hover:bg-primary-900 text-white': this.btnstyle !== 'secondary',
                'bg-gray-200 hover:bg-gray-300': this.btnstyle === 'secondary',
            }
        }
    }
}
</script>
