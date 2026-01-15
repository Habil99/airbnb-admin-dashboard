import { render, screen } from '@testing-library/react'
import { JSX } from 'react'

// Simple smoke test to verify Jest + RTL work correctly
describe('Test Setup', () => {
  it('should render a component', () => {
    const TestComponent = (): JSX.Element => <div>Hello Test</div>
    render(<TestComponent />)
    expect(screen.getByText('Hello Test')).toBeInTheDocument()
  })
})
