import classNames from 'classnames'
import PropTypes from '../_util/vue-types'
import { initDefaultProps, getOptionProps, hasProp } from '../_util/props-util'
import Avatar from './Avatar'
import Title from './Title'
import Paragraph from './Paragraph'

export const SkeletonProps = {
  active: PropTypes.bool,
  loading: PropTypes.bool,
  prefixCls: PropTypes.string,
  children: PropTypes.any,
  avatar: PropTypes.any,
  title: PropTypes.any,
  paragraph: PropTypes.any,
}

function getComponentProps (prop) {
  if (prop && typeof prop === 'object') {
    return prop
  }
  return {}
}

function getAvatarBasicProps (hasTitle, hasParagraph) {
  if (hasTitle && !hasParagraph) {
    return { shape: 'square' }
  }

  return { shape: 'circle' }
}

function getTitleBasicProps (hasAvatar, hasParagraph) {
  if (!hasAvatar && hasParagraph) {
    return { width: '38%' }
  }

  if (hasAvatar && hasParagraph) {
    return { width: '50%' }
  }

  return {}
}

function getParagraphBasicProps (hasAvatar, hasTitle) {
  const basicProps = {}

  // Width
  if (!hasAvatar || !hasTitle) {
    basicProps.width = '61%'
  }

  // Rows
  if (!hasAvatar && hasTitle) {
    basicProps.rows = 3
  } else {
    basicProps.rows = 2
  }

  return basicProps
}

const Skeleton = {
  name: 'ASkeleton',
  props: initDefaultProps(SkeletonProps, {
    prefixCls: 'ant-skeleton',
    avatar: false,
    title: true,
    paragraph: true,
  }),
  render () {
    const {
      loading, prefixCls,
      avatar, title, paragraph, active,
    } = getOptionProps(this)

    if (loading || !hasProp(this, 'loading')) {
      const hasAvatar = !!avatar
      const hasTitle = !!title
      const hasParagraph = !!paragraph

      // Avatar
      let avatarNode
      if (hasAvatar) {
        const avatarProps = {
          props: {
            ...getAvatarBasicProps(hasTitle, hasParagraph),
            ...getComponentProps(avatar),
          },
        }

        avatarNode = (
          <div class={`${prefixCls}-header`}>
            <Avatar {...avatarProps} />
          </div>
        )
      }

      let contentNode
      if (hasTitle || hasParagraph) {
        // Title
        let $title
        if (hasTitle) {
          const titleProps = {
            props: {
              ...getTitleBasicProps(hasAvatar, hasParagraph),
              ...getComponentProps(title),
            },
          }

          $title = (
            <Title {...titleProps} />
          )
        }

        // Paragraph
        let paragraphNode
        if (hasParagraph) {
          const paragraphProps = {
            props: {
              ...getParagraphBasicProps(hasAvatar, hasTitle),
              ...getComponentProps(paragraph),
            },
          }

          paragraphNode = (
            <Paragraph {...paragraphProps} />
          )
        }

        contentNode = (
          <div class={`${prefixCls}-content`}>
            {$title}
            {paragraphNode}
          </div>
        )
      }

      const cls = classNames(
        prefixCls, {
          [`${prefixCls}-with-avatar`]: hasAvatar,
          [`${prefixCls}-active`]: active,
        },
      )

      return (
        <div class={cls}>
          {avatarNode}
          {contentNode}
        </div>
      )
    }

    return this.$slots.default
  },
}
/* istanbul ignore next */
Skeleton.install = function (Vue) {
  Vue.component(Skeleton.name, Skeleton)
}
export default Skeleton
