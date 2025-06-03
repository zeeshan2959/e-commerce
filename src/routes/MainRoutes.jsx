import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import PagesLayout from 'layout/Pages';
import SimpleLayout from 'layout/Simple';
import { SimpleLayoutType } from 'config';
import { loader as productsLoader, productLoader } from 'api/products';
import ErrorBoundary from './ErrorBoundary';

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/error/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/error/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon/coming-soon')));

const AppECommProducts = Loadable(lazy(() => import('pages/e-commerce/product')));
const AppECommProductDetails = Loadable(lazy(() => import('pages/e-commerce/product-details')));
const AppECommProductList = Loadable(lazy(() => import('pages/e-commerce/products-list')));
const AppECommCheckout = Loadable(lazy(() => import('pages/e-commerce/checkout')));
const AppECommAddProduct = Loadable(lazy(() => import('pages/e-commerce/add-product')));

const AppContactUS = Loadable(lazy(() => import('pages/contact-us')));
// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'sample-page',
          element: <SamplePage />
        }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'e-commerce',
          children: [
            {
              path: 'products',
              element: <AppECommProducts />,
              loader: productsLoader,
              errorElement: <ErrorBoundary />
            },
            {
              path: 'product-details/:id',
              element: <AppECommProductDetails />,
              loader: productLoader,
              errorElement: <ErrorBoundary />
            },
            {
              path: 'product-list',
              element: <AppECommProductList />,
              loader: productsLoader,
              errorElement: <ErrorBoundary />
            },
            {
              path: 'add-new-product',
              element: <AppECommAddProduct />
            },
            {
              path: 'checkout',
              element: <AppECommCheckout />
            }
          ]
        },
      ]
    },
    {
      path: '/contact-us',
      element: <AppContactUS />
    },
    {
      path: '*',
      element: <MaintenanceError />
    }
  ]
};

export default MainRoutes;
