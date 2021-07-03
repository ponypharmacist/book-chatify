<template lang="pug">

.book-node(
  v-for="node, index in bookNodes"
  :key="`node-${node.id}`"
  :class="`book-node-${node.role}`"
  @mouseenter="hoverNode($event, index)"
)
  .book-node-prefix(
    v-if="node.role === 'speech'"
  ) 👴

  .book-node-content(
    :id="`node-content-${node.id}`"
    contenteditable
    v-html="node.html"
    @blur="updateBookNode($event, index)"
    @keydown.enter.prevent="splitNode(index)"
    @keydown.backspace="onBackspace()"
  )

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default defineComponent({
  name: 'bookNode',

  computed: {
    ...mapGetters({
      bookNodes: 'book/bookNodes',
      currentNodeIndex: 'book/currentNodeIndex'
    })
  },

  methods: {
    ...mapMutations({
      addNode: 'book/addNode',
      updateBookHtml: 'book/updateBookHtml',
      moveActionsPanel: 'book/moveActionsPanel'
    }),

    // eslint-disable-next-line
    hoverNode(event: any, index: number): void {
      this.moveActionsPanel({ offset: event.target.offsetTop + 5, index })
    },

    // eslint-disable-next-line
    updateBookNode(event: any, index: number) {
      this.updateBookHtml({ index, html: event.target.innerHTML.trim() })
    },

    getTimeId(): number {
      return new Date().getTime() - 1624000000000
    },

    async splitNode(index: number) {
      const selectionFrom = window.getSelection()?.anchorOffset
      const selectionTo = window.getSelection()?.focusOffset
      const sourceText = window.getSelection()?.focusNode?.textContent

      // Asses selection index (must be point)
      if (selectionFrom !== selectionTo) return

      // Split content at selection index
      const textBefore = sourceText?.slice(0, selectionFrom)
      const textAfter = sourceText?.slice(selectionFrom, sourceText.length)
      const newBookNode = {
        id: this.getTimeId(),
        html: `${textAfter}`,
        role: 'text'
      }

      // Push two nodes with separate content
      this.updateBookHtml({ index, html: textBefore })
      this.addNode({ index, node: newBookNode })

      // Select zero index of second node
      await this.$nextTick()
      const next = document.getElementById(`node-content-${newBookNode.id}`)

      next?.focus()
    },

    onBackspace() {
      console.log('On Backspace.')
    }
  }
})
</script>

<style scoped lang="sass">
// Book node
.book-node
  position: relative
  margin: 12px 0 0
  padding: 0 40px 0 0

.book-node-content
  position: relative
  z-index: 1
  padding: 8px 12px 8px 12px
  line-height: 24px
  outline: none !important

// Text nodes
.book-node-text
  .book-node-content
    &:hover
      background-color: #e1e1e1

    &:focus
      background-color: #fff


// Speech bubbles
.book-node-speech
  .book-node-content
    display: inline-block
    padding: 8px 12px 8px 12px
    background-color: #efffef
    border-radius: 10px 10px 10px 0

    &:before
      content: ''
      width: 0px
      height: 0px
      position: absolute
      border-left: 5px solid transparent
      border-right: 5px solid #efffef
      border-top: 5px solid transparent
      border-bottom: 5px solid #efffef
      left: -9px
      bottom: 0

  .book-node-prefix
    position: absolute
    left: -38px
    bottom: 0
    width: 30px
    height: 30px
    line-height: 30px
    text-align: center
    border-radius: 50%
    background-color: #fff

// Header
.book-node-header
  .book-node-content
    font-size: 24px
    font-weight: 700
    text-align: center

// Thought
.book-node-thought
  .book-node-content
    position: relative
    background-color: #fff
    border-radius: 30px
    text-align: center

    &:before,
    &:after
      content: ''
      background-color :#fff
      border-radius: 50%
      display: block
      position: absolute
      z-index: 0

    &:before
      width: 44px
      height: 44px
      top: -12px
      left: 28px
      box-shadow: -48px 20px 0 -12px #fff

    &:after
      bottom: -10px
      right: 26px
      width: 30px
      height: 30px
      box-shadow: 40px -34px 0 0 #fff, -28px -6px 0 -2px #fff, -24px 17px 0 -6px #fff, -5px 25px 0 -10px #fff
</style>
