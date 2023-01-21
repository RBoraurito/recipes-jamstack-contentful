import clsx from 'clsx'

interface ContainerProps {
  children: React.ReactNode
  classNames?: string
}

export const Container = ({ children, classNames }: ContainerProps) => {
  return (
    <div className={clsx('mx-auto max-w-7xl sm:px-6 lg:px-8', classNames)}>
      {children}
    </div>
  )
}
