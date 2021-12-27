<template>
    <button :disabled="disabled" :class="{ 'opacity-50': disabled }" class="bg-primary text-white rounded px-3 py-1 text-sm">
        <slot />
    </button>
</template>

<script>
export default {
    props: [ 'disabled' ]
}
</script>
