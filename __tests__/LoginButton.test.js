import { render, screen, fireEvent } from '@testing-library/react';
import { LoginButton } from '@src/components/LoginButton';
import { signIn } from 'next-auth/react';

describe('<LoginButton />', () => {
  it('로그인 버튼 컴포넌트 렌더링 테스트', () => {
    render(<LoginButton loginCompany='google' />);
    const buttonElement = screen.getByText(/google login/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('로그인 버튼 컴포넌트 클릭 시, signIn 함수가 올바른 파라미터로 호출 되는지 테스트', () => {
    signIn.mockClear();

    render(<LoginButton loginCompany='google' />);
    const buttonElement = screen.getByText(/google login/i);

    fireEvent.click(buttonElement);

    expect(signIn).toHaveBeenCalled();
    expect(signIn).toHaveBeenCalledWith('google', {
      callbackUrl: process.env.DOMAIN,
    });
  });
});