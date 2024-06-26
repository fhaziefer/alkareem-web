import React from "react";
import Login from "../components/Login";
import Header from "../components/Header";

function LoginPage() {
  return (
    <div>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Header
            heading="Masuk ke akun anda"
            paragraph="Belum memiliki akun? "
            linkName="Daftar"
            linkUrl="/signup"
          />
          <Login />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
