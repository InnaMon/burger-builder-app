import React, { Component } from 'react';
// import Modal from '../../components/UI/Modal/Modal';

class ErrorBoundary extends Component {
    state = {
        hasError: false
    }

    componentDidUpdate() {}

    componentDidCatch(error, info) {
        this.setState({
            hasError: true
        });
        console.log('error:', error)
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong!</h1>
            // alert('Something went wrong!')
            // return <Modal show>Something went wrong!</Modal>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;