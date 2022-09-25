import { describe, vi, test, expect } from 'vitest'
import { createComment, updateComment, deleteComment, toggleLikeComment } from '../comment'


describe('test SignIn', () => {
    describe('test createComment', () => {
        it('should pass correctly', () => {
            const promise = new Promise((res, req) => res(5))
            expect(createComment('postId', 'message', 'parentId')).toEqual(promise)
        })
    })

    describe('test updateComment', () => {
        it('should pass correctly', () => {
            const promise = new Promise((res, rej) => res(5))
            expect(updateComment('postId', 'message', 'commentid')).toEqual(promise)
        })
    })

    describe('test deleteComment', () => {
        it('should pass correctly', () => {
            const promise = new Promise((res, rej) => res(5))
            expect(deleteComment('postId', 'commentId')).toEqual(promise)
        })
    })

    describe('test toggleLikeComment', () => {
        it('should pass correctly', () => {
            const promise = new Promise((res, rej) => res(5))
            expect(toggleLikeComment('postId', 'commentId')).toEqual(promise)
        })
    })
})