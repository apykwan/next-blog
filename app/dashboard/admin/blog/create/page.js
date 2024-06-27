'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

const ReactQuill = dynamic(() => import ('react-quill'), { ssr: false});
import 'react-quill/dist/quill.snow.css';

export default function AdminBlogCreate() {
  // state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  // image upload to cloudinary
  const uploadImage = async(e) => {
    e.preventDefault();
  };
  
  // submit to create blog api
  async function handleSubmit(e) {

  }
  // return jsx/ blog create form
  return (
    <div className="container mb-5">
      <div className="row w-75 mx-auto">
        <div className="col">
          <p className="lead">Create Blog</p>

          <div className="form-group my-4">
            <label htmlFor="title" className="text-secondary">Blog Title</label>
            <input 
              id="title" 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)}
              className="form-control p-2" 
            />
          </div>
          
          <div className="form-group my-4">
            <label className="text-secondary">Blog Content</label>
            <ReactQuill 
              className="border rounded my-2"
              value={content}
              onChange={e => setContent(e)}
            />
          </div>
          
          <div className="form-group my-4">
            <label htmlFor="category" className="text-secondary">Blog Category</label>
            <input 
              id="category" 
              type="text" 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              className="form-control p-2" 
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}
