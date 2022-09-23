import react from 'react'
import { describe, vi, test, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LogIn from '../LogIn'
import { BrowserRouter } from "react-router-dom"


describe('Test Login', () => {
    let state:any
    const setState = vi.fn()
    const useStateSpy:any = vi.spyOn(react, 'useState')
    useStateSpy.mockImplementation((init:any) => [state,setState])
    const component = (
        <BrowserRouter>
            <LogIn setUser = {setState}/>
        </BrowserRouter>
    )
    render(component)

    test('successful login', () => {
        const button = screen.getByText('Log In')
        fireEvent.submit(button)
        expect(state).toBe(6)
    })
});