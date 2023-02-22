export const Pagination: React.FC<{
    currentPage: number,
    totalPages: number,
    paginate: any
}> = (props) => {

    const pageNumbers = [];

    // Check all numbers from two less than the current page, up to two greater than
    // the current page, and any that are valid page numbers get added to the array
    for (let i = -2; i <= 2; i++) {
        if (props.currentPage + i >= 1 && props.currentPage + i <= props.totalPages)
            pageNumbers.push(props.currentPage + i);
    }

    // Or you could do this original nonsense from the tutorial...
    // if (props.currentPage === 1) {
    //     pageNumbers.push(props.currentPage);
    //     if (props.totalPages >= props.currentPage + 1) {
    //         pageNumbers.push(props.currentPage + 1);
    //     }
    //     if (props.totalPages >= props.currentPage + 2) {
    //         pageNumbers.push(props.currentPage + 2);
    //     }
    // } else if (props.currentPage > 1) {
    //     if (props.currentPage >= 3) {
    //         pageNumbers.push(props.currentPage - 2);
    //         pageNumbers.push(props.currentPage - 1);
    //     } else {
    //         pageNumbers.push(props.currentPage - 1);
    //     }
    //
    //     pageNumbers.push(props.currentPage);
    //
    //     if (props.totalPages >= props.currentPage + 1) {
    //         pageNumbers.push(props.currentPage + 1);
    //     }
    //     if (props.totalPages >= props.currentPage + 2) {
    //         pageNumbers.push(props.currentPage + 2);
    //     }
    // }

    return (
        <nav aria-label="...">
            <ul className="pagination">
                <li className="page-item" onClick={() => props.paginate(1)}>
                    <button className="page-link">
                        First Page
                    </button>
                </li>
                {
                    pageNumbers.map(number => (
                        <li key={number} onClick={() => props.paginate(number)}
                            className={"page-item " + (props.currentPage === number ? "active" : "")}>
                            <button className="page-link">{number}</button>
                        </li>
                    ))
                }
                <li className="page-item" onClick={() => props.paginate(props.totalPages)}>
                    <button className="page-link">
                        Last Page
                    </button>
                </li>
            </ul>
        </nav>
    );
}