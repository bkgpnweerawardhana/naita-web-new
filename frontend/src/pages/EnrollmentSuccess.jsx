import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react"; // optional fancy icon

function EnrollmentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-100 font-sans px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center"
      >
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          You're Officially Enrolled! 🎉
        </h1>
        <p className="text-gray-700 mb-4">
          We've received your application and we're excited to have you on board.
        </p>
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-6 text-sm">
          Hang tight! Our team is reviewing your application. <br />
          We'll notify you via <span className="font-semibold">email</span> once it’s{" "}
          <span className="font-bold text-green-600">approved</span> or{" "}
          <span className="font-bold text-red-500">rejected</span>.
        </div>
        <p className="text-gray-500 mb-6">
          Be sure to check your inbox (and your spam folder just in case).
        </p>
        <a
          href="/"
          className="inline-block bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-md transition-all duration-300"
        >
          ⬅ Back to Homepage
        </a>
      </motion.div>
    </div>
  );
}

export default EnrollmentSuccess;
