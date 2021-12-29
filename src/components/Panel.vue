<template>
    <div class="rounded bg-white shadow border-2" :class="panelStyles">
        <slot />
    </div>
</template>

<script>
export default {
    props: [ 'type' ],
    computed: {
        panelStyles () {
            return {
                'px-5 py-4': this.type !== 'small',
                'px-3 py-2': this.type === 'small'
            }
        }
    }
}
</script>
