import './App.css';
import Home from './blog/Home';
import Login from './blog/Login';
import Register from './blog/Register';
import RootLayout from './blog/RootLayout';
import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom';
import Userprofile from './blog/Userprofile';
import Authorprofile from './blog/Authorprofile';
import Article from './blog/Article';
import AddArticle from './blog/AddArticle';
import ArticlesByAuthor from './blog/ArticlesByAuthor';
import Articles from './blog/Articles';
import ErrorPage from './blog/ErrorPage';

function App() {
  let router = createBrowserRouter([
    {
    path:'',
    element:<RootLayout/>,
    errorElement:<ErrorPage/>,
    children:[
    {
      path:'',
      element:<Home/>
    },
    {
      path:"register",
      element:<Register/>
    },
    {
      path:"login",
      element:<Login/>
    },
    {
      path:"userprofile",
      element:<Userprofile/>,
      children:[
        {
          path:"articles",
          element:<Articles/>
        },
        {
          path:'article/:articleId',
          element:<Article/>
        },
        {
          path:'',
          element:<Navigate to='articles'/>
        }
      ]
    },
    {
      path:"authorprofile",
      element:<Authorprofile/>,
      children:[
        {
          path:'new-article',
          element:<AddArticle/>
        },
        {
          path:'articles-by-author/:username',
          element:<ArticlesByAuthor/>
        },
        {
          path:'article/:articleId',
          element:<Article/>
        },
        {
          path:'',
          element:<Navigate to='articles-by-author/:author'/>
        }
      ]
    }
    ]
    }
  ]);
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
