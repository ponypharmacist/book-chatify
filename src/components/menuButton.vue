<template lang="pug">

.menu-button
  slot Button

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'menuButton',

  props: {
    icon: {
      type: String,
      required: false,
      default: null
    }
  }
})
</script>

<style scoped lang="sass">
.menu-button
  padding: 8px 22px
  font-size: 18px
  line-height: 28px
  color: #333
  border-radius: 12px
  background-color: rgba(255, 255, 255, 0.15)
  cursor: pointer
  user-select: none
  transition: all .25s cubic-bezier(.77,0,.175,1)

  &:hover
    background-color: rgba(255, 255, 255, 0.35)
</style>
