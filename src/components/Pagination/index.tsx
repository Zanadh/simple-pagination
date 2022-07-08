export interface PaginationProps {
  currentPage: number;
  onClickChange: (page: number) => void;
}

const totalPage = 3; // hardcoded
const Pagination = ({ currentPage, onClickChange }: PaginationProps) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li
          className={'page-item ' + (currentPage === 1 ? 'disabled' : '')}
          style={{ cursor: 'pointer' }}>
          <a
            className="page-link"
            onClick={() => onClickChange(currentPage - 1)}>
            Previous
          </a>
        </li>
        {Array(totalPage)
          .fill('')
          .map((_, i) => (
            <li className="page-item" key={i}>
              <a
                className="page-link "
                onClick={() => onClickChange(i + 1)}
                style={{
                  backgroundColor:
                    currentPage === i + 1 ? 'aliceblue' : 'white',
                  cursor: 'pointer',
                }}>
                {i + 1}
              </a>
            </li>
          ))}
        <li
          className={
            'page-item ' + (currentPage === totalPage ? 'disabled' : '')
          }
          style={{
            cursor: 'pointer',
          }}>
          <a
            className="page-link"
            onClick={() => onClickChange(currentPage + 1)}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
