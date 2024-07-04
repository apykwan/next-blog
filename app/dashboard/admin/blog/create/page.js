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
  async function uploadImage(e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

      //upload to cloudinary

      try {
        const response = await fetch(process.env.CLOUDINARY_URL, {
          method: "POST",
          body: formData        
        });

        if (response.ok) {
          const data = await response.json();
          setImage(data.secure_url);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };
  
  // submit to create blog api
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          category,
          image
        })
      });
      if (response.ok) {
        router.push("/dashboard/admin");
        toast.success("blog created successfully");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err);
      setLoading(false);
    }
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

          {image && (
            <img src={image} alt="preview image" style={{ width: "100px" }} />
          )}

          <div className="form-group my-4 d-flex justify-content-between">
            <button className="btn btn-outline-secondary">
              <label htmlFor="upload-btn" className="mt-2 pointer">
                {loading ? "Uploading..." : "Upload Image"}
              </label>
              <input 
                id="upload-btn" 
                type="file" 
                accept="image/*" 
                onChange={uploadImage} 
                hidden
              />
            </button>

            <button 
              className="btn text-light bg-primary" 
              disabled={loading}
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
