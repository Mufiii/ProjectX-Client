import ServerUrl from "./ServeUrl";
import ApiUtils from "./apiUtils";

const sendGetRequest = (relativeUrl) => {
  const url = ServerUrl.BASE_URL + relativeUrl;
  const options = { headers: ApiUtils.getAuthHeader() };
  return fetch(url, options)
    .then(ApiUtils.statusHandler)
    .then(ApiUtils.jsonHandler)
    .then((data) => data)
    .catch((error) => false);
};


const ApiConnector = {
  sendGetRequest: sendGetRequest,
  // sendPostRequest: sendPostRequest,
};

export default ApiConnector;