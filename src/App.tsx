import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Resume } from './components/Resume';
import { Blog } from './components/Blog';
import { About } from './components/About';
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  );
}

export default App;
