import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button'; // adjust path if needed

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Button
        onClick={() => navigate('/')}
        variant="outline"
        className="mb-6 w-fit absolute top-4 left-4"
        aria-label="Back to home"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Button>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;