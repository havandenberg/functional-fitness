import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { GlobalContextProvider } from 'context/global';
import Global from 'ui/global';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

const Main = styled(l.Div)({
  margin: '0 auto',
  maxWidth: th.widths.maxPage,
  minHeight: '100vh',
});

const App = () => (
  <Router>
    <QueryParamProvider ReactRouterRoute={Route}>
      <GlobalContextProvider>
        <ThemeProvider theme={th}>
          <Main>
            <Switch>
              <Route exact path="/" component={() => <ty.H1 center>Boilerplate</ty.H1>} />
              <Redirect to="/" />
            </Switch>
          </Main>
          <Global />
        </ThemeProvider>
      </GlobalContextProvider>
    </QueryParamProvider>
  </Router>
);

export default App;
