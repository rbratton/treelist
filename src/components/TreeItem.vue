<template>
  <div :style="{ 'border-bottom': depth ? 0 : '1px solid #BBB' }">
    <div
      class="tree-item-row"
      @click="toggle"
      :class="{ grey: depth % 2 }"
      :style="{ 'padding-left': 16 + (depth * 32) + 'px' }"
    >
      <div>
        <font-awesome-icon :icon="icon"></font-awesome-icon>
      </div>
      <div class="tree-info">
        <font-awesome-icon icon="clock"></font-awesome-icon>
        <span>{{ timespan }}</span>
      </div>
      <div v-if="interaction.name" class="tree-info">
        <font-awesome-icon icon="user"></font-awesome-icon>
        <span>{{ interaction.name }}</span>
      </div>
      <div v-if="interaction.organisation" class="tree-info">
        <font-awesome-icon icon="users"></font-awesome-icon>
        <span>{{ interaction.organisation }}</span>
      </div>
      <div class="tree-info">
        <font-awesome-icon icon="info-circle"></font-awesome-icon>
        <span>{{ interaction.status }}</span>
      </div>
      <div>
        <font-awesome-icon v-if="interaction.children.length" :icon="caret"></font-awesome-icon>
      </div>
    </div>
    <transition-group name="slide" v-if="interaction.children.length">
      <tree-item v-for="child in interaction.children" :key="child.id" :interaction="child" v-show="open" :depth="depth + 1"></tree-item>
    </transition-group>
  </div>
</template>

<script>
const types = {
  email: 'envelope',
  voice: 'phone'
}

export default {
  name: 'TreeItem',
  data () {
    return {
      open: false
    }
  },
  props: {
    interaction: {
      type: Object,
      required: true
    },
    depth: {
      type: Number,
      required: true
    }
  },
  computed: {
    icon () {
      return types[this.interaction.type]
    },
    timespan () {
      if (this.interaction.end) {
        return `${new Date(this.interaction.start).toLocaleString()} - ${new Date(this.interaction.end).toLocaleString()}`
      }
      return new Date(this.interaction.start).toLocaleString()
    },
    caret () {
      return this.open ? 'caret-up' : 'caret-down'
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-item-row {
  display: flex;
  flex-direction: row;
  color: #000A;
  padding: 1rem;
  cursor: pointer;

  div {
    &:not(:last-child) {
      margin-right: 1rem;
    }

    &:last-child {
      flex: 1;
      text-align: right;
    }
  }

  .tree-info {
    :first-child {
      margin-right: 0.5rem;
    }
  }

  &.grey {
    background: #EFEFEF;
  }
}
.slide {
  &-enter {
    opacity: 0;
    max-height: 0;

    &-to {
      opacity: 1;
      max-height: 100%;
    }
  }
  &-leave {
    opacity: 1;
    max-height: 100%;

    &-to {
      opacity: 0;
      max-height: 0;
    }
  }
  &-enter-active, &-leave-active {
    transition: all 250ms ease-in-out;
  }
}
</style>
