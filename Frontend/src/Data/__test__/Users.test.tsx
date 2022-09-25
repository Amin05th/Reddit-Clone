import { describe, vi, test, expect } from 'vitest'
import { getAllUsers, getAllUsersPosts } from '../Users'

describe('test', () => { // better description
    const promise = new Promise((res, req) => res(5))
    describe('getAllUsers', () => {
        it('should pass correctly', () => {
            expect(getAllUsers()).toEqual(promise)
        })
    })

    describe('getAllUsersPosts', () => {
        it('should pass correctly', () => {
            expect(getAllUsersPosts('name', 'lastname')).toEqual(promise)
        })
    });

});