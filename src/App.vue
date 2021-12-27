<template>
    <main class="bg-white h-screen flex">
        <Sidebar />
        <div class="p-3 xs:p-4 lg:p-5 xl:p-8 min-h-[100vh] flex flex-col justify-between">
            <div class="border border-red-500">
                content
            </div>
            <Footer />
        </div>
    </main>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'

export default {
    components: { Sidebar, Footer }
}
</script>
