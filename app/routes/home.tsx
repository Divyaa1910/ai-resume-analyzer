import type { Route } from "./+types/home";
import Navbar from "~/Components/Navbar";
import {resumes} from "../../constants";
import ResumeCard from "~/Components/ResumeCard";
import {resume} from "react-dom/server";
import {usePuterStore} from "~/lib/puter";
import { Navigate, useLocation, useNavigate } from "react-router";  // Navigate ADD!

import {useEffect} from "react";


export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Resumind'},
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next: string = location.search.split('next')[1];
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // 2. Phir auth check (NO WARNING!)
  if (!auth.isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return (
  <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    <section className="main-section">
        <div className="page-heading py-1">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your sumbissions and check AI-powered feedback.</h2>
        </div>

      {resumes.length > 0 ? (
          <div className="resumes-section">
            {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
      ) : (
          <p>No resumes found</p>



      )}
    </section>

  </main>
  );
}