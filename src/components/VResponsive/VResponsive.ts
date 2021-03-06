import '../../stylus/components/_responsive.styl'

// Mixins
import Measurable, { NumberOrNumberString } from '../../mixins/measurable'

// Types
import { VNode } from 'vue'

// Utils
import mixins from '../../util/mixins'
import { convertToUnit } from '../../util/helpers'

/* @vue/component */
export default mixins(Measurable).extend({
  name: 'v-responsive',

  props: {
    aspectRatio: [String, Number] as NumberOrNumberString
  },

  computed: {
    computedAspectRatio (): number {
      return Number(this.aspectRatio)
    },
    aspectStyle (): object | undefined {
      return this.computedAspectRatio
        ? { paddingBottom: (1 / this.computedAspectRatio) * 100 + '%' }
        : undefined
    },
    __cachedSizer (): VNode | never[] {
      if (!this.aspectStyle) return []

      return this.$createElement('div', {
        style: this.aspectStyle,
        staticClass: 'v-responsive__sizer'
      })
    }
  },

  methods: {
    genContent (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-responsive__content'
      }, this.$slots.default)
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-responsive',
      style: {
        height: convertToUnit(this.height),
        maxHeight: convertToUnit(this.maxHeight),
        maxWidth: convertToUnit(this.maxWidth),
        width: convertToUnit(this.width)
      },
      on: this.$listeners
    }, [
      this.__cachedSizer,
      this.genContent()
    ])
  }
})
