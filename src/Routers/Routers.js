import AdminPage from "../Pages/MainPage";
import AuthMain from "../Pages/AuthMain";
import NotFoundPage from "../Pages/NotFoundPage";
import Products from "../Pages/Products";
import Employees from "../Pages/Employees";
import ProductTable from"../Components/ProductsPanels/ProductTable"

const routes = [
    {
        path: "/",
        element: <AuthMain />,
    },
    {
        path: "/MainPage",
        element: <AdminPage />,
    },
    {
        path: "/products/*",
        element: <Products />,
    },
    {
        path: "/table/:id",
        element: <ProductTable />,
    },
    {
        path: "/personnels/*",
        element: <Employees />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

export default routes;
