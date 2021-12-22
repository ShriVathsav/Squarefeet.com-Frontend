import React, { useState } from 'react'
import { Menu, Segment, Container, Image, Button, Modal, Pagination } from 'semantic-ui-react'

const PaginationItem = (props) => {

    const [activePage, setActivePage] = props.pageNumberProp
    const [boundaryRange, setBoundaryRange] = useState(1)
    const [siblingRange, setSiblingRange] = useState(1)
    const [showEllipsis, setShowEllipsis] = useState(true)
    const [showFirstAndLastNav, setShowFirstAndLastNav] = useState(true)
    const [showPreviousAndNextNav, setShowPreviousAndNextNav] = useState(true)
    const [totalPages, setTotalPages] =  props.totalPagesProp

    const handlePaginationChange = (e, { activePage }) => setActivePage( activePage )

    return (
        <Pagination
            activePage={activePage}
            boundaryRange={boundaryRange}
            onPageChange={handlePaginationChange}
            siblingRange={siblingRange}
            totalPages={totalPages}
            // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
            ellipsisItem={showEllipsis ? undefined : null}
            firstItem={showFirstAndLastNav ? undefined : null}
            lastItem={showFirstAndLastNav ? undefined : null}
            prevItem={showPreviousAndNextNav ? undefined : null}
            nextItem={showPreviousAndNextNav ? undefined : null}
        />
    )
}

export default PaginationItem;