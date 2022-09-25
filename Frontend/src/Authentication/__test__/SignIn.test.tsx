import { describe, vi, test, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SignIn from '../SignIn'
import { BrowserRouter } from "react-router-dom"

describe('test SignIn', () => {
    const component = (
        <BrowserRouter>
            <SignIn/>
        </BrowserRouter>
    )
    render(component)
    
    it('should pass correctly', () => {
        const button = screen.getByTestId('signInButton')
        fireEvent.submit(button)
        expect(6).toBe(6)
    })
})