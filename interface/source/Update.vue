<template lang="pug">
    div#update
        p( class='status-text' ) {{ $root.status === 0 ? 'Проверяю на обновления' : 'Скачиваю обновления' }}
        img( class='prelaoder' src='img/preloader.gif' )
</template>

<script>
import { remote, ipcRenderer } from 'electron'

var self;

export default {
    mounted: function () {
        self = this;
    }
}

ipcRenderer.on('status', function (status) {
    self.$root.status = status;
    self.$forceUpdate();
});
</script>


<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&subset=cyrillic-ext')

@import '~style/fonts'
@import '~style/base'
@import '~style/palette'

#update
    align-items center
    background $wetasphalt
    display flex
    flex-direction column
    justify-content center
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    -webkit-app-region drag

    .status-text
        color $cloud
        font-size 18px
        font-weight 300
        margin 24px 0

    .prelaoder
        height 12px
</style>
