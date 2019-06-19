import _ from 'lodash';

export default (state = {}, action) => {
    if (action.type === 'FETCH_TRANSPORT_STATUS') {
        //Organise JSON from action to name of line and status of line
        return {
            ...state, ..._.mapValues(_.mapKeys(action.payload, 'id'),
                (data) => {
                    return {
                        name: data.name,
                        status: data.lineStatuses.map((status) => {
                            return {status: status.statusSeverityDescription, reason: status.reason};
                        }),
                    }
                }
            )
        }
    } else {
        return state;
    }
}