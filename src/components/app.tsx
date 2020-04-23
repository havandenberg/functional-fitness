import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { TinyButton as ScrollUpButton } from 'react-scroll-up-button';
import { QueryParamProvider } from 'use-query-params';
import Footer from 'components/footer';
import Header from 'components/header';
import { ROOT_MODAL_ID } from 'components/modal';
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
  [th.breakpointQueries.desktop]: {
    borderLeft: th.borders.input,
    borderRight: th.borders.input,
  },
});

const Page = styled(l.Div)({
  flex: 1,
  width: th.sizes.fill,
});

const App = () => (
  <Router>
    <QueryParamProvider ReactRouterRoute={Route}>
      <GlobalContextProvider>
        <ThemeProvider theme={th}>
          <Main>
            <Switch>
              <Route path="/live" component={undefined} />
              <Header />
            </Switch>
            <Page>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/live" component={Live} />
                <Route path="/live/:id" component={Live} />
                <Route path="/start" component={Start} />
                <Route path="/schedule" component={Schedule} />
                <Route path="/exercises" component={Exercises} />
                <Route path="/resources" component={Resources} />
                <Route path="/sessions/:id" component={Session} />
                <Redirect to="/" />
              </Switch>
            </Page>
            <Footer />
            <ScrollUpButton
              AnimationDuration={300}
              style={{
                background: th.colors.brand.primaryHighlight,
                border: th.borders.input,
                borderRadius: th.borderRadii.input,
                fill: th.colors.black,
                height: 22,
                padding: `7px ${th.spacing.sm} 9px ${th.spacing.sm}`,
                width: 22,
                verticalAlign: 'middle',
              }}
            />
            <div id={ROOT_MODAL_ID} />
          </Main>
          <Global />
        </ThemeProvider>
      </GlobalContextProvider>
    </QueryParamProvider>
  </Router>
);

export default App;
