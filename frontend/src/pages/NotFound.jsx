import { useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <MdErrorOutline size={80} className="mx-auto text-error" />
        <h1 className="text-5xl font-bold text-base-content">404</h1>
        <p className="text-lg text-base-content/70">
          Oops! The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary rounded-xl"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
