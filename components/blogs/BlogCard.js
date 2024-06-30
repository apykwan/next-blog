export default function BLogCard({ blog }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{blog.title}</h5>
      </div>
    </div>
  );
}