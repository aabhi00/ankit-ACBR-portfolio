'use client'

import { Component, ReactNode } from 'react'

// Error boundaries MUST be class components in React
// They cannot be written as functions
// Python parallel: like a try/except block that wraps
// an entire section of your UI

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  // This runs when a child component throws an error
  // Like Python's except clause
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  // This runs after the error is caught
  // Good place to log to an error tracking service (like Sentry)
  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('ErrorBoundary caught:', error, info)
    // In production you would send this to Sentry:
    // Sentry.captureException(error)
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback or default
      return this.props.fallback ?? (
        <div style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          background: 'var(--parchment)',
          borderRadius: 12,
          margin: '2rem',
          border: '1px solid var(--border)',
        }}>
          <p style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.2rem',
            color: 'var(--ink)',
            marginBottom: '.5rem',
          }}>
            Something went wrong
          </p>
          <p style={{ fontSize: '.88rem', color: 'var(--ink3)', marginBottom: '1rem' }}>
            This section failed to load. The rest of the page is unaffected.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              padding: '.5rem 1.2rem',
              background: 'var(--moss)',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '.85rem',
            }}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}