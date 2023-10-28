import clsx from 'clsx';
import ReactPaginate from 'react-paginate';

export default function Pagination({
    className,
    handlePageClick,
    itemCount,
    pageSize,
    currentPage,
}) {
    return (
        <ReactPaginate
            className={clsx('join flex items-stretch', className ? className : '')}
            breakLabel={
                <button className='join-item btn btn-disabled'>...</button>
            }
            pageLabelBuilder={(page) => (
                <button
                    className={clsx(
                        'join-item btn border-none text-black h-full',
                        page == currentPage ? 'btn-primary' : ''
                    )}
                >
                    {page}
                </button>
            )}
            nextLabel={<button className='join-item btn border-none text-black h-full'>{'next >'}</button>}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            pageCount={Math.ceil(itemCount / pageSize)}
            previousLabel={<button className='join-item btn border-none text-black h-full'>{'< previous'}</button>}
            renderOnZeroPageCount={null}
        />
    );
}
