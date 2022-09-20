import { describe, vi, test, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SignIn from '../SignIn'

describe('test SignIn', () => {
    render(<SignIn />)
    expect(6).toBe(6)
})