'use client'

export function CustomEmoji({ name, size = 20, alt }) {
  return (
    <img 
      src={`/assets/emoji/${name}.png`}
      alt={alt || name}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        imageRendering: 'pixelated',
        display: 'inline-block',
        verticalAlign: 'middle',
        margin: '0 2px'
      }}
    />
  )
}
