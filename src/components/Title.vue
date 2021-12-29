<template>
    <h1 :class="{ 'text-xl': type === 'subheading', 'text-3xl': type !== 'subheading' }" class="font-semibold mb-1">
        <slot />
    </h1>
</template>

<script>
export default {
    props: [ 'type' ]
}
</script>
