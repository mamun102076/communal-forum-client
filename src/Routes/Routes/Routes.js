import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Media from "../../Pages/Media/Media";
import PostDetails from "../../Pages/Media/PostDetails/PostDetails";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/media',
                element: <Media></Media>
            },
            {
                path: '/postdetails/:id',
                element: <PostDetails></PostDetails>
            }
        ]
    }
])

export default router;