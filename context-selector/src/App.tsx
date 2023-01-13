import { ReactNode, StrictMode, useMemo, useState } from 'react';

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

const Body = () => {
  const [filter, setFilter] = useState<null|number>(null)
  const items = [1,2,3,4,5].filter((i) => {
    if(filter) {
      return i == filter
    }
    return i
  })

  const arrayFiltered = useMemo(()=>{
    return [1,2,3,4,5].filter((i) => {
      if(filter) {
        return i == filter
      }
      return i
    })
  },[filter])
  const x = 1
  return (
    <div>
      <div style={{ float: 'left', width: '50%', height:'100%' , backgroundColor: '#d6d6d6' }}>
        <h1>Counter</h1>
        <Counter />
        <Counter />
        <Box>
          <LocalCounter />
        </Box>
        <div style={{clear: 'both'}}>
          <Box>
            <button onClick={() => setFilter(1)}>Filter by 1</button>
            <button onClick={() => setFilter(2)}>Filter by 2</button>
            <button onClick={() => setFilter(null)}>Clear filter</button>
            <span>asdasda</span>
            <span>value: {x}</span>
            <ul>
              {items.map((i) => {
                return <li>{i}</li>
              })}
            </ul>
            <ul>
              {arrayFiltered.map((i) => {
                return <li>{i}</li>
              })}
            </ul>
          </Box>
        </div>
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
  )
};

const App = () => (
  <StrictMode>
    <Provider>
      <Body />
    </Provider>
  </StrictMode>
);

export default App;
