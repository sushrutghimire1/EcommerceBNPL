import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends PureComponent {

    componentWillMount() {
        this.props.fetchFeature();
    }

    renderFeature() {
        return this.props.feature;
    }

    render() {
       console.log(this.props.feature);
        if (this.props.feature != undefined) {
           return( <div>
                <h4>Feature</h4><small>You must be logged in to see the features</small>
                <ul>
                    {this.renderFeature()}
                </ul>
            </div>
           );
        }
       

        return (
             <div>Loading...</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { feature: state.features.homePageFeature }
}

export default connect(mapStateToProps, actions)(Feature);
