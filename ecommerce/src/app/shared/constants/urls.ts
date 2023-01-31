import { environment } from "src/environments/environment";

const BASE_URL = environment.production? '' : 'http://localhost:3000';

export const WATCHES_URL = `${BASE_URL}/api/watchs`;
export const WATCHES_SEARCH_URL = `${BASE_URL}/api/watchs/search/`;
export const WATCHES_TAGS_URL = `${BASE_URL}/api/watchs/tags`;
export const WATCHES_TAGS_SEARCH_URL = `${BASE_URL}/api/watchs/tags/`;
export const WATCHES_ID_URL = `${BASE_URL}/api/watchs/`;

export const USERS_LOGIN_URL = `${BASE_URL}/api/users/login`;
export const USERS_REGISTER_URL = `${BASE_URL}/api/users/register`;

export const ORDERS_URL = `${BASE_URL}/api/orders`;
export const ORDER_CREATE_URL = `${ORDERS_URL}/create`;
export const ORDER_NEW_ORDER_FOR_CURRENT_USER_URL = `${ORDERS_URL}/newOrderForCurrentUser`;
export const ORDER_PAY_URL = `${ORDERS_URL}/pay`;
export const ORDER_TRACK_URL = `${ORDERS_URL}/track/`;

