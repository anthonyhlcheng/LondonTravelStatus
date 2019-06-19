import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {fetchTransportStatusList} from "../actions";
import './css/tube.css';

class tubeStatusList extends React.Component {
    state = {showReason: ''};

    componentDidMount() {
        this.props.fetchTransportStatusList();
    }

    /**
        List out all reasons for delays, cancellations or a reduction in service.
     **/
    renderStatusReason(key, status) {
        if(key !== this.state.showReason){
            return;
        }
        return status.map((status, index) => {
            if (status.reason) {
                return (
                    <tr key={key + index}>
                        <td></td>
                        <td>{status.reason}</td>
                    </tr>
                );
            }
            return (<React.Fragment key={key + index}></React.Fragment>);
        });
    }

    /**
     * Render the table of lines and their current status
     */
    renderList() {
        if (_.isEmpty(this.props.transportStatusList)) {
            return (
                <tr>
                    <td>No data available</td>
                    <td>No data available</td>
                </tr>
            );
        } else {
            return Object.keys(this.props.transportStatusList).map((tubeLine) => {
                const line = this.props.transportStatusList[tubeLine];
                const clickable = (line.status[0].status !== 'Good Service') ? 'pointer' : 'default';
                //Essentially update the state to ensure a reason is shown
                const updateReason = (tubeLine) => {
                    if(this.state.showReason === tubeLine) {
                        this.setState({showReason: ''});
                    }else{
                        this.setState({showReason: tubeLine});
                    }
                };
                const simpleStatus = line.status.map(status => status.status).join(',');
                const detailedStatus = this.renderStatusReason(tubeLine, line.status);

                return (
                    <React.Fragment key={tubeLine}>
                        <tr key={tubeLine}>
                            <td data-label="line"
                                className={tubeLine}>{line.name}</td>
                            <td data-label="status"
                                onClick={() => {updateReason(tubeLine)}} style={{cursor: clickable}}>
                                {simpleStatus}
                            </td>
                        </tr>
                        {detailedStatus}
                    </React.Fragment>
                );
            });
        }
    }

    render() {
        return (
            <div>
                <table className="ui celled table twelve wide">
                    <thead>
                    <tr>
                        <th className="three wide">Line</th>
                        <th className="five wide">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderList()}
                    </tbody>
                </table>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {transportStatusList: state.status};
};

export default connect(mapStateToProps, {fetchTransportStatusList})(tubeStatusList);