import { render, screen } from '@testing-library/react';
import { StatisticsBox } from '@src/components/SideNavbar/StatisticsBox';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<StatisticsBox />', () => {
  it('일일 방문자 수와 총 방문자 수가 올바르게 렌더링되어야 한다.', () => {
    render(<StatisticsBox />);

    expect(screen.getByText(/일일 방문자: 1명/i)).toBeInTheDocument();
    expect(screen.getByText(/총 방문자: 10명/i)).toBeInTheDocument();
  });
});
