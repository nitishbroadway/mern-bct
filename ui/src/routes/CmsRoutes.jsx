import { Navigate, Route, Routes } from "react-router-dom"
import { CmsLayout } from "../components/CmsLayout"
import { Home } from "../pages/cms/home/Home"
import { Login } from "../pages/cms/auth/Login"
import { PrivateRoutes } from "./PrivateRoutes"
import { AuthorsList } from "../pages/cms/authors/AuthorsList"
import { AuthorsCreate } from "../pages/cms/authors/AuthorsCreate"
import { AuthorsEdit } from "../pages/cms/authors/AuthorsEdit"

export const CmsRoutes = () => {
    return <Routes>
        <Route path="/cms" element={<CmsLayout />}>
            <Route index element={<PrivateRoutes element={<Home />} />} />

            <Route path="authors" element={<PrivateRoutes element={<AuthorsList />} />} />
            <Route path="authors/create" element={<PrivateRoutes element={<AuthorsCreate />} />} />
            <Route path="authors/:id" element={<PrivateRoutes element={<AuthorsEdit />} />} />

            <Route path="login" element={<Login />} />
        </Route>

        <Route path="/" element={<Navigate to="/cms" />} />
    </Routes>
}