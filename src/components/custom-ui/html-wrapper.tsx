import { Fragment } from 'react'

interface HTMLWrapperProps {
  children: string | undefined
}
export function HTMLWrapper({ children }: HTMLWrapperProps) {
  return (
    <Fragment>
      {children?.split(/\r\n|\n/).map((line, index) => (
        <Fragment key={index}>
          {line}
          <br />
        </Fragment>
      )) || ''}
    </Fragment>
  )
}
