import { BrowserRouter } from "react-router-dom"
import { CmsRoutes } from "./CmsRoutes"

export const AppRoutes = () => {
    return <BrowserRouter>
        <CmsRoutes />
    </BrowserRouter>
}