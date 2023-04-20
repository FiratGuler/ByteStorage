import AdminPage from "../Pages/MainPage";
import AuthMain from "../Pages/AuthMain";
import NotFoundPage from "../Pages/NotFoundPage";
import Products from "../Pages/Products";
import Personnel from "../Pages/Personnel";


const routes = [
    {
        path: "/",
        element: <AuthMain />,
    },
    {
        path: "MainPage",
        element: <AdminPage />,
    },
    {
        path: "products",
        element: <Products />,
    },
    {
        path: "personnels",
        element: <Personnel />,
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
]
export default routes