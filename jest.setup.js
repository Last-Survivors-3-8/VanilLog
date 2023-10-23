import '@testing-library/jest-dom';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('axios');

jest.mock('next/navigation', () => {
  return {
    useRouter: jest.fn(),
    useSearchParams: jest.fn(),
    usePathname: jest.fn(),
  };
});

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: { mongoId: 'someId' },
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('@utils/useComment', () => ({
  useComments: jest.fn(),
}));

jest.mock('@utils/usePost', () => ({
  usePost: jest.fn(),
}));

jest.mock('@utils/useUserProfile');
jest.mock('@utils/useImageUpload');
jest.mock('@utils/useNicknameUpdate');

jest.mock('@editorjs/editorjs');