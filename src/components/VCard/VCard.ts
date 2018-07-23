// Styles
import '../../stylus/components/_cards.styl'

// Components
import { VPaper } from '../VPaper'
import { VResponsive } from '../VResponsive'

// Mixins
import Routable from '../../mixins/routable'

// Helpers
import { convertToUnit } from '../../util/helpers'

// Types
import { VNode } from 'vue'
import mixins from '../../util/mixins'
import { deprecate } from '../../util/console'

/* @vue/component */
export default mixins(
  Routable,
  VPaper
).extend({
  name: 'v-card',

  props: {
    elevation: {
      type: [Number, String],
      default: 1
    },
    flat: Boolean,
    /* @deprecated */
    img: String,
    /* @deprecated */
    raised: Boolean,
    width: [Number, String]
  },

  computed: {
    classes (): object {
      return {
        ...VPaper.options.computed.classes.call(this),
        'v-card': true
      }
    },
    computedElevation (): number | string {
      if (this.raised) {
        deprecate('<v-card raised>', '<v-card elevation="3">', this)

        return 3
      }

      if (this.hover === '' && this.isMouseOver) {
        deprecate('<v-card hover>', '<v-card hover="8">', this)

        return 8
      }

      return this.flat
        ? 0
        : VPaper.options.computed.computedElevation.call(this)
    },
    styles (): object {
      const style: Record<string, any> = {
        ...VResponsive.options.computed.styles.call(this)
      }

      if (this.img) {
        deprecate('<v-card img="...">', 'a nested <v-img>', this)

        style.background = `url("${this.img}") center center / cover no-repeat`
      }

      if (this.width) {
        style.width = convertToUnit(this.width)
      }

      return style
    }
  },

  render (h): VNode {
    const { tag, data } = this.generateRouteLink()

    data.style = this.styles
    data.on = {
      ...data.on,
      ...VPaper.options.computed.listeners.call(this)
    }

    return h(tag, data, [
      this.__cachedSizer,
      this.genContent()
    ])
  }
})