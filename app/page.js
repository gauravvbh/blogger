import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer theme="dark" />
      <Header />
      <BlogList />
       <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
