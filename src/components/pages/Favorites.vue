<template>
    <Title>{{ $t('sidebar.favorites') }}</Title>

    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
        <a v-on:click="selectFavorite(favorite)" class="cursor-pointer block group" v-for="favorite in favorites" :key="favorite.iseId">
            <Panel class="group-hover:text-primary group-hover:border-primary" :class="{ 'text-primary': currentFavorite === favorite.iseId, 'border-primary': currentFavorite === favorite.iseId }">
                <h3 class="font-semibold">{{ favorite.name }}</h3>
            </Panel>
        </a>
    </div>

    <div v-if="currentFavoriteChannels.length > 0" class="mt-12">
        <Title type="subheading">
            {{ $t('favorites.channels') }}
            <span class="text-gray-400 text-sm">{{ $t('favorites.inFunction', { favorite: currentFavoriteName }) }}</span>
        </Title>
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
            <ChannelTile v-for="channel in currentFavoriteChannels" :key="channel.iseId" :channel="channel" />
        </div>
    </div>
</template>

<script>
import Title from '../Title.vue'
import Panel from '../Panel.vue'
import ChannelTile from '../ChannelTile.vue'
import xmlapi from '../../xmlapi/api.js'
import i18n from '../../assets/i18n';
const { t } = i18n.global

export default {
    components: { Title, Panel, ChannelTile },
    data () {
        return {
            currentFavorite: null,
            favorites: []
        }
    },
    created () {
        this.favorites = xmlapi.favorites().then(favorites => {
            this.favorites = favorites
            if (this.favorites.length > 0) {
                this.selectFavorite(this.favorites[0])
            }
        });
    },
    computed: {
        currentFavoriteName () {
            const currentFav = this.favorites.find(favorite => favorite.iseId === this.currentFavorite);
            return currentFav ? currentFav.name : t('general.unknown');
        },
        currentFavoriteChannels () {
            if (this.currentFavorite === null) {
                return [];
            }

            const favorite = this.favorites.find(favorite => favorite.iseId === this.currentFavorite);
            return favorite ? favorite.channels : [];
        }
    },
    methods: {
        selectFavorite (favorite) {
            this.currentFavorite = favorite.iseId;
        }
    }
}
</script>
