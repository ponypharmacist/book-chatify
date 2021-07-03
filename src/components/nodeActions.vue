<template lang="pug">

.book-node-actions(:style="`top: ${offsetActions}px`")
  b.book-node-action.text(
    :class="{ active: currentNode.role === 'text'}"
    @click="changeNodeRole(currentNodeIndex, 'text')"
  )

  b.book-node-action.speech(
    :class="{ active: currentNode.role === 'speech'}"
    @click="changeNodeRole(currentNodeIndex, 'speech')"
  )

  b.book-node-action.header(
    :class="{ active: currentNode.role === 'header'}"
    @click="changeNodeRole(currentNodeIndex, 'header')"
  )

  b.book-node-action.remove(
    @click="removeNode(currentNodeIndex)"
  )

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import { BookNode } from '@/models/models'

export default defineComponent({
  name: 'nodeActions',

  computed: {
    ...mapGetters({
      bookNodes: 'book/bookNodes',
      offsetActions: 'book/offsetActions',
      currentNodeIndex: 'book/currentNodeIndex'
    }),

    currentNode(): BookNode {
      return this.bookNodes[this.currentNodeIndex]
    }
  },

  methods: {
    ...mapMutations({
      removeNode: 'book/removeNode',
      changeRole: 'book/changeRole'
    }),

    changeNodeRole(index: number, role: string): void {
      if (this.currentNode.role === role) return
      else this.changeRole({ index, role })
    }
  }
})
</script>

<style scoped lang="sass">
.book-node-actions
  display: flex
  justify-content: flex-end
  position: absolute
  width: calc(#{$node-width} + 120px)
  height: 30px
  left: calc(50% - #{$node-width} / 2)
  transition: top .2s ease

.book-node-action
  display: inline-block
  align-self: center
  width: 30px
  height: 30px
  margin: 0 0 0 6px
  text-align: center
  line-height: 29px
  color: #777
  cursor: pointer

  &:hover
    color: #FF616D

  // Remove node button
  $icon-size: no-repeat 50% 50% / 100% 100%

  &.remove
    margin-left: 16px
    mask: url('~@/assets/icon-trashbin.svg') $icon-size
    background: #FF616D

    &:hover
      background: #000

  // Content types buttons
  &.text
    mask: url('~@/assets/icon-text.svg') $icon-size
    background: #ccc

  &.speech
    mask: url('~@/assets/icon-speech.svg') $icon-size
    background: #ccc

  &.header
    mask: url('~@/assets/icon-h2.svg') $icon-size
    background: #ccc

  &.text,
  &.speech,
  &.header
    &:hover
      background-color: #FF616D

    &.active
      background-color: #666
      cursor: default
</style>
