import { BrowserRouter } from "react-router-dom"
import { CmsRoutes } from "./CmsRoutes"
import { FrontRoutes } from "./FrontRoutes"

export const AppRoutes = () => {
    return <BrowserRouter>
        <CmsRoutes />

        <FrontRoutes />
    </BrowserRouter>
}