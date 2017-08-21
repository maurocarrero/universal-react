import React from 'react';
import { Link } from 'react-router';

export default ({ list }) => (
  <section>
    <h1>The list</h1>
    {
      list.map(item => (
        <p key={item.id}>
          <Link to={`/item/${item.id}`}>{item.title}</Link>
        </p>
      ))
    }
  </section>
);
