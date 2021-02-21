import { Fragment } from 'react'
import CONFIG from '../../n3xt.config'
/**
 * A component that relies on build time asset optimisation.
 * You can generate your images based on a built HTML.
 */
const Image = ({ src, alt, height, width, sizes, className }) => {
  return (
    <picture data-sizes={sizes} className={`block ${className}`}>
      {/* Generated based on types */}
      {process.env.NEXT_PUBLIC_DEV !== 'true' && (
        <Fragment>
          {CONFIG.images.types.length &&
            CONFIG.images.types.map((type) => {
              let SRC_STRING = []
              for (const size of sizes) {
                const DIMENSION = parseInt(size.replace(/\([^)]*\)\s?/gm, ''), 10)
                SRC_STRING.push(`/enhanced${src.substring(0, src.lastIndexOf('.'))}_${DIMENSION}.${type} ${DIMENSION}w`)
              }
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
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
      />
    </picture>
  )
}
// <img alt={alt} src={src} sizes={sizes} width={width} />

export default Image
