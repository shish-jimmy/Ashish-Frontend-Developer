import axios from "axios";

export const FETCH_CAPSULES_REQUEST = "FETCH_CAPSULES_REQUEST";
export const FETCH_CAPSULES_SUCCESS = "FETCH_CAPSULES_SUCCESS";
export const FETCH_CAPSULES_FAILURE = "FETCH_CAPSULES_FAILURE";
export const SET_SEARCH_PARAMS = "SET_SEARCH_PARAMS";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_ITEMS_PER_PAGE = "SET_ITEMS_PER_PAGE";
export const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";

export const fetchCapsulesRequest = () => {
  return {
    type: FETCH_CAPSULES_REQUEST,
  };
};

export const fetchCapsulesSuccess = (capsules) => {
  return {
    type: FETCH_CAPSULES_SUCCESS,
    payload: capsules,
  };
};

export const fetchCapsulesFailure = (error) => {
  return {
    type: FETCH_CAPSULES_FAILURE,
    payload: error,
  };
};

export const setSearchParams = (searchParams) => {
  return {
    type: SET_SEARCH_PARAMS,
    payload: searchParams,
  };
};

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};

export const setItemsPerPage = (itemsPerPage) => {
  return {
    type: SET_ITEMS_PER_PAGE,
    payload: itemsPerPage,
  };
};

export const setTotalPages = (totalPages) => {
  return {
    type: SET_TOTAL_PAGES,
    payload: totalPages,
  };
};

export const fetchCapsules = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchCapsulesRequest());
      const { searchParams, currentPage, itemsPerPage } = getState().capsules;

      const params = {
        status: searchParams.status,
        original_launch: searchParams.originalLaunch,
        type: searchParams.type,
        offset: (currentPage - 1) * itemsPerPage,
      };

      const response = await axios.get("https://api.spacexdata.com/v3/capsules", { params });
      const capsules = response.data;
      dispatch(fetchCapsulesSuccess(capsules));
      const totalPages = Math.ceil(response.headers["spacex-api-count"] / itemsPerPage);
      dispatch(setTotalPages(totalPages));
    } catch (error) {
      const errorMessage = error.message;
      dispatch(fetchCapsulesFailure(errorMessage));
    }
  };
};