<template>
    <li class="hover:bg-gray-200 rounded -mx-3">
        <a href="#" class="px-3 py-1 inline-block">
            <slot />
        </a>
    </li>
</template>

<script>
export default {
    props: [ 'title' ]
}
</script>
