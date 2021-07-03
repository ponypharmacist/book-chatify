<template lang="pug">

.app-wrapper
  .app-menu
    menu-button(@click="") 📗 Upload Text
    menu-button(@click="") 👩‍👧 Characters
    menu-button(@click="") 🍌 Emojifyer
    menu-button(@click="") 🛠️ Settings

  // Nodes
  .book-nodes-stream
    h1.book-title(
      contenteditable
    ) Title

    book-node

    node-actions

    // ToDo: date, image

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
import menuButton from '@/components/menuButton.vue'
import bookNode from '@/components/bookNode.vue'
import nodeActions from '@/components/nodeActions.vue'
// import { debounce } from '@/common/helpers'

export default defineComponent({
  name: 'Main',

  components: {
    menuButton,
    bookNode,
    nodeActions
  },

  created() {
    this.parseTxtToArray()
  },

  methods: {
    ...mapMutations({
      parseTxtToArray: 'book/parseTxtToArray'
    })
  }
})
</script>

<style scoped lang="sass">
// Book side
.book-nodes-stream
  display: flex
  flex-direction: column
  align-content: flex-start
  width: $node-width
  margin: 12px auto

// App Menu
.app-menu
  display: flex
  justify-content: center
  margin: 40px 0 40px

  .menu-button
    margin: 0 16px

// Book Title
.book-title
  font-size: 24px
  line-height: 32px
  font-weight: 700
  text-align: center
</style>
