import { Navigate, Route, Routes } from "react-router-dom"
import { CmsLayout } from "../components/CmsLayout"
import { Home } from "../pages/cms/home/Home"
import { Login } from "../pages/cms/auth/Login"
import { PrivateRoutes } from "./PrivateRoutes"
import { AuthorsList } from "../pages/cms/authors/AuthorsList"
import { AuthorsCreate } from "../pages/cms/authors/AuthorsCreate"
import { AuthorsEdit } from "../pages/cms/authors/AuthorsEdit"
import { ArticlesList } from "../pages/cms/articles/ArticlesList"
import { ArticlesCreate } from "../pages/cms/articles/ArticlesCreate"
import { ArticlesEdit } from "../pages/cms/articles/ArticlesEdit"
import { CommentsList } from "../pages/cms/comments/CommentsList"

export const CmsRoutes = () => {
    return <Routes>
        <Route path="/cms" element={<CmsLayout />}>
            <Route index element={<PrivateRoutes element={<Home />} />} />

            <Route path="authors" element={<PrivateRoutes element={<AuthorsList />} />} />
            <Route path="authors/create" element={<PrivateRoutes element={<AuthorsCreate />} />} />
            <Route path="authors/:id" element={<PrivateRoutes element={<AuthorsEdit />} />} />

            <Route path="articles" element={<PrivateRoutes element={<ArticlesList />} />} />
            <Route path="articles/create" element={<PrivateRoutes element={<ArticlesCreate />} />} />
            <Route path="articles/:id" element={<PrivateRoutes element={<ArticlesEdit />} />} />
            
            <Route path="comments" element={<PrivateRoutes element={<CommentsList />} />} />

            <Route path="login" element={<Login />} />
        </Route>
    </Routes>
}