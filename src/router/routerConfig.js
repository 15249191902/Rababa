import Home from "../pages/home/Home.js";
import Message from "../pages/Message.js"
import Detail from "../pages/Detail.js"
export const mainRouter = [
  {
    component: Home,
    path: '/',
    exact: true,
  },
  {
    component: Detail,
    path: '/Detail'
  },
  {
    component: Message,
    path: '/Message'
  },
]