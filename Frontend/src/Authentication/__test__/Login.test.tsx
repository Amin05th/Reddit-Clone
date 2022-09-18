import { describe, vi, test, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LogIn from '../LogIn'
import { BrowserRouter } from "react-router-dom"

describe('Test Login', () => {
    const component = (
        <BrowserRouter>
            <LogIn setUserName = {setUserName}/>
        </BrowserRouter>
    )
    function setUserName<T>(data: T) {
        return data
    }
    render(component)
    const emailInput = screen.getByPlaceholderText('Email ...')
    const passwordInput = screen.getByPlaceholderText('Password ...')
    const button = screen.getByText('Log In')
    const error = screen.getByTestId('error')


    test('login', () => {
        expect(error.textContent).toBe('')
    })
    test('successful login', () => {
        fireEvent.submit(button)
        expect(error.textContent).toBe('')
    })
});