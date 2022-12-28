import React from "react";
import {Pagination} from "antd";

type PaginatorType = {
    total: number,
    limit: number,
    offset: number,
    current: number,
    onChange: (a: number, b: number) => void,
}

const Paginator = ({total, limit, offset, current, onChange, ...props}: PaginatorType) => { //checkedList?

    return (
        <Pagination onChange={(page, pageSize) => onChange(page, pageSize)}
                    pageSize={limit}
                    current={current}
                    total={total}
                    showSizeChanger={true}
                    pageSizeOptions={[5, 10, 20]}/>
    )
}

export default Paginator;