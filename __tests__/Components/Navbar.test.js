import { render, screen, waitFor, act } from '@testing-library/react';
import { Navbar } from '@src/components/Navbar';
import { useSession } from 'next-auth/react';
import axios from 'axios';

jest.mock('next-auth/react');
jest.mock('axios');

describe('<Navbar />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('로그인하지 않은 사용자의 경우 로그인 링크가 렌더링 되어야 한다.', () => {
    useSession.mockReturnValue({ status: 'unauthenticated' });

    render(<Navbar />);

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('로그인한 사용자의 경우 사용자의 프로필 이미지와 닉네임이 렌더링 되어야 한다.', async () => {
    useSession.mockReturnValue({
      status: 'authenticated',
      data: { mongoId: 'testUserId' },
    });

    const mockProfileResponse = {
      data: {
        status: 200,
        data: {
          profileImage: '/test-image.jpg',
          nickname: 'testUserNickname',
        },
      },
    };

    axios.get.mockResolvedValueOnce(mockProfileResponse);

    render(<Navbar />);

    await waitFor(() => {
      expect(screen.getByAltText('프로필 사진')).toBeInTheDocument();
      expect(screen.getByText('testUserNickname')).toBeInTheDocument();
    });
  });

  it('프로필을 불러오는 동안 에러가 발생하면 에러 메시지가 렌더링 되어야 한다.', async () => {
    useSession.mockReturnValue({
      status: 'authenticated',
      data: { mongoId: 'testUserId' },
    });

    axios.get.mockRejectedValueOnce(new Error('API error'));

    render(<Navbar />);

    await waitFor(() => {
      expect(
        screen.getByText('프로필을 불러오는 중 문제가 발생했습니다.'),
      ).toBeInTheDocument();
    });
  });
});
