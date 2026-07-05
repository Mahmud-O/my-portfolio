interface LogoProps {
  size?: number
  className?: string
  variant?: 'full' | 'minimal'
}

export default function Logo({ size = 40, className = '', variant = 'full' }: LogoProps) {
  if (variant === 'minimal') {
    return <LogoMinimal size={size} className={className} />
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/img/Mahmoud Osama Logo.svg"
        alt="Mahmoud Osama"
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          /* Keep the white/dark parts of the logo visible on the glass navbar */
          filter: 'brightness(1)',
        }}
        draggable={false}
      />
    </div>
  )
}

export function LogoMinimal({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src="/img/Mahmoud Osama Logo.svg"
      alt="Mahmoud Osama"
      width={size}
      height={size}
      className={className}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        filter: 'brightness(1)',
      }}
      draggable={false}
    />
  )
}

export function LogoIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src="/img/Mahmoud Osama Logo.svg"
      alt="Mahmoud Osama"
      width={size}
      height={size}
      className={className}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        filter: 'brightness(1)',
      }}
      draggable={false}
    />
  )
}

