import React from 'react'

interface Props {
    Icon: any
    isActive: any
    color?: any
    children?: any
    onClick?: any
}

const button = {
    padding: '.5em 1em', 
    border: 'none', 
    color: 'white', 
    borderRadius: '.5em', 
    fontSize: '.75em', 
    cursor: 'pointer'                     
}

const iconButton = {
    background: 'none',
    padding: '.25',
    display: 'flex',
    alignItems: 'center'
}

export default function Icons({Icon, isActive, color, children, ...props}: Props) {
  return (
    <button className = {`${color || ''}`} style = {{...button, ...iconButton, color: `${isActive? 'hsl(0, 100%, 67%)': 'hsl(235, 100%, 67%)'}`}} {...props}>
        <span style = {{marginRight: `${children != null ? '0.25em' : ""}`}}>
            <Icon/>
        </span>
        {children}
    </button>
  )
}
