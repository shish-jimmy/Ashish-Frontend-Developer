import {
  FETCH_CAPSULES_REQUEST,
  FETCH_CAPSULES_SUCCESS,
  FETCH_CAPSULES_FAILURE,
  SET_SEARCH_PARAMS,
  SET_CURRENT_PAGE,
  SET_ITEMS_PER_PAGE,
  SET_TOTAL_PAGES, 
} from "./actions";

const initialState = {
  capsules: [],
  loading: false,
  error: null,
  searchParams: {
    status: "",
    originalLaunch: "",
    type: "",
  },
  currentPage: 1,
  itemsPerPage: 10,
  totalPages: 0,
};

const capsulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CAPSULES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CAPSULES_SUCCESS:
      return {
        ...state,
        loading: false,
        capsules: action.payload,
      };
    case FETCH_CAPSULES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_SEARCH_PARAMS:
      return {
        ...state,
        searchParams: action.payload,
        currentPage: 1,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_ITEMS_PER_PAGE:
      return {
        ...state,
        itemsPerPage: action.payload,
        currentPage: 1,
      };
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      };
    default:
      return state;
  }
};

export default capsulesReducer;
