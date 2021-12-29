<template>
    <div class="text-center mt-12 max-w-md mx-auto">
        <Title>{{ $t('configure.title') }}</Title>
        <Subtitle>{{ $t('configure.description') }}</Subtitle>
        <Button v-on:click="goToSettings()">{{ $t('sidebar.settings') }}</Button>
    </div>
</template>

<script>
import Title from '../Title.vue'
import Subtitle from '../Subtitle.vue'
import Button from '../Button.vue'

export default {
    components: { Title, Subtitle, Button },
    methods: {
        goToSettings () {
            this.$parent.currentPage = 'settings';
        }
    }
}
</script>
