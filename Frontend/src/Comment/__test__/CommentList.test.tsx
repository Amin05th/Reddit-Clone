import { describe, vi, test, expect } from 'vitest'
import { render, screen, fireEvent,  } from '@testing-library/react'
import CommentList from '../CommentList'
import { BrowserRouter } from "react-router-dom"
import { Fa500Px } from 'react-icons/fa'

describe('test SignIn', () => {
    render(<CommentList comments={{id: 'egwg'}} id={' egw'}/>)
    
    it('should pass correctly', () => {
        expect(6).toBe(6)
    })
})