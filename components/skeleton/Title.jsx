import PropTypes from '../_util/vue-types'
import { initDefaultProps, getOptionProps } from '../_util/props-util'

export const SkeletonTitleProps = {
  prefixCls: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),

}

const Title = {
  props: initDefaultProps(SkeletonTitleProps, {
    prefixCls: 'ant-skeleton-title',
  }),
  render () {
    const { prefixCls, width } = getOptionProps(this)
    const zWidth = typeof width === 'number' ? `${width}px` : width
    return (
      <h3
        class={prefixCls}
        style={{ width: zWidth }}
      />
    )
  },
}

export default Title
