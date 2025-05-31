import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import AuthPage from './pages/authPage/AuthPage';
import './App.scss'
import ProfilePage from './pages/profilePage/ProfilePage';
import EditProfile from './pages/profilePage/component/EditProfile';
import GigsPage from './pages/gigsPage/GigsPage';
import GigPage from './pages/gigsPage/GigPage';
import CreateDialog from './pages/profilePage/component/CreateDialog';
import ContactUs from './pages/contactusPage/ContactUs';
import MessagePage from './pages/messagePage/MessagePage';
import Layout from './pages/reference/clients/Layout';
import Hire from './pages/reference/clients/subpage/Hire';
import EnterpriseSolution from './pages/reference/clients/subpage/EnterpriseSolution';
import ProjectCatalog from './pages/reference/clients/subpage/ProjectCatalog';
import TalentMarket from './pages/reference/clients/subpage/TalentMarket';
import FindWork from './pages/reference/guide/subpage/FindWork';
import PrivacyPolicy from './pages/policy/privacypolicy/PrivacyPolicy';
import LayoutJob from './pages/job/LayoutJob';
import Jobs from './pages/job/subpage/Jobs';
import JobCard from './pages/job/subpage/JobCard';
import CreateJob from './pages/job/subpage/CreateJob';
import MyJobs from './pages/job/subpage/MyJobs';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/profile/:username',
    element: <ProfilePage />
  },
  {
    path: '/editProfile',
    element: <EditProfile />
  },
  {
    path: '/f',
    element: <GigsPage />
  },
  {
    path: '/f/gig',
    element: <GigPage />
  },
  {
    path: '/freelance/create',
    element: <CreateDialog />
  },
  {
    path: '/auth',
    element: <AuthPage />
  },
  {
    path: '/contact',
    element: <ContactUs />
  },
  {
    path: '/message',
    element: <MessagePage />
  },
  {
    path: '/clients',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Hire />
      },
      {
        path: '/clients/enterprise',
        element: <EnterpriseSolution />
      },
      {
        path: '/clients/projects',
        element: <ProjectCatalog />
      },
      {
        path: '/clients/talents',
        element: <TalentMarket />
      },
    ]
  },
  {
    path: '/howtofind',
    element: <FindWork />
  },
  {
    path: 'privacy-policy',
    element: <PrivacyPolicy />
  },
  {
    path: 'job',
    element: <LayoutJob />,
    children: [
      {
        path: '',
        element: <Jobs />
      },
      {
        path: ':jobid',
        element: <JobCard />
      },
      {
        path: 'create',
        element: <CreateJob />
      },
      {
        path: 'my-jobs',
        element: <MyJobs/>
      }
    ]
  }
])


function App() {
  return (
    <div className='App'>
      <RouterProvider router={browserRouter} />
    </div>
  )
}

export default App