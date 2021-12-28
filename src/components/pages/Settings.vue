<template>
    <Title>{{ $t('sidebar.settings') }}</Title>

    <Input label="CCU IP" placeholder="192.168.178.2" />
</template>

<script>
import Title from '../Title.vue'
import Input from '../Input.vue'

export default {
    components: { Title, Input }
}
</script>
