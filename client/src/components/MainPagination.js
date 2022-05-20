import '../css/MainPagination.css'

function MainPagination({ total, limit, page, setPage }) {
    const numPages = Math.ceil(total / limit);

    return (
        <>
            <div id="NavLP">
                {Array(numPages)
                    .fill()
                    .map((_, i) => (
                        <div className={`${page === i + 1 ? "ButtonLP currPage" : "ButtonLP"}`}
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </div>
                    ))}
            </div>
        </>
    );
}



export default MainPagination;

