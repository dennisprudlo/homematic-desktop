<template>
    <div class="flex flex-col select-none">
        <label for="{{ id }}" v-if="label" class="text-gray-400 font-semibold text-sm mb-1">{{ label }}</label>
        <input :id="id" :disabled="disabled" :placeholder="placeholder" :class="{ 'opacity-50': disabled }" class="outline-none border-2 border-gray-100 focus:border-primary bg-gray-100 rounded px-3 py-2 text-sm placeholder-gray-400" />
        <span v-if="description" class="text-xs text-gray-400 mt-1">{{ description }}</span>
    </div>
</template>

<script>
export default {
    props: [ 'id', 'disabled', 'label', 'placeholder', 'description' ],
}
</script>
