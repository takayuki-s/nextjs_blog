/**
 * @jest-environment jsdom
 */

import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { getPage } from 'next-page-tester'
import { initTestHelpers } from 'next-page-tester'

initTestHelpers()
process.env.NEXT_PUBLIC_RESTAPI_URL = 'http://127.0.0.1:8000/api'

const server = setupServer(
  rest.get(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/get-blogs/`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            title: 'title1',
            content: 'content1',
            username: 'username1',
            tags: [
              { id: 1, name: 'tag1' },
              { id: 2, name: 'tag2' },
            ],
            created_at: '2021-01-12 14:59:41',
          },
          {
            id: 2,
            title: 'title2',
            content: 'content2',
            username: 'username2',
            tags: [
              { id: 1, name: 'tag1' },
              { id: 2, name: 'tag2' },
            ],
            created_at: '2021-01-13 14:59:41',
          },
        ])
      )
    }
  )
)

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
  document.cookie =
    'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
})
afterAll(() => {
  server.close()
})
