<template>
    <li class="hover:bg-gray-200 rounded -mx-3 font-medium">
        <a href="#" class="px-3 py-1 block">
            <slot />
        </a>
    </li>
</template>

<script>
export default {
    props: [ 'title' ]
}
</script>
