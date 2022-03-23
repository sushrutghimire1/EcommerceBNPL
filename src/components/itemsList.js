import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Items extends PureComponent {

    render() {
        return (
            <div>
            <div class="list-group" style={{marginBottom: 30, width:'40%'}}>
            <a class="list-group-item list-group-item-action active">
            Item1<button type="button" class="btn btn-success" style={{float:'right', borderColor:'white'}}><Link to="/buy" style={{ color: 'white', textDecoration:'none' }}>Buy</Link></button>
            </a>
                <a href="#" class="list-group-item list-group-item-action">Rs 1000</a>
                <a href="#" class="list-group-item list-group-item-action">Camera</a>
            </div>
            <div class="list-group" style={{marginBottom: 30, width:'40%'}}>
            <a class="list-group-item list-group-item-action active">
            Item2<button type="button" class="btn btn-success" style={{float:'right', borderColor:'white'}}><Link to="/buy" style={{ color: 'white', textDecoration:'none' }}>Buy</Link></button>
            </a>
            <a href="#" class="list-group-item list-group-item-action">Rs 20000</a>
            <a href="#" class="list-group-item list-group-item-action">Television</a>
        </div>
        <div class="list-group" style={{marginBottom: 30, width:'40%'}}>
        <a class="list-group-item list-group-item-action active">
            Item3<button type="button" class="btn btn-success" style={{float:'right', borderColor:'white'}}><Link to="/buy" style={{ color: 'white', textDecoration:'none' }}>Buy</Link></button>
        </a>
        <a href="#" class="list-group-item list-group-item-action">Rs 130000</a>
        <a href="#" class="list-group-item list-group-item-action">Laptop</a>
    </div>
    </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { authenticated: state.auth.authenticated }
};

export default connect(mapStateToProps)(Items);
