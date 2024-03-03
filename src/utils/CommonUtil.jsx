import { jwtDecode } from "jwt-decode";


const getUserId = () => {

  let token = localStorage.getItem('authToken.access')
  if (token) {
    let decodedToken = jwtDecode(token);
    print(decodedToken,'5555')
    return decodedToken.userId;
  }
  return "";
};

const getActiveChatId = (match) => {
  return match && match.params ? match.params.chatId : null;
};


const CommonUtil = {
    getUserId:getUserId,
    getActiveChatId:getActiveChatId
}


export default CommonUtil;