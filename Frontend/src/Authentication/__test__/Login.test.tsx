import { describe, vi, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LogIn from '../LogIn'
import { BrowserRouter } from "react-router-dom"

describe('Test Login', () => {
    vi.useFakeTimers()
    const component = (
        <BrowserRouter>
            <LogIn setUserName = {setUserName}/>
        </BrowserRouter>
    )
    function setUserName<T>(data: T) {
        return data
    }
    render(component)
    const error = screen.getByTestId('error')
    const emailInput = screen.getByPlaceholderText('Email ...')
    const passwordInput = screen.getByPlaceholderText('Password ...')
    const button = screen.getByText('Log In')
    console.log(button)

    test('login', () => {
        expect(error.textContent).toBe('')
    })
    test('successful login', () => {
        emailInput.textContent = 'amindhahri@gmail.com'
        passwordInput.textContent = 'amin'
        fireEvent.click(button)
        vi.advanceTimersByTime(10000)
        expect(emailInput.textContent).toBe('amin')
    })
});