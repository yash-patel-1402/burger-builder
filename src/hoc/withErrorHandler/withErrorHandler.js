import React, { Component } from 'react';
import Modal from '../../Components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
      };
      // }

      // componentWillMount() {
      // console.log('withErrorHandler componentWillMount called');
      this.reqInterceptor = axios.interceptors.request.use(
        (req) => req,
        (error) => {
          console.log('Error shown in request');
          this.setState({ error: error });
          throw error;
        }
      );
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          console.log('Error shown in response');
          // console.log('Error setState called');
          this.setState({ error: error });
          throw error;
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    clearError = () => {
      this.setState({ error: null });
    };

    render() {
      // console.log(this.state);
      return (
        <>
          <Modal show={this.state.error} onCloseModalClick={this.clearError}>
            <p style={{ color: 'red' }}>
              {this.state.error && this.state.error.message}
            </p>
          </Modal>
          <WrappedComponent {...this.props}>
            {this.props.children}
          </WrappedComponent>
        </>
      );
    }
  };
};

export default withErrorHandler;
