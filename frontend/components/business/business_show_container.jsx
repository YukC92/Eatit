import {connect} from 'react-redux';
import BusinessShow from './business_show';
import { fetchBusiness } from '../../actions/business_actions';
import { deleteReview } from '../../actions/review_actions';



const mapStateToProps = (state, ownProps) => {
  // debugger
    const businessId = ownProps.match.params.businessId;
    const currentUser = state.session.currentUser
    return({
        currentUser: currentUser,
        business: state.entities.businesses[businessId],
    });
};

const mapDispatchToProps = dispatch => ({
  fetchBusiness: id => dispatch(fetchBusiness(id)),
  deleteReview: (id) => dispatch(deleteReview(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(BusinessShow)