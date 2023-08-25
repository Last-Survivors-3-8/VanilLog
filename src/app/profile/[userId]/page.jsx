'use client';

import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useUserProfile } from '@utils/useUserProfile';
import { useImageUpload } from '@utils/useImageUpload';
import { useNicknameUpdate } from '@utils/useNicknameUpdate';

import ProfileImageUploader from '@src/app/_components/Profile/ProfileImageUploader';
import NicknameEditor from '@src/app/_components/Profile/NicknameEditor';
import BlogLink from '@src/app/_components/Profile/BlogLink';
import ConnectedSocial from '@src/app/_components/Profile/ConnecterSocial';
import BlogStatistics from '@src/app/_components/Profile/BlogStatistics';

export default function ProfilePage({ params }) {
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const userId = params.userId;
  const { data: session } = useSession();
  const inputRef = useRef(null);

  const { userProfile, loading, error } = useUserProfile(userId, session);
  const { uploadedImage, handleImageUpload } = useImageUpload(userId);

  const toggleEditing = () => {
    setIsEditingNickname((prevEditing) => !prevEditing);
  };

  const { nickname, setNickname, message, updateNickname } = useNicknameUpdate(
    userId,
    userProfile?.nickname,
    toggleEditing,
  );

  if (loading) {
    return <div>프로필을 불러오는 중입니다.</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex p-20'>
      <div className='flex-1 pr-10'>
        <ProfileImageUploader
          uploadedImage={uploadedImage}
          userProfile={userProfile}
          handleImageUpload={handleImageUpload}
          inputRef={inputRef}
        />

        <NicknameEditor
          editing={isEditingNickname}
          toggleEditing={toggleEditing}
          nickname={nickname}
          setNickname={setNickname}
          updateNickname={updateNickname}
          message={message}
        />

        <BlogLink sessionId={session?.mongoId} />
        <ConnectedSocial socialLoginType={userProfile?.socialLoginType} />
      </div>

      <BlogStatistics />
    </div>
  );
}
