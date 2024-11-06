//File: src/app/user/profile/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react"; // Use next-auth/react for client-side session handling

interface Course {
  id: string;
  title: string;
  description: string;
}

interface Enrollment {
  courseId: Course;
}

const UserProfile = () => {
  const { data: session } = useSession(); // Access the session, includes token if logged in
  const [user, setUser] = useState(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session || session.accessToken) {
        router.push("/login"); // Redirect if not logged in
        return;
      }

      try {
        const res = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${session.accessToken}` }, // Add token if available
        });
        const data = res.data;

        setUser(data.user);
        setEnrollments(data.enrollments);
        setName(data.user.name);
        setAge(data.user.age);
        setGender(data.user.gender);
        setLocation(data.user.location);
      } catch (error: any) {
        console.error("Error fetching profile data:", error);
        if (error.response && error.response.status === 401) {
          alert("You are not authorized to view this page. Please log in.");
          router.push("/login");
        }
      }
    };

    fetchProfile();
  }, [session]);

  const handleUpdateProfile = async () => {
    if (!session?.accessToken) {
      alert("You must be logged in to update profile.");
      return;
    }
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ name, age, gender, location }),
      });

      if (res.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleResetPassword = async () => {
    if (!session?.accessToken) {
      alert("You must be logged in to reset password.");
      return;
    }
    try {
      const res = await fetch("/api/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (res.ok) {
        alert("Password updated successfully!");
      } else {
        alert("Failed to update password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Failed to update password");
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-8 pt-24">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

        {/* Profile Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-200">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border focus:border-darkKnight-accent focus:outline-none rounded-md text-gray-800"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-200">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="mt-1 block w-full p-2 border focus:border-darkKnight-accent focus:outline-none rounded-md text-gray-800"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-200">
              Gender
            </label>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full p-2 border focus:border-darkKnight-accent focus:outline-none rounded-md text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full p-2 border focus:border-darkKnight-accent focus:outline-none rounded-md text-gray-800"
            />
          </div>
          <button
            onClick={handleUpdateProfile}
            className="mt-4 bg-darkKnight-accent text-gray-800 px-4 py-2 rounded-md hover:bg-teal-400"
          >
            Update Profile
          </button>
        </div>

        {/* Password Reset */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-200">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 block w-full p-2 border focus:border-darkKnight-accent focus:outline-none rounded-md text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full p-2 border focus:border-darkKnight-accent focus:outline-none rounded-md text-gray-800"
            />
          </div>
          <button
            onClick={handleResetPassword}
            className="mt-4 bg-darkKnight-accent hover:bg-teal-400 text-gray-800 px-4 py-2 rounded-md"
          >
            Reset Password
          </button>
        </div>

        {/* Enrolled Courses */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Enrolled Courses</h2>
          <ul className="space-y-4">
            {enrollments.map((enrollment) => (
              <li
                key={enrollment.courseId.id}
                className="border p-4 rounded-md"
              >
                <h3 className="text-lg font-bold">
                  {enrollment.courseId.title}
                </h3>
                <p>{enrollment.courseId.description}</p>
                <button
                  onClick={() =>
                    router.push(`/courses/${enrollment.courseId.id}`)
                  }
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Go to Course
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
