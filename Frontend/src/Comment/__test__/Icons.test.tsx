import { describe, vi, test, expect } from 'vitest'
import { render, screen, fireEvent,  } from '@testing-library/react'
import Icons from '../Icons'
import { BrowserRouter } from "react-router-dom"
import { Fa500Px } from 'react-icons/fa'

describe('test SignIn', () => {
    render(<Icons isActive={false} Icon = {Fa500Px} />)
    
    it('should pass correctly', () => {
        expect(6).toBe(6)
    })
})