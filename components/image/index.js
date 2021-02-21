import { Fragment } from 'react'
import CONFIG from '../../n3xt.config'
/**
 * A component that relies on build time asset optimisation.
 * You can generate your images based on a built HTML.
 */
const Image = ({ src, alt, width, sizes, ...otherProps }) => {
  return (
    <picture {...otherProps} data-widths={width} data-sizes={sizes}>
      {/* Generated based on types */}
      {process.env.NEXT_PUBLIC_DEV !== 'true' && (
        <Fragment>
          {CONFIG.images.types.length &&
            CONFIG.images.types.map((type) => {
              let SRC_STRING = []
              for (const size of width) SRC_STRING.push(`/enhanced${src.substring(0, src.lastIndexOf('.'))}_${size}.${type} ${size}w`)
              return (
                <source
                  type={`image/${type}`}
                  srcSet={SRC_STRING.join(',')}
                  sizes={sizes}
                />
              )
            })}
        </Fragment>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        // {...(process.env.NEXT_PUBLIC_DEV !== 'true' && { width: width[0] })}
      />
    </picture>
  )
}
// <img alt={alt} src={src} sizes={sizes} width={width} />

export default Image
