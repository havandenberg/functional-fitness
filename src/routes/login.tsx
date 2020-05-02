import React, { useCallback, useState } from 'react';
import { isEmpty } from 'ramda';
import { Redirect } from 'react-router-dom';
import { useGlobalContext } from 'context/global';
import b from 'ui/button';
import i from 'ui/input';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{ user }, { login }] = useGlobalContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      login(email, password);
    }
  };

  const validate = useCallback(() => !isEmpty(email) && !isEmpty(password), [email, password]);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleLogin}>
      <l.Centered my={th.spacing.lg}>
        <l.Div>
          <ty.H2 fontSize={th.fontSizes.h3} mb={th.spacing.lg}>
            Instructor Login
          </ty.H2>
          <ty.Label mb={th.spacing.sm}>Email</ty.Label>
          <i.Default
            autoFocus
            mb={th.spacing.lg}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            value={email}
          />
          <ty.Label mb={th.spacing.sm}>Password</ty.Label>
          <i.Default
            mb={th.spacing.lg}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
        </l.Div>
        <b.Default bg={th.colors.brand.primary} p={th.spacing.sm} type="submit">
          <ty.Label color={th.colors.white} fontSize={th.fontSizes.sm}>
            Login
          </ty.Label>
        </b.Default>
      </l.Centered>
    </form>
  );
};

export default Login;
