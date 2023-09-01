'use client';

import { useState, useEffect } from 'react';
import Image from 'next/legacy/image';
import axios from 'axios';
import { ERRORS } from 'constants/errors';

function PageDivider({ blogUserId }) {
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const profileData = async () => {
      try {
        const response = await axios.get(`/api/v1/profile/${blogUserId}`);
        if (response.data.status !== 200) {
          setError(response.data.message);
          return;
        }

        setProfile(response.data.data);
      } catch (e) {
        setError(ERRORS.PROFILE_LOADING_ERROR);
      }
    };

    profileData();
  });
  console.log('profile', profile);
  return (
    <div className='flex items-center ml-6'>
      <div className='rounded-full bg-white w-9 h-9 flex flex-col items-center justify-center relative overflow-hidden'>
        {error ? (
          <p className='text-red'>{error}</p>
        ) : (
          profile.profileImage && (
            <Image
              src={profile.profileImage}
              alt='프로필 사진'
              layout='fill'
              priority
            />
          )
        )}
      </div>
      <div className="font-['DiaGothicMedium'] mr-2 text-black text-xl pl-1">
        {profile.nickname} 블로그
      </div>
    </div>
  );
}

export { PageDivider };
