import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import Footer from 'components/footer';
import Header from 'components/header';
import { GlobalContextProvider } from 'context/global';
import Exercises from 'routes/exercises';
import Home from 'routes/home';
import Live from 'routes/live';
import Schedule from 'routes/schedule';
import Resources from 'routes/resources';
import Session from 'routes/session';
import Start from 'routes/start';
import Global from 'ui/global';
import l from 'ui/layout';
import th from 'ui/theme';

const Main = styled(l.FlexBetween)({
  flexDirection: 'column',
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
            <Header />
            <l.Div flex={1} width={th.sizes.fill}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/live" component={Live} />
                <Route path="/live/:id" component={Live} />
                <Route path="/start" component={Start} />
                <Route path="/schedule" component={Schedule} />
                <Route path="/exercises" component={Exercises} />
                <Route path="/resources" component={Resources} />
                <Route path="/session/:id" component={Session} />
                <Redirect to="/" />
              </Switch>
            </l.Div>
            <Footer />
          </Main>
          <Global />
        </ThemeProvider>
      </GlobalContextProvider>
    </QueryParamProvider>
  </Router>
);

export default App;
