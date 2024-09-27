import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import EventsPage from "../pages/EventsPage";
import ApplicationsPage from "../pages/ApplicationsPage";
import CompaniesPage from "../pages/CompaniesPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/',
                element: <EventsPage/>
            },
            {
                path: '/applications',
                element: <ApplicationsPage/>
            },
            {
                path: '/companies',
                element: <CompaniesPage/>
            }
        ]
    }
])