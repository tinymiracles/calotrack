"use client";

import { useEffect, useState } from "react";
import { Profile } from "@/lib/types";
import { getProfile } from "@/lib/storage";
import ProfileForm from "@/components/ProfileForm";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  if (profile === undefined) return null;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold">{profile ? "Your profile" : "Let's set you up"}</h1>
        <p className="text-sm text-[var(--muted)]">
          {profile
            ? "Update your numbers any time — your daily targets recalculate right away."
            : "One-time setup: height, weight, age and a photo. Then just log your day, every day."}
        </p>
      </div>
      <ProfileForm existing={profile ?? undefined} />
    </div>
  );
}
