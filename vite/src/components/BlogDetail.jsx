import React from "react";
import { useParams, Link } from "react-router-dom";
import "./Blog.css";

const posts = [
  { id:1, title:"10 Romantic Proposal Ideas", content:"Discover the most enchanting ways to propose your love. From candlelit dinners to secret picnic spots, make your moment unforgettable. 💖✨", cover:"https://i.pinimg.com/736x/33/f3/ab/33f3ab846fcd22027f509ce301a16e4d.jpg", slug:"romantic-proposals" },
  { id:2, title:"Luxury Proposal Experiences", content:"Step into a world of luxury and elegance. Hire a professional setup, luxury yacht, or private villa. Leave a lasting impression with sophistication. 💎🌟", cover:"https://i.pinimg.com/1200x/74/45/aa/7445aa670bedb87e9384b3b40f9acda3.jpg", slug:"luxury-proposals" },
  { id:3, title:"Creative Custom Proposals", content:"Get inspired by unique, tailor-made proposals. Incorporate personal hobbies, travel spots, or custom themes to surprise your partner. 🎨💡", cover:"https://i.pinimg.com/736x/d5/66/71/d56671b6f5b3d87c9cc987b9dd0368d4.jpg", slug:"custom-proposals" },
  { id:4, title:"Proposal Tips & Tricks", content:"Learn from the experts how to plan smoothly. From timing to location, discover tricks to make your proposal flawless and unforgettable. 📝💌", cover:"https://i.pinimg.com/1200x/0e/a0/a7/0ea0a7fd832f587969d05c95cb919d57.jpg", slug:"proposal-tips" },
  { id:5, title:"Outdoor Proposal Settings", content:"Explore dreamy outdoor locations for breathtaking proposals. Beaches, mountains, gardens – nature makes every proposal magical. 🌅🌿", cover:"https://i.pinimg.com/1200x/37/72/9c/37729c64bdc427ec14d55b9c257de7db.jpg", slug:"outdoor-settings" },
  { id:6, title:"Proposal Story Highlights", content:"Read real-life proposal stories and get inspired. Every story is unique and filled with love, surprises, and unforgettable moments. 💕📖", cover:"https://i.pinimg.com/736x/bd/0a/e2/bd0ae256f79c158a11b259df111665ad.jpg", slug:"story-highlights" },
  { id:7, title:"Anniversary & Date Night", content:"From intimate dinners to stylish anniversary setups, we create memorable and elegant experiences ❄️🌸", cover:"https://i.pinimg.com/1200x/31/4d/fe/314dfea75fe2150c9ce650d9ac9691cd.jpg", slug:"Anniversary-date" },
];

function BlogDetail() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) return (
    <div className="blog-page">
      <p style={{textAlign:"center", padding:"50px", color:"#fff"}}>Post not found.</p>
      <div style={{textAlign:"center"}}><Link to="/blog" className="read-more">← Back to Blog</Link></div>
    </div>
  );

  return (
    <div className="blog-page">
      <div className="blog-detail">
        <img src={post.cover} alt={post.title} />
        <h1>{post.title}</h1>
        <div className="blog-content-text">
          {post.content.split("\n").map((line, i) => <p key={i}>{line}</p>)}
        </div>
        <div style={{marginTop:"20px"}}>
          <Link to="/blog" className="read-more">← Back to Blog</Link>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
