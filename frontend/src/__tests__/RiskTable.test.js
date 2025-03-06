import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RiskTable from '../components/RiskTable';

test('renders RiskTable and calls onSort when clicking a header', () => {
  const onSortMock = jest.fn();
  const risks = [
    { id: 1, title: 'Test Risk', description: 'Desc', impact: 3, probability: 4, category: 'Cat', status: 'Open' }
  ];

  render(
    <RiskTable
      risks={risks}
      search="Test"
      sortBy="id"
      sortDir="asc"
      onSort={onSortMock}
    />
  );

  expect(screen.getByText((content, element) => element.textContent === 'Test Risk')).toBeInTheDocument();
  expect(screen.getByText('Desc')).toBeInTheDocument();

  const highlighted = screen.getByText('Test');
  expect(highlighted).toHaveClass('bg-yellow-200');

  const idHeaders = screen.getAllByText(/ID/i);
  const idHeader = idHeaders.find((el) => el.tagName === "TH");

  fireEvent.click(idHeader);
  expect(onSortMock).toHaveBeenCalledTimes(1);
  expect(onSortMock).toHaveBeenCalledWith('id');

});