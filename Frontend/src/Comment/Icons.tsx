import React from 'react'

interface Props {
    Icon: any
    isActive: boolean
    color?: string
    onClick?: any
    disabled?: boolean
    children?: React.ReactNode
}

export default function Icons({Icon, isActive, color, children, ...props}: Props) {
  return (
    <button className = {`iconButton ${color || ''}`} style = {{color: `${isActive? 'hsl(0, 100%, 67%)': 'hsl(235, 100%, 67%)'}`}} {...props}>
        <span style = {{marginRight: `${children != null ? '0.25em' : ""}`}}>
            <Icon/>
        </span>
        {children}
    </button>
  )
}
