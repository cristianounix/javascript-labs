import { ReactNode, StrictMode } from 'react';

import { useValue, MyContext } from './state';
import Counter from './Counter';
import Person, { PersonWithForm, PersonWithLocalState } from './Person';
import { Box } from './Box';
import { LocalCounter } from './LocalCounter';

const Provider = ({ children }: { children: ReactNode }) => (
  <MyContext.Provider value={useValue()}>
    {children}
  </MyContext.Provider>
);

const Body = () => (
  <div>
    <div style={{ float: 'left', width: '50%', height:'100%' , backgroundColor: '#d6d6d6' }}>
      <h1>Counter</h1>
      <Counter />
      <Counter />
      <Box>
        <LocalCounter />
      </Box>
    </div>
    <div style={{ float: 'left', width: '50%', height:'100%', backgroundColor: '#76e7dd' }}>
      <h1>Person</h1>
      <Person />
      <Person />
      <Box>
        <h1>With form</h1>
        <PersonWithForm />
      </Box>
      <Box>
        <h1>With local state</h1>
        <PersonWithLocalState />
      </Box>
    </div>
  </div>
);

const App = () => (
  <StrictMode>
    <Provider>
      <Body />
    </Provider>
  </StrictMode>
);

export default App;
