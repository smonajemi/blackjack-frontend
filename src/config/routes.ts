import Dashboard from "../pages/Dashboard";
import ErrorPage from "../pages/Error";

interface RouteType {
  path: string;
  component: any;
  name: string;
  protected: boolean;
}

const routes: RouteType[] = [
  {
    path: "/",
    component: Dashboard,
    name: "Dashboard",
    protected: false,
  },
  {
    path: "*",
    component: ErrorPage,
    name: "Error Page",
    protected: false,
  },
];

export default routes;
