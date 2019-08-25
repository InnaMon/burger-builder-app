import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false
    }

    // static getDerivedStateFromError(error) {
    //     this.setState({
    //         hasError: true
    //     });
    //   }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true
        });
        console.log('error:', error)
    }

    render() {
        if (this.state.hasError) {
            alert('Something went wrong!')
        }
        return this.props.children
    }
}

export default ErrorBoundary;