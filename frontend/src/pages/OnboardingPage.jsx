import React, { useState, useEffect } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api.js";
import { CameraIcon } from "lucide-react";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  // Generate a random avatar if none exists
  const generateRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    return `https://avatar.iran.liara.run/public/${idx}.png`;
  };

  const [formState, setFormState] = useState({
    fullName: "",
    bio: "",
    nativeLanguage: "",
    learningLanguage: "",
    location: "",
    profilePic: "",
  });

  // Update form state when authUser loads
  useEffect(() => {
    if (authUser) {
      setFormState((prevState) => ({
        fullName: authUser?.fullName || "",
        bio: authUser?.bio || "",
        nativeLanguage: authUser?.nativeLanguage || "",
        learningLanguage: authUser?.learningLanguage || "",
        location: authUser?.location || "",
        // Only use existing profilePic if it exists, otherwise generate one if don't have one yet
        profilePic: authUser?.profilePic || prevState.profilePic || generateRandomAvatar(),
      }));
    }
  }, [authUser]);

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img src={formState.profilePic} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              {!formState.profilePic && (
                <button
                  type="button"
                  onClick={() => {
                    const newAvatar = generateRandomAvatar();
                    setFormState({ ...formState, profilePic: newAvatar });
                  }}
                  className="btn btn-sm btn-outline"
                >
                  Generate Random Avatar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default OnboardingPage;
