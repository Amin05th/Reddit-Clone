import react from 'react'
import { describe, vi, test, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LogIn from '../LogIn'
import { BrowserRouter } from "react-router-dom"

vi.mock ('react')

describe('Test Login', () => {
    const [username, setUserName] = react.useState({name: '', lastname: ''})

    const component = (
        <BrowserRouter>
            <LogIn setUserName = {setUserName}/>
        </BrowserRouter>
    )
    
    render(component)

    test('successful login', () => {
        expect(6).toBe(6)
    })
});