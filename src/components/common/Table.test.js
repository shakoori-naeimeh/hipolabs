import { render, screen } from '@testing-library/react';
import Table from './Table';

const mockData = [
  {
    id: 1,
    name: 'University A',
    state_province: 'State A',
    web_pages: ['http://www.universitya.edu']
  },
  {
    id: 2,
    name: 'University B',
    state_province: 'State B',
    web_pages: ['http://www.universityb.edu']
  }
];

jest.mock('./Favourite', () => {
  return jest.fn(() => <div>Favourite</div>);
});

describe('Table Component', () => {
  test('renders data correctly', () => {
    render(<Table data={mockData} />);

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(mockData.length + 1);

    mockData.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.state_province)).toBeInTheDocument();
      expect(screen.getByText(item.web_pages[0])).toBeInTheDocument();
    });
  });
});