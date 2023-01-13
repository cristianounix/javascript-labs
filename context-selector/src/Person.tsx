import { useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { MyContext } from './state';

const Person = () => {
  const person = useContextSelector(MyContext, (v) => v[0].person);
  const dispatch = useContextSelector(MyContext, (v) => v[1]);
  return (
    <div>
      {Math.random()}
      <div>
        First Name:
        <input
          value={person.firstName}
          onChange={(event) => {
            const firstName = event.target.value;
            dispatch({ firstName, type: 'setFirstName' });
          }}
        />
      </div>
      <div>
        Last Name:
        <input
          value={person.lastName}
          onChange={(event) => {
            const lastName = event.target.value;
            dispatch({ lastName, type: 'setLastName' });
          }}
        />
      </div>
      <div>
        Age:
        <input
          value={person.age}
          onChange={(event) => {
            const age = Number(event.target.value) || 0;
            dispatch({ age, type: 'setAge' });
          }}
        />
      </div>
    </div>
  );
};


export const PersonWithLocalState = () => {
  const [person, setPerson] = useState({
    name: '',
    last_name:  '',
    age: '',
  });
  return (
    <div>
      {Math.random()}
      <div>
        First Name:
        <input
          value={person.name}
          onChange={(event) => {
            const name = event.target.value;
            setPerson({...person, name: name});
          }}
        />
      </div>
      <div>
        Last Name:
        <input
          value={person.last_name}
          onChange={(event) => {
            const last_name = event.target.value;
            setPerson({...person, last_name: last_name});
          }}
        />
      </div>
      <div>
        Age:
        <input
          value={person.age}
          onChange={(event) => {
            const age = event.target.value;
            setPerson({...person, age });
          }}
        />
      </div>
    </div>
  );
};


export const PersonWithForm = () => {
  
  return (
    <form 
      onSubmit={(event: any) => {
        event?.preventDefault()
        const data = new FormData(event.target);
        console.log('Name:', data.get('name'))
        console.log('Last Name:', data.get('last_name'))
        console.log('Age:', data.get('age'))
        
      }}>
      {Math.random()}
      <div>
        First Name:
        <input
          name='name'
        />
      </div>
      <div>
        Last Name:
        <input
          name='last_name'
        />
      </div>
      <div>
        Age:
        <input
          name='age'
        />
      </div>
      <input type={'submit'} value={'submit'} />
    </form>
  );
};

export default Person;
