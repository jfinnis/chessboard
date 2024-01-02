/// <reference lib="dom" />
import { describe, test } from 'bun:test'
import { render } from '@testing-library/react'

import Piece from '~/components/Piece'

describe('Piece component', function() {
    test('renders without errors', function() {
        render(
            <Piece piece='WK' />
        )
    })
})
