import { describe, vi, test, expect } from 'vitest'
import { getPostById } from '../Post'

describe('test getPostById', () => {
    const promise = new Promise((res, req) => res(5))
    expect(getPostById('id')).toEqual(promise)
})