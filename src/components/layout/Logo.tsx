const OFFICIAL_LOGO_SRC = '/img/Mahmoud Osama Logo.svg'

interface LogoProps {
  size?: number
  className?: string
  variant?: 'full' | 'minimal'
}

type LogoImageProps = {
  size: number
  className?: string
}

function LogoImage({ size, className }: LogoImageProps) {
  return (
    <img
      src={OFFICIAL_LOGO_SRC}
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

export default function Logo({ size = 40, className = '', variant = 'full' }: LogoProps) {
  if (variant === 'minimal') {
    return <LogoMinimal size={size} className={className} />
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoImage size={size} />
    </div>
  )
}

export function LogoMinimal({ size = 32, className = '' }: { size?: number; className?: string }) {
  return <LogoImage size={size} className={className} />
}

export function LogoIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return <LogoImage size={size} className={className} />
}
