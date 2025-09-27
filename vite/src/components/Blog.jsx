import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Blog.css";

const posts = [
  { id:1, title:"10 Romantic Proposal Ideas", snippet:"Discover the most enchanting ways to propose your love...", cover:"https://i.pinimg.com/736x/33/f3/ab/33f3ab846fcd22027f509ce301a16e4d.jpg", slug:"romantic-proposals", category:"Romantic" },
  { id:2, title:"Luxury Proposal Experiences", snippet:"Step into the world of luxury and elegance...", cover:"https://i.pinimg.com/1200x/74/45/aa/7445aa670bedb87e9384b3b40f9acda3.jpg", slug:"luxury-proposals", category:"Luxury" },
  { id:3, title:"Creative Custom Proposals", snippet:"Get inspired by unique, tailor-made proposals...", cover:"https://i.pinimg.com/736x/7d/8a/6c/7d8a6cdc5bb9840bac2f2d0bf0f028b6.jpg", slug:"custom-proposals", category:"Custom" },
  { id:4, title:"Proposal Tips & Tricks", snippet:"Learn from the experts on how to make your proposal smooth...", cover:"https://i.pinimg.com/1200x/0e/a0/a7/0ea0a7fd832f587969d05c95cb919d57.jpg", slug:"proposal-tips", category:"Tips" },
  { id:5, title:"Outdoor Proposal Settings", snippet:"Explore dreamy outdoor locations for breathtaking proposals...", cover:"https://i.pinimg.com/1200x/37/72/9c/37729c64bdc427ec14d55b9c257de7db.jpg", slug:"outdoor-settings", category:"Outdoor" },
  { id:6, title:"Proposal Story Highlights", snippet:"Read real-life proposal stories and get inspired...", cover:"https://i.pinimg.com/736x/bd/0a/e2/bd0ae256f79c158a11b259df111665ad.jpg", slug:"story-highlights", category:"Stories" },
  { id:7, title:"Anniversary & Date Night", snippet:"From intimate dinners to stylish anniversary setups.." , cover:"https://i.pinimg.com/1200x/31/4d/fe/314dfea75fe2150c9ce650d9ac9691cd.jpg", slug:"Anniversary-date" , category:"date"},
];

const categories = ["All", "Romantic", "Luxury", "Custom", "Tips", "Outdoor", "Stories"];

function Blog() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const filteredPosts = posts.filter(post => {
    const matchCategory = filter === "All" || post.category === filter;
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const displayedPosts = filteredPosts.slice((currentPage-1)*postsPerPage, currentPage*postsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }

  return (
    <div className="blog-page">
      <header className="blog-hero">
        <h1>Proposal Ideas & Stories</h1>
        <p>Get inspired for your perfect proposal</p>
      </header>

      <div className="blog-controls">
        <input type="text" placeholder="Search posts..." value={search} onChange={e=>setSearch(e.target.value)} />
        <select value={filter} onChange={e=>setFilter(e.target.value)}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <section className="blog-list">
        {displayedPosts.map(post => (
          <article key={post.id} className="blog-card">
            <img src={post.cover} alt={post.title} />
            <div className="blog-content">
              <div className="blog-text">
                <h2>{post.title}</h2>
                <p>{post.snippet}</p>
              </div>
              <Link to={`/blog/${post.slug}`} className="read-more">Read More →</Link>
            </div>
          </article>
        ))}
        {displayedPosts.length === 0 && <p className="no-posts">No posts found.</p>}
      </section>

      <div className="blog-pagination">
        <button onClick={()=>handlePageChange(currentPage-1)} disabled={currentPage===1}>← Prev</button>
        {[...Array(totalPages)].map((_,i) => (
          <button key={i} className={currentPage===i+1?"active":""} onClick={()=>handlePageChange(i+1)}>{i+1}</button>
        ))}
        <button onClick={()=>handlePageChange(currentPage+1)} disabled={currentPage===totalPages}>Next →</button>
      </div>
    </div>
  );
}

export default Blog;
