import * as BusinessApiUtil from '../util/business_api_util'

export const RECEIVE_ALL_BUSINESSES = "RECEIVE_ALL_BUSINESSES"
export const RECEIVE_BUSINESS = "RECEIVE_BUSINESS";
export const SEARCH_BUSINESS = "SEARCH_BUSINESS"

const receiveBusinesses = (businesses) => ({
  type: RECEIVE_ALL_BUSINESSES,
  businesses
});

const receiveBusiness = ({business}) => ({
  type: RECEIVE_BUSINESS,
  business
});

const searchBusiness = (business) => ({
    type: SEARCH_BUSINESS,
    business
  })

export const fetchBusinesses = () => dispatch => {
  return (
  BusinessApiUtil.fetchBusinesses()
  .then(businesses => dispatch(receiveBusinesses(businesses)))
)};

export const fetchBusiness = (id) => dispatch => (
  BusinessApiUtil.fetchBusiness(id)
  .then(business => dispatch(receiveBusiness(business)))
);

export const searchBusinesses = (businessId) => dispatch => (
  BusinessApiUtil.searchBusinesses(businessId)
  .then(business => dispatch(searchBusiness(business)))
)