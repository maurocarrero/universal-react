import React from 'react';
import { Link } from 'react-router';

export default ({ item }) => (
  <section>
    <h1>{item.title}</h1>
    <p>{item.description}</p>
    <Link to="/">List</Link>
  </section>
);
