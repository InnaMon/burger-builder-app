import React, { Component } from 'react';
import Order from '../../components/Order/Order';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        fetch('https://burger-builder-app-ca613.firebaseio.com/orders.json')
        .then(response => response.json())
        .then(res => {
            console.log('orders object', res);
            const fetchedOrders = [];
            for (let key in res) {
                fetchedOrders.push({
                    ...res[key],
                    id: key
                });
            }
            this.setState({
                loading: false,
                orders: fetchedOrders
            })
        })
        .catch(error => {
            console.log('Errow when fetching orders', error);
            this.setState({
                loading: false
            });
        })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                    />
                ))}
            </div>
        );
    }
}

export default Orders;