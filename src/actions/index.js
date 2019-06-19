import tfl from '../apis/tfl';

/*
Get Transport Status details from TfL
 */
export const fetchTransportStatusList = () => {
    return async(dispatch) => {
        const response = await tfl.get('Line/Mode/tube,dlr,overground,tram/Status');
        dispatch({type: 'FETCH_TRANSPORT_STATUS', payload: response.data});
    }
};